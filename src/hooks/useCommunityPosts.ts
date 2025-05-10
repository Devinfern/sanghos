
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useCommunityPosts = (searchQuery: string, categoryFilter: string) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          user_profiles(
            username,
            avatar_url,
            is_wellness_practitioner
          )
        `)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      if (categoryFilter && categoryFilter !== "all") {
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

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentUserId(session?.user.id || null);
    };

    checkUser();
    fetchPosts();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:community_posts')
      .on('postgres_changes', {
        event: '*', // Listen to all events
        schema: 'public',
        table: 'community_posts',
      }, () => {
        // Refetch posts when any changes occur
        // This approach ensures we get the related user_profiles data too
        console.log('Real-time community post update detected, refetching...');
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [searchQuery, categoryFilter]);

  return { posts, isLoading, currentUserId, fetchPosts };
};
