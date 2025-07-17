
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
import CommunityHero from "./redesign/CommunityHero";
import CommunitySidebar from "./redesign/CommunitySidebar";
import MasonryPostGrid from "./redesign/MasonryPostGrid";
import FloatingCreateButton from "./redesign/FloatingCreateButton";
import CommunityPageContainer from "./redesign/CommunityPageContainer";

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

  const handlePostAction = (action: string, postId: string) => {
    console.log(`${action} action for post:`, postId);
    // Implement post actions (like, comment, bookmark, share)
  };

  const handleNavigate = (section: string) => {
    console.log('Navigate to:', section);
    // Implement navigation logic
  };

  const handleCreatePost = () => {
    console.log('Create post triggered');
    // This will be handled by the FloatingCreateButton
  };

  return (
    <CommunityPageContainer
      title="Community Discussions"
      showHero={true}
      isLoggedIn={isLoggedIn}
      stats={{
        activeMembers: 156,
        totalPosts: posts.length,
        upcomingEvents: 12,
        engagement: 94
      }}
      onPostCreated={fetchPosts}
      onNavigate={handleNavigate}
      onCreatePost={handleCreatePost}
    >
      <Tabs defaultValue="feed" onValueChange={(value) => setViewMode(value as "feed" | "topics")}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-white/60 backdrop-blur-sm border-0 shadow-sm p-1">
            <TabsTrigger 
              value="feed" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-brand-primary data-[state=active]:shadow-sm rounded-lg"
            >
              <PanelLeft className="h-4 w-4" />
              <span>Community Feed</span>
            </TabsTrigger>
            <TabsTrigger 
              value="topics" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-brand-primary data-[state=active]:shadow-sm rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span>Discussion Topics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-brand-primary data-[state=active]:shadow-sm rounded-lg"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Live Chat</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="feed" className="space-y-6 mt-0">
          {/* Search and Filters */}
          <div className="mb-6">
            <CommunitySearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
            />
          </div>

          {/* Masonry Posts Grid */}
          {posts.length > 0 ? (
            <MasonryPostGrid
              posts={posts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                author: {
                  name: "Community Member", // Replace with actual author data
                  avatar: "",
                  status: "online",
                },
                category: post.category || "general",
                likes: post.likes || 0,
                comments: 0, // Add comments count when available
                created_at: post.created_at,
                tags: ["wellness", "community"], // Add tags when available
              }))}
              onLike={(postId) => handlePostAction("like", postId)}
              onComment={(postId) => handlePostAction("comment", postId)}
              onBookmark={(postId) => handlePostAction("bookmark", postId)}
              onShare={(postId) => handlePostAction("share", postId)}
              currentUserId={currentUserId}
            />
          ) : (
            <Card className="p-12 text-center border-dashed border-2 bg-white/60 backdrop-blur-sm">
              <Users className="h-16 w-16 mx-auto mb-6 text-brand-subtle" />
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">Welcome to Our Community</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                {searchQuery || categoryFilter !== "all"
                  ? "No posts match your current filters. Try adjusting your search criteria."
                  : "Be the first to share your wellness journey! Start a meaningful conversation that inspires and connects our community."}
              </p>
              {isLoggedIn && (
                <div className="inline-block">
                  <CreatePost onPostCreated={fetchPosts} />
                </div>
              )}
            </Card>
          )}
        </TabsContent>

        <TabsContent value="topics">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-0 shadow-sm">
            <ForumTopics />
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-0 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-brand-dark">Community Live Chat</h3>
            <p className="text-muted-foreground mb-6">
              Connect with fellow community members in real-time conversations
            </p>
            <UnifiedMessaging
              channelId="community-general"
              placeholder="Share your thoughts with the community..."
              className="h-96"
            />
          </div>
        </TabsContent>
      </Tabs>
    </CommunityPageContainer>
  );
};

export default CommunityDiscussions;
