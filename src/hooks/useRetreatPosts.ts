
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
      const result = await supabase
        .from('community_posts')
        .select('*')
        .eq('retreat_id', retreatId)
        .eq('retreat_phase', phase)
        .order('created_at', { ascending: false });
      
      if (result.error) throw result.error;
      if (!result.data || result.data.length === 0) {
        setPosts([]);
        setIsLoading(false);
        return;
      }
      
      // Safely cast the data to our known type
      const postsData = result.data as unknown as RawPostData[];
      
      // Transform the post data into our app's Post type
      const transformedPosts: Post[] = [];
      
      // Process each post individually
      for (const rawPost of postsData) {
        // Fetch the user profile separately
        const profileResult = await supabase
          .from('user_profiles')
          .select('username, avatar_url, is_wellness_practitioner')
          .eq('id', rawPost.user_id)
          .single();
        
        // Create properly typed user profile
        let userProfile: UserProfile | null = null;
        
        if (profileResult.data) {
          const profile = profileResult.data as unknown as ProfileData;
          userProfile = {
            username: profile.username,
            avatar_url: profile.avatar_url || '',
            is_wellness_practitioner: Boolean(profile.is_wellness_practitioner)
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
