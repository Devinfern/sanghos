
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-subtle/30 rounded-full p-2">
              {space.icon === "MessageSquare" && (
                <MessageCircle className="h-5 w-5 text-brand-primary" />
              )}
              {space.icon === "Users" && (
                <Users className="h-5 w-5 text-brand-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                <Link to={formatSpaceUrl(space.name)} className="hover:text-brand-primary transition-colors">
                  {space.name}
                </Link>
              </h3>
              {space.description && (
                <p className="text-sm text-muted-foreground">{space.description}</p>
              )}
            </div>
          </div>
          <Button
            variant={isFollowing ? "default" : "outline"}
            size="sm"
            className={isFollowing ? "bg-brand-primary hover:bg-brand-primary/90" : ""}
            onClick={toggleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>{space.count || 0} posts</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{participantCount} participants</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            <span>{space.category}</span>
          </Badge>
        </div>

        {recentPosts.length > 0 && (
          <div className="space-y-3 mt-4 border-t pt-4">
            <h4 className="text-sm font-medium">Recent discussions</h4>
            {recentPosts.slice(0, 2).map((post) => (
              <div key={post.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <img src={post.author.avatar} alt={post.author.name} />
                </Avatar>
                <div className="space-y-1">
                  <Link to={formatSpaceUrl(space.name)} className="text-sm font-medium hover:text-brand-primary transition-colors block">
                    {post.title}
                  </Link>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{post.author.name}</span>
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
            <Link
              to={formatSpaceUrl(space.name)}
              className="text-sm text-brand-primary hover:underline block mt-2"
            >
              View all discussions
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ForumTopicDiscussion;
