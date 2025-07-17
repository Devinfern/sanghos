
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

      // Fetch posts
      let query = supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }
      
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data: postsData, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      if (postsData) {
        // Get user profiles for all post authors
        const userIds = [...new Set(postsData.map(post => post.user_id).filter(Boolean))];
        
        const { data: profilesData } = await supabase
          .from('user_profiles')
          .select('*')
          .in('user_id', userIds);

        // Combine posts with user profiles
        const postsWithProfiles = postsData.map(post => ({
          ...post,
          user_profiles: profilesData?.find(profile => profile.user_id === post.user_id)
        }));

        setPosts(postsWithProfiles);
      }
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
