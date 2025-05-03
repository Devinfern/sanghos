
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Post, UserProfile, RetreatPhase } from "@/types/community";
import { toast } from "sonner";

// Define explicit interface for raw database results
interface RawPostData {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes: number | null;
  category: string;
  retreat_id: string;
  retreat_phase: string;
  is_pinned?: boolean;
  updated_at?: string;
}

interface ProfileData {
  username: string;
  avatar_url: string | null;
  is_wellness_practitioner: boolean | null;
}

export function useRetreatPosts(retreatId: string | undefined, phase: RetreatPhase) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    if (!retreatId) return;
    
    setIsLoading(true);
    try {
      // Use typecasting to avoid deep type inference
      const response = await supabase
        .from('community_posts')
        .select('*')
        .eq('retreat_id', retreatId)
        .eq('retreat_phase', phase)
        .order('created_at', { ascending: false }) as { 
          data: RawPostData[] | null; 
          error: Error | null;
        };
      
      if (response.error) throw response.error;
      
      if (!response.data || response.data.length === 0) {
        setPosts([]);
        setIsLoading(false);
        return;
      }
      
      // Transform the post data into our app's Post type
      const transformedPosts: Post[] = [];
      
      // Process each post individually with explicit typing
      for (const rawPost of response.data) {
        // Fetch the user profile with explicit typing
        const profileResponse = await supabase
          .from('user_profiles')
          .select('username, avatar_url, is_wellness_practitioner')
          .eq('id', rawPost.user_id)
          .single() as {
            data: ProfileData | null;
            error: Error | null;
          };
        
        if (profileResponse.error) {
          console.error('Error fetching profile:', profileResponse.error);
        }
        
        // Create properly typed user profile
        let userProfile: UserProfile | null = null;
        
        if (profileResponse.data) {
          userProfile = {
            username: profileResponse.data.username,
            avatar_url: profileResponse.data.avatar_url || '',
            is_wellness_practitioner: Boolean(profileResponse.data.is_wellness_practitioner)
          };
        }
        
        // Create properly typed post object
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
