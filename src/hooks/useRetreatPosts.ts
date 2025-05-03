
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Post, RawPost, UserProfile, RetreatPhase } from "@/types/community";
import { toast } from "sonner";

// Define a type for the raw data returned from Supabase to avoid deep type instantiation
type SupabasePostResult = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes: number;
  category: string;
  retreat_id?: string;
  retreat_phase?: string;
  is_pinned?: boolean;
  updated_at?: string;
}

export function useRetreatPosts(retreatId: string | undefined, phase: RetreatPhase) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    if (!retreatId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('retreat_id', retreatId)
        .eq('retreat_phase', phase)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Explicitly type the data to avoid deep instantiation
      const rawPosts = data as SupabasePostResult[];
      
      // Get profiles for each post
      const postsWithProfiles: Post[] = [];
      
      for (const post of rawPosts) {
        // Try to get the user profile
        const { data: profileData } = await supabase
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
          user_profiles: profileData as UserProfile || null
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

  useEffect(() => {
    fetchPosts();
  }, [retreatId, phase]);

  return { posts, isLoading, refreshPosts: fetchPosts };
}
