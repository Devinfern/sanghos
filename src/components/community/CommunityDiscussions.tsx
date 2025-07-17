
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePost from "./CreatePost";
import CommunityPost from "./CommunityPost";
import CommunitySearchFilter from "./CommunitySearchFilter";
import ForumTopics from "./ForumTopics";
import UnifiedMessaging from "./UnifiedMessaging";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";
import { Users, PanelLeft, Loader2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface CommunityDiscussionsProps {
  isLoggedIn: boolean;
}

const CommunityDiscussions = ({ isLoggedIn }: CommunityDiscussionsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"feed" | "topics">("feed");
  const { posts, isLoading, currentUserId, fetchPosts } = useCommunityPosts(searchQuery, categoryFilter);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary mb-4" />
        <p className="text-muted-foreground">Loading discussions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="feed" onValueChange={(value) => setViewMode(value as "feed" | "topics")}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-brand-subtle/10 p-1">
            <TabsTrigger 
              value="feed" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-brand-primary"
            >
              <PanelLeft className="h-4 w-4" />
              <span>Feed</span>
            </TabsTrigger>
            <TabsTrigger 
              value="topics" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-brand-primary"
            >
              <Users className="h-4 w-4" />
              <span>Topics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-brand-primary"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
          </TabsList>

          {isLoggedIn && (
            <div className="w-auto hidden md:block">
              <CreatePost onPostCreated={fetchPosts} />
            </div>
          )}
        </div>

        <TabsContent value="feed" className="space-y-6 mt-0">
          <div className="mb-4">
            <CommunitySearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
            />
          </div>

          <div className="space-y-4">
            <motion.div 
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
              {posts.map((post) => (
                <motion.div key={post.id} variants={fadeIn}>
                  <CommunityPost
                    post={post}
                    currentUserId={currentUserId}
                    onPostUpdate={fetchPosts}
                  />
                </motion.div>
              ))}
            </motion.div>
            {posts.length === 0 && (
              <Card className="p-8 text-center border-dashed border-2 bg-white/50">
                <Users className="h-12 w-12 mx-auto mb-4 text-brand-subtle" />
                <h3 className="text-lg font-medium mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchQuery || categoryFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Be the first to start a discussion! Share your thoughts, ask questions, or connect with like-minded individuals."}
                </p>
                {isLoggedIn && <CreatePost onPostCreated={fetchPosts} />}
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="topics">
          <ForumTopics />
        </TabsContent>

        <TabsContent value="chat">
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Community Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with fellow community members in real-time
              </p>
              <UnifiedMessaging
                channelId="community-general"
                placeholder="Share your thoughts with the community..."
                className="h-96"
              />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityDiscussions;
