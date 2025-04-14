
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from 'date-fns';
import { supabase } from "@/integrations/supabase/client";

interface User {
  username: string;
  avatar_url: string;
  is_wellness_practitioner: boolean;
}

interface CommunityPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    user_id: string;
    created_at: string;
    likes: number;
    category: string;
    user_profiles?: User;
  };
  currentUserId?: string | null;
  onPostUpdate?: () => void;
}

const CommunityPost = ({ post, currentUserId, onPostUpdate }: CommunityPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  
  // Extract user info from the user_profiles relation or use defaults
  const author = post.user_profiles || {
    username: "Anonymous User",
    avatar_url: null,
    is_wellness_practitioner: false
  };

  const handleLike = async () => {
    if (!currentUserId) {
      toast.error("Please sign in to like posts");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('community_posts')
        .update({ likes: post.likes + 1 })
        .eq('id', post.id);

      if (error) throw error;
      setIsLiked(true);
      if (onPostUpdate) onPostUpdate();
      toast.success("Post liked!");
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error("Failed to like post");
    }
  };

  const handleComment = async () => {
    if (!currentUserId) {
      toast.error("Please sign in to comment");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      const { error } = await supabase
        .from('community_comments')
        .insert([
          {
            post_id: post.id,
            user_id: currentUserId,
            content: comment
          }
        ]);

      if (error) throw error;
      setComment("");
      if (onPostUpdate) onPostUpdate();
      toast.success("Comment added!");
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error("Failed to add comment");
    }
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <img src={author.avatar_url || '/placeholder.svg'} alt={author.username} />
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{author.username}</span>
              {author.is_wellness_practitioner && (
                <span className="text-xs px-2 py-1 bg-brand-peach/20 rounded-full">
                  Wellness Practitioner
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-muted-foreground">{post.content}</p>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className={isLiked ? "text-red-500" : ""}
          onClick={handleLike}
        >
          <Heart className="h-4 w-4 mr-1" />
          {post.likes}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          Comment
        </Button>
        <Button variant="ghost" size="sm">
          <Share className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>

      {showComments && (
        <div className="mt-4 border-t pt-4">
          <Textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleComment}>Post Comment</Button>
        </div>
      )}
    </Card>
  );
};

export default CommunityPost;
