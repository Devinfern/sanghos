
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share, MoreHorizontal, Send } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from 'date-fns';
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface UserProfile {
  username: string;
  avatar_url: string;
  is_wellness_practitioner: boolean;
}

interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes: number;
  category: string;
  user_profiles?: UserProfile | null;
}

interface CommunityPostProps {
  post: Post;
  currentUserId?: string | null;
  onPostUpdate?: () => void;
}

const CommunityPost = ({ post, currentUserId, onPostUpdate }: CommunityPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Extract user info from the user_profiles relation or use defaults
  const author = post.user_profiles || {
    username: "Anonymous User",
    avatar_url: "",
    is_wellness_practitioner: false
  };

  const handleLike = async () => {
    if (!currentUserId) {
      toast.error("Please sign in to like posts");
      return;
    }

    try {
      // Use type assertion to work around the type issue temporarily
      const { error } = await (supabase as any)
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

    setIsSubmitting(true);
    try {
      // Use type assertion to work around the type issue temporarily
      const { error } = await (supabase as any)
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden backdrop-blur-sm glass-morphism border-brand-subtle/10 hover:border-brand-subtle/30 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-brand-primary/20 p-0.5">
              <img 
                src={author.avatar_url || '/placeholder.svg'} 
                alt={author.username}
                className="object-cover rounded-full" 
              />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-brand-dark">{author.username}</span>
                {author.is_wellness_practitioner && (
                  <span className="text-xs px-2 py-0.5 bg-brand-primary/20 text-brand-primary rounded-full">
                    Wellness Practitioner
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground hover:bg-brand-subtle/10">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-brand-dark">{post.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{post.content}</p>
        </div>

        <div className="mt-5 pt-3 border-t border-brand-subtle/20 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-full ${isLiked ? "text-brand-rose" : ""} hover:bg-brand-rose/10`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 mr-1.5 ${isLiked ? "fill-brand-rose" : ""}`} />
            {post.likes}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full hover:bg-brand-subtle/10"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-1.5" />
            Comment
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full hover:bg-brand-subtle/10"
          >
            <Share className="h-4 w-4 mr-1.5" />
            Share
          </Button>
        </div>

        {showComments && (
          <motion.div 
            className="mt-4 border-t border-brand-subtle/20 pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-8 w-8 border border-brand-subtle/20">
                <img 
                  src={currentUserId ? "/placeholder.svg" : '/placeholder.svg'} 
                  alt="Your avatar" 
                  className="object-cover"
                />
              </Avatar>
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="pr-10 min-h-[80px] resize-none focus:border-brand-primary/30 focus:ring-brand-primary/20"
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-2 bottom-2 h-8 w-8 text-brand-primary rounded-full hover:bg-brand-primary/10"
                  onClick={handleComment}
                  disabled={isSubmitting || !comment.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default CommunityPost;
