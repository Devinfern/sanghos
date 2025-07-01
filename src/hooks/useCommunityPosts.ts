
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes: number;
  category: string;
  user_profiles?: {
    username: string;
    avatar_url: string;
    is_wellness_practitioner: boolean;
  } | null;
}

export const useCommunityPosts = (searchQuery = '', categoryFilter = 'all') => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);

      // Build query with type assertion
      let query = (supabase as any)
        .from('community_posts')
        .select(`
          *,
          user_profiles!community_posts_user_id_fkey (
            username,
            avatar_url,
            is_wellness_practitioner
          )
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }
      
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchQuery, categoryFilter]);

  return {
    posts,
    isLoading,
    currentUserId,
    fetchPosts
  };
};
