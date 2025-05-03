
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminStatus } from "@/hooks/useAdminStatus";

interface CreatePostProps {
  onPostCreated: () => void;
  retreatId?: string;
  retreatPhase?: "pre" | "post";
}

const CreatePost = ({ onPostCreated, retreatId, retreatPhase }: CreatePostProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General Discussion");
  const [isPinned, setIsPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAdmin } = useAdminStatus();

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your post");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please enter content for your post");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user's session
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;

      if (!userId) {
        toast.error("Please sign in to create a post");
        setIsSubmitting(false);
        return;
      }

      // Create the post in the database
      const { data, error } = await supabase
        .from('community_posts')
        .insert([
          {
            user_id: userId,
            title: title.trim(),
            content: content.trim(),
            category: category,
            retreat_id: retreatId,
            retreat_phase: retreatPhase,
            is_pinned: isAdmin && isPinned // Only admins can pin posts
          }
        ])
        .select();

      if (error) {
        console.error('Error creating post:', error);
        throw new Error(error.message);
      }

      toast.success("Post created successfully!");
      setOpen(false);
      setTitle("");
      setContent("");
      setCategory("General Discussion");
      setIsPinned(false);
      
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error instanceof Error ? error.message : "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" /> New post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            Create a new post
            {retreatPhase && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({retreatPhase === "pre" ? "Pre-Retreat" : "Post-Retreat"})
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="post-category" className="text-right">
              Category
            </Label>
            <select
              id="post-category"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="General Discussion">General Discussion</option>
              <option value="Questions">Questions</option>
              <option value="Travel Coordination">Travel Coordination</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Practice Sharing">Practice Sharing</option>
              <option value="Resources">Resources</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="post-title" className="text-right">
              Title
            </Label>
            <Input 
              id="post-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="post-content" className="text-right pt-2">
              Content
            </Label>
            <Textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3 min-h-[150px]"
            />
          </div>
          {isAdmin && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-pinned" className="text-right">
                Pin post
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="post-pinned"
                  checked={isPinned}
                  onCheckedChange={setIsPinned}
                />
                <Label htmlFor="post-pinned" className="text-sm text-muted-foreground">
                  Important announcements appear at the top
                </Label>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
