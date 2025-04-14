
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import CommunityPost from "./CommunityPost";
import CreatePost from "./CreatePost";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface CommunityDiscussionsProps {
  isLoggedIn: boolean;
}

const CommunityDiscussions = ({ isLoggedIn }: CommunityDiscussionsProps) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('community_posts')
          .select(`
            *,
            user_profiles:user_id (
              username,
              avatar_url,
              is_wellness_practitioner
            )
          `)
          .order('created_at', { ascending: false });

        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
        }

        if (categoryFilter) {
          query = query.eq('category', categoryFilter);
        }

        const { data, error } = await query;
        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentUserId(session?.user.id || null);
    };

    checkUser();
    fetchPosts();

    // Set up realtime subscription
    const postsSubscription = supabase
      .channel('community_posts')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'community_posts'
      }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      postsSubscription.unsubscribe();
    };
  }, [searchQuery, categoryFilter]);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="question">Questions</SelectItem>
              <SelectItem value="discussion">Discussions</SelectItem>
              <SelectItem value="resource">Resources</SelectItem>
              <SelectItem value="event">Events</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isLoggedIn && (
          <div className="w-full md:w-48">
            <CreatePost onPostCreated={() => {}} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <CommunityPost
            key={post.id}
            post={post}
            currentUserId={currentUserId}
            onPostUpdate={() => {}}
          />
        ))}
        {posts.length === 0 && (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || categoryFilter
                ? "Try adjusting your search or filters"
                : "Be the first to start a discussion!"}
            </p>
            {isLoggedIn && <CreatePost onPostCreated={() => {}} />}
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommunityDiscussions;
