
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define simple interfaces for raw data
interface RawPost {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes?: number;
  category: string;
  retreat_id?: string;
  retreat_phase?: string;
}

interface RawProfile {
  username: string;
  avatar_url: string | null;
  is_wellness_practitioner: boolean | null;
}

// Define simplified interfaces to avoid circular references
interface UserProfile {
  username: string;
  avatar_url: string;
  is_wellness_practitioner: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes: number;
  category: string;
  user_profiles: UserProfile | null;
}

export type RetreatPhase = 'pre' | 'during' | 'post';

export function useRetreatPosts(retreatId: string | undefined, phase: RetreatPhase) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    if (!retreatId) return;
    
    setIsLoading(true);
    try {
      // Query posts with retreat_id and phase filter
      const { data: rawPosts, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('retreat_id', retreatId)
        .eq('retreat_phase', phase)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (!rawPosts || rawPosts.length === 0) {
        setPosts([]);
        setIsLoading(false);
        return;
      }
      
      // Transform the post data
      const transformedPosts = await Promise.all(
        rawPosts.map(async (post: RawPost) => {
          // Fetch the user profile
          const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('username, avatar_url, is_wellness_practitioner')
            .eq('id', post.user_id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          }
          
          const profile: UserProfile | null = profileData 
            ? {
                username: profileData.username,
                avatar_url: profileData.avatar_url || '',
                is_wellness_practitioner: Boolean(profileData.is_wellness_practitioner)
              }
            : null;
          
          // Transform to our app's Post type
          return {
            id: post.id,
            title: post.title,
            content: post.content,
            user_id: post.user_id,
            created_at: post.created_at,
            likes: post.likes || 0,
            category: post.category,
            user_profiles: profile
          };
        })
      );
      
      setPosts(transformedPosts);
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
