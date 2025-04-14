
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { ForumPost } from "@/lib/forumData";
import ForumPostEditor from "@/components/ForumPostEditor";

interface CommunityDiscussionsProps {
  posts: ForumPost[];
  isLoggedIn: boolean;
  onPostCreated: (newPost: ForumPost) => void;
}

const CommunityDiscussions = ({ posts, isLoggedIn, onPostCreated }: CommunityDiscussionsProps) => {
  const [newPostContent, setNewPostContent] = useState<string>("");

  const handlePostSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("You need to be logged in to post");
      return;
    }
    
    if (!newPostContent.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }
    
    const newPost: ForumPost = {
      id: Date.now(),
      author: {
        name: "You",
        role: "Member",
        avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      },
      postedIn: "Open Conversation",
      timeAgo: "just now",
      title: "Quick post",
      content: newPostContent,
      likes: 0,
      comments: 0,
      bookmarked: false
    };
    
    onPostCreated(newPost);
    setNewPostContent("");
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden border border-brand-subtle/30 shadow-sm">
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={post.author.avatar} alt={post.author.name} />
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-brand-dark">{post.author.name}</span>
                    <span className="text-xs px-2 py-1 bg-brand-subtle/20 rounded-full text-brand-slate">{post.author.role}</span>
                    {post.author.tag && (
                      <span className="text-xs px-2 py-1 bg-brand-peach/20 rounded-full text-brand-slate">{post.author.tag}</span>
                    )}
                  </div>
                  <div className="text-xs text-brand-slate">
                    Posted in {post.postedIn} · {post.timeAgo}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-brand-slate hover:text-brand-dark hover:bg-brand-subtle/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <h2 className="text-xl font-semibold mb-2 text-brand-dark">{post.title}</h2>
            <div className="text-sm mb-3 whitespace-pre-line text-brand-slate">
              {post.content}
              <button className="text-brand-primary hover:underline block mt-1">See more</button>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-brand-subtle/30">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-primary" 
                        onClick={() => !isLoggedIn ? toast.error("Please log in to like posts") : null}>
                  <Heart className="h-4 w-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-primary"
                        onClick={() => !isLoggedIn ? toast.error("Please log in to comment") : null}>
                  <MessageCircle className="h-4 w-4" /> {post.comments}
                </button>
              </div>
              <button className={`${post.bookmarked ? 'text-brand-primary' : 'text-brand-slate'} hover:text-brand-primary`}
                      onClick={() => !isLoggedIn ? toast.error("Please log in to bookmark posts") : null}>
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CommunityDiscussions;
