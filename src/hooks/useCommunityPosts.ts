
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

  return { posts, isLoading, currentUserId, fetchPosts };
};
