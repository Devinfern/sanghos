
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

interface Post {
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
      const result = await supabase
        .from('community_posts')
        .select('*')
        .eq('retreat_id', retreatId)
        .eq('retreat_phase', phase)
        .order('created_at', { ascending: false });
      
      if (result.error) throw result.error;
      
      const rawPosts = result.data as RawPost[];
      
      if (!rawPosts || rawPosts.length === 0) {
        setPosts([]);
        setIsLoading(false);
        return;
      }
      
      // Transform the post data into our app's Post type
      const transformedPosts: Post[] = [];
      
      // Process each post individually
      for (const rawPost of rawPosts) {
        // Fetch the user profile
        const profileResult = await supabase
          .from('user_profiles')
          .select('username, avatar_url, is_wellness_practitioner')
          .eq('id', rawPost.user_id)
          .maybeSingle();
        
        if (profileResult.error) {
          console.error('Error fetching profile:', profileResult.error);
        }
        
        const profileData = profileResult.data as RawProfile | null;
        
        // Create properly typed user profile
        const userProfile: UserProfile | null = profileData ? {
          username: profileData.username,
          avatar_url: profileData.avatar_url || '',
          is_wellness_practitioner: Boolean(profileData.is_wellness_practitioner)
        } : null;
        
        transformedPosts.push({
          id: rawPost.id,
          title: rawPost.title,
          content: rawPost.content,
          user_id: rawPost.user_id,
          created_at: rawPost.created_at,
          likes: rawPost.likes || 0,
          category: rawPost.category,
          user_profiles: userProfile
        });
      }
      
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
