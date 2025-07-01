
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RetreatPost {
  id: string;
  title: string;
  content: string;
  user_id: string;
  author_name: string;
  created_at: string;
  category: string;
  likes: number;
  comments: number;
  tags: string[];
  phase_type: string;
  retreat_id: string;
}

export const useRetreatPosts = (retreatId: string) => {
  const [posts, setPosts] = useState<RetreatPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use type assertion to work around type issues temporarily
      const { data, error: fetchError } = await (supabase as any)
        .from('community_posts')
        .select('*')
        .eq('retreat_id', retreatId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match expected format
      const transformedPosts: RetreatPost[] = (data || []).map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        user_id: post.user_id,
        author_name: 'Anonymous', // Will be populated from user profiles later
        created_at: post.created_at,
        category: post.category || 'general',
        likes: post.likes || 0,
        comments: 0, // Will be populated from comments count later
        tags: [], // Will be added when we implement tags
        phase_type: post.retreat_phase || 'pre',
        retreat_id: post.retreat_id || retreatId
      }));

      setPosts(transformedPosts);
    } catch (err) {
      console.error('Error fetching retreat posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (retreatId) {
      refetch();
    }
  }, [retreatId]);

  return {
    posts,
    isLoading,
    error,
    refetch
  };
};
