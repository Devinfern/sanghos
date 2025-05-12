
import { useState } from "react";
import { ForumPost } from "@/lib/types/community";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, PinIcon } from "lucide-react";
import { motion } from "framer-motion";
import CommunityPostEditor from "@/components/CommunityPostEditor";

interface SpaceDiscussionsProps {
  spacePosts: ForumPost[];
  spaceName: string;
  onNewPostCreated: (newPost: Partial<ForumPost>) => Promise<void>;
}

const SpaceDiscussions = ({ 
  spacePosts, 
  spaceName,
  onNewPostCreated 
}: SpaceDiscussionsProps) => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Discussions</h2>
        <CommunityPostEditor 
          onPostCreated={onNewPostCreated}
          buttonLabel="Create Post"
          initialPost={{ postedIn: spaceName }}
        />
      </div>
      
      {spacePosts.length > 0 ? (
        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {spacePosts.map((post) => (
            <motion.div 
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Card className="overflow-hidden border border-slate-200">
                {post.isPinned && (
                  <div className="bg-brand-subtle/20 px-4 py-1 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <PinIcon className="h-3 w-3 mr-1" />
                      <span>Pinned post</span>
                    </div>
                    <Badge variant="outline" className="text-xs py-0">Featured</Badge>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <img src={post.author.avatar} alt={post.author.name} />
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{post.author.name}</span>
                          <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">{post.author.role}</span>
                          {post.author.tag && (
                            <span className="text-xs px-2 py-1 bg-brand-peach/20 text-brand-primary rounded-full">{post.author.tag}</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {post.timeAgo}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <div className="text-sm mb-3 whitespace-pre-line">
                    {post.content}
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.comments} Comments
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      {post.likes}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card className="p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No posts yet</h3>
          <p className="text-muted-foreground mb-4">Be the first to start a conversation in this space!</p>
          <CommunityPostEditor 
            onPostCreated={onNewPostCreated}
            buttonLabel="Create Post"
            initialPost={{ postedIn: spaceName }}
          />
        </Card>
      )}
    </div>
  );
};

export default SpaceDiscussions;
