
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export interface CreatePostProps {
  onPostCreated: () => void;
  retreatId?: string;
  onCancel?: () => void;
}

const CreatePost = ({ onPostCreated, retreatId, onCancel }: CreatePostProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("general");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postTitle.trim() || !postContent.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast.error("You must be logged in to post");
        navigate("/login");
        return;
      }
      
      const user = session.session.user;
      
      // Get user's profile data for name
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      const authorName = profileData?.full_name || user.email?.split('@')[0] || 'Anonymous';
      
      // Create the post
      const { error } = await supabase
        .from('forum_posts')
        .insert([
          {
            title: postTitle.trim(),
            content: postContent.trim(),
            category: postCategory,
            user_id: user.id,
            author_name: authorName,
            posted_in: retreatId ? `retreat-${retreatId}` : 'community'
          }
        ]);
      
      if (error) throw error;
      
      toast.success("Post created successfully!");
      setPostTitle("");
      setPostContent("");
      setPostCategory("general");
      onPostCreated();
      
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-xl font-semibold mb-4">Create New Post</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="postTitle">Title</Label>
          <Input
            id="postTitle"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Enter a title for your post"
            maxLength={100}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="postContent">Content</Label>
          <Textarea
            id="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share your thoughts, questions, or insights..."
            className="min-h-[150px]"
            required
          />
        </div>
        
        <div>
          <Label>Category</Label>
          <RadioGroup
            value={postCategory}
            onValueChange={setPostCategory}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="general" id="general" />
              <Label htmlFor="general">General</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="question" id="question" />
              <Label htmlFor="question">Question</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tip" id="tip" />
              <Label htmlFor="tip">Tip/Advice</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex justify-end space-x-2 pt-2">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
