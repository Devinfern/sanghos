
import { useState } from 'react';
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

const RetreatDiscussions = ({ retreatId, retreatName, isLoggedIn }: RetreatDiscussionsProps) => {
  const [activePhase, setActivePhase] = useState<"pre" | "post">("pre");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [spaces, setSpaces] = useState<any[]>([]);
  const { isAdmin } = useAdminStatus();

  const fetchPosts = async () => {
    if (!retreatId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          user_profiles(username, avatar_url, is_wellness_practitioner)
        `)
        .eq('retreat_id', retreatId)
        .eq('retreat_phase', activePhase)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching retreat posts:', error);
      toast.error('Failed to load retreat discussions');
    } finally {
      setIsLoading(false);
    }
  };

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
