
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { MessageCircle, Users, Tag, Heart } from "lucide-react";
import { ForumPost, ForumSpace } from "@/lib/forumData";
import { Link } from "react-router-dom";

interface ForumTopicDiscussionProps {
  space: ForumSpace;
  recentPosts: ForumPost[];
  participantCount?: number;
}

const ForumTopicDiscussion = ({
  space,
  recentPosts = [],
  participantCount = 0
}: ForumTopicDiscussionProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFollowing(!isFollowing);
  };

  const formatSpaceUrl = (spaceName: string) => {
    return `/community/space/${spaceName.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group border-brand-subtle/20 h-full flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-brand-subtle/30 rounded-full p-2.5 group-hover:bg-brand-primary/10 transition-colors">
              {space.icon === "MessageSquare" && (
                <MessageCircle className="h-5 w-5 text-brand-primary" />
              )}
              {space.icon === "Users" && (
                <Users className="h-5 w-5 text-brand-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-brand-primary transition-colors">
                <Link to={formatSpaceUrl(space.name)} className="hover:text-brand-primary transition-colors inline-flex items-center">
                  {space.name}
                </Link>
              </h3>
              {space.description && (
                <p className="text-sm text-muted-foreground mt-1">{space.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="flex items-center gap-1 bg-brand-subtle/10 hover:bg-brand-subtle/20">
            <MessageCircle className="h-3 w-3" />
            <span>{space.count || 0} posts</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 bg-brand-subtle/10 hover:bg-brand-subtle/20">
            <Users className="h-3 w-3" />
            <span>{participantCount} participants</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 bg-brand-subtle/10 hover:bg-brand-subtle/20">
            <Tag className="h-3 w-3" />
            <span>{space.category}</span>
          </Badge>
        </div>

        {recentPosts.length > 0 && (
          <div className="space-y-4 mt-4 border-t pt-4 flex-1">
            <h4 className="text-sm font-medium text-brand-primary">Recent discussions</h4>
            {recentPosts.slice(0, 2).map((post) => (
              <div key={post.id} className="flex items-start space-x-3 group/post hover:bg-brand-subtle/5 p-2 -mx-2 rounded-lg transition-colors">
                <Avatar className="h-8 w-8 shrink-0 border border-brand-subtle/20">
                  <img 
                    src={post.author.avatar || "/placeholder.svg"} 
                    alt={post.author.name}
                    className="object-cover" 
                  />
                </Avatar>
                <div className="space-y-1 flex-1 min-w-0">
                  <Link 
                    to={formatSpaceUrl(space.name)} 
                    className="text-sm font-medium group-hover/post:text-brand-primary transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                  <div className="flex items-center text-xs text-muted-foreground flex-wrap">
                    <span className="truncate max-w-[100px]">{post.author.name}</span>
                    <span className="mx-1">·</span>
                    <span>{post.timeAgo}</span>
                    <span className="mx-1">·</span>
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-auto pt-4 flex justify-between items-center">
          <Link
            to={formatSpaceUrl(space.name)}
            className="text-sm text-brand-primary hover:underline"
          >
            View all discussions
          </Link>
          <Button
            variant={isFollowing ? "default" : "outline"}
            size="sm"
            className={`rounded-full ${isFollowing ? "bg-brand-primary hover:bg-brand-primary/90" : "border-brand-primary/50 text-brand-primary hover:bg-brand-primary/5"}`}
            onClick={toggleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ForumTopicDiscussion;
