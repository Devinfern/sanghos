import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, MessageCircle, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRetreatCommunity } from "@/hooks/useRetreatCommunity";
import CommunityPost from "./CommunityPost";
import CreatePost from "./CreatePost";
import CommunitySearchFilter from "./CommunitySearchFilter";
import { ForumPost } from "@/lib/forumData";

// Define the User type to match CommunityPost props
type User = {
  username: string;
  avatar_url: string;
  is_wellness_practitioner: boolean;
};

interface RetreatDiscussionsProps {
  retreatId?: string;
  retreatName?: string;
  isLoggedIn: boolean;
}

const RetreatDiscussions = ({ retreatId, retreatName, isLoggedIn }: RetreatDiscussionsProps) => {
  const [activePhase, setActivePhase] = useState<"pre" | "post">("pre");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const { 
    spaces, 
    posts, 
    isLoading, 
    error 
  } = useRetreatCommunity(retreatId, activePhase);

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || 
      post.postedIn.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Sort posts - pinned first
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // Pinned posts first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const handleVoteLike = async (postId: string | number) => {
    // Find the post and update its likes count
    const updatedPosts = posts.map(post => {
      if (String(post.id) === String(postId)) {
        return {
          ...post,
          likes: post.likes + 1
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    
    // Mock API call to update vote count
    await new Promise(resolve => setTimeout(resolve, 300));
    toast.success("Vote recorded");
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading retreat discussions: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <Tabs defaultValue={activePhase} onValueChange={(value) => setActivePhase(value as "pre" | "post")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pre" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Pre-Retreat</span>
            </TabsTrigger>
            <TabsTrigger value="post" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Post-Retreat</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pre" className="mt-4">
            <div className="bg-brand-subtle/10 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium mb-2">Pre-Retreat Discussion</h3>
              <p className="text-muted-foreground mb-1">
                Connect with fellow participants before your {retreatName || "retreat"} experience.
              </p>
              <p className="text-muted-foreground">
                Share your intentions, ask questions, and coordinate travel plans.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="post" className="mt-4">
            <div className="bg-brand-subtle/10 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium mb-2">Post-Retreat Discussion</h3>
              <p className="text-muted-foreground mb-1">
                Stay connected with your {retreatName || "retreat"} community.
              </p>
              <p className="text-muted-foreground">
                Share your experiences, ongoing practice insights, and continue to support each other.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <CommunitySearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />
        </div>
        {isLoggedIn && (
          <div className="w-full md:w-48">
            <CreatePost 
              onPostCreated={() => {}} 
              retreatId={retreatId} 
              retreatPhase={activePhase} 
            />
          </div>
        )}
      </div>

      {sortedPosts.length > 0 ? (
        <div className="space-y-4">
          {sortedPosts.map((post: ForumPost) => (
            <div key={post.id} className="relative">
              {post.isPinned && (
                <Badge className="absolute -top-2 -right-2 bg-brand-primary z-10">
                  Pinned
                </Badge>
              )}
              <CommunityPost
                post={{
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  user_id: post.user_id || '',
                  created_at: post.created_at || new Date().toISOString(),
                  likes: post.likes,
                  category: post.category || post.postedIn,
                  user_profiles: post.user_profiles ? {
                    username: post.user_profiles.username || "",
                    avatar_url: post.user_profiles.avatar_url || "",
                    is_wellness_practitioner: post.user_profiles.is_wellness_practitioner || false
                  } : null
                }}
                currentUserId={null}
                onPostUpdate={() => {}}
              />
            </div>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No discussions found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || categoryFilter !== "all"
              ? "Try adjusting your search or filters"
              : `Be the first to start a discussion for this ${activePhase === "pre" ? "upcoming" : "past"} retreat!`}
          </p>
          {isLoggedIn && (
            <CreatePost 
              onPostCreated={() => {}} 
              retreatId={retreatId} 
              retreatPhase={activePhase} 
            />
          )}
        </Card>
      )}

      {spaces.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Retreat Spaces</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces.map(space => (
              <Card key={space.id} className="p-4 hover:bg-brand-subtle/5 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  {space.icon === "MessageCircle" && <MessageCircle className="h-5 w-5 text-brand-primary" />}
                  {space.icon === "Calendar" && <Calendar className="h-5 w-5 text-brand-primary" />}
                  {space.icon === "Users" && <Users className="h-5 w-5 text-brand-primary" />}
                  <h4 className="font-medium">{space.name}</h4>
                </div>
                {space.description && (
                  <p className="text-sm text-muted-foreground">{space.description}</p>
                )}
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" className="text-brand-primary">
                    View Space
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RetreatDiscussions;
