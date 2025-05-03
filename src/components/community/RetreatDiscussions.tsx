
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, MessageCircle, Users, AlertCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CommunitySearchFilter from "./CommunitySearchFilter";
import CreatePost from "./CreatePost";
import CommunityPost from "./CommunityPost";
import { useAdminStatus } from "@/hooks/useAdminStatus";

interface RetreatDiscussionsProps {
  retreatId?: string;
  retreatName?: string;
  isLoggedIn: boolean;
}

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

// Define a more specific type for Supabase query results
interface SupabasePostResult {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes: number;
  category: string;
  retreat_id: string;
  retreat_phase: string;
  is_pinned?: boolean;
  updated_at: string;
}

const RetreatDiscussions = ({ retreatId, retreatName, isLoggedIn }: RetreatDiscussionsProps) => {
  const [activePhase, setActivePhase] = useState<"pre" | "post">("pre");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const { isAdmin } = useAdminStatus();

  const fetchPosts = async () => {
    if (!retreatId) return;
    
    setIsLoading(true);
    try {
      // Use a more direct approach without chaining methods that cause type issues
      const response = await supabase
        .from('community_posts')
        .select('*')
        .eq('retreat_id', retreatId)
        .eq('retreat_phase', activePhase)
        .order('created_at', { ascending: false });

      if (response.error) throw response.error;
      
      const data = response.data as SupabasePostResult[];
      
      // Get profiles for each post
      const postsWithProfiles: Post[] = [];
      
      for (const post of data) {
        // Try to get the user profile
        const profileResponse = await supabase
          .from('user_profiles')
          .select('username, avatar_url, is_wellness_practitioner')
          .eq('id', post.user_id)
          .single();
          
        postsWithProfiles.push({
          id: post.id,
          title: post.title,
          content: post.content,
          user_id: post.user_id,
          created_at: post.created_at,
          likes: post.likes || 0,
          category: post.category,
          user_profiles: profileResponse.data || null
        });
      }
      
      setPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error fetching retreat posts:', error);
      toast.error('Failed to load retreat discussions');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch posts when the component mounts or when activePhase changes
  useEffect(() => {
    fetchPosts();
  }, [retreatId, activePhase]);

  const createSpace = async () => {
    if (!isAdmin) {
      toast.error("Only administrators can create spaces");
      return;
    }

    if (!retreatId) {
      toast.error("Retreat ID is required");
      return;
    }

    toast.info("This feature will be available soon");
  };

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
              <p className="text-muted-foreground">
                Connect with fellow participants before your {retreatName || "retreat"} experience.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="post" className="mt-4">
            <div className="bg-brand-subtle/10 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium mb-2">Post-Retreat Discussion</h3>
              <p className="text-muted-foreground">
                Stay connected with your {retreatName || "retreat"} community.
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
              onPostCreated={fetchPosts} 
              retreatId={retreatId || ""} 
              retreatPhase={activePhase} 
            />
          </div>
        )}
      </div>

      {isLoading ? (
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
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <CommunityPost 
              key={post.id}
              post={post}
              onPostUpdate={fetchPosts}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Discussion board coming soon</h3>
          <p className="text-muted-foreground mb-4">
            We're preparing a space for vibrant discussions about this retreat.
          </p>
          {isLoggedIn && isAdmin && (
            <Button onClick={createSpace} className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Space
            </Button>
          )}
        </Card>
      )}
    </div>
  );
};

export default RetreatDiscussions;
