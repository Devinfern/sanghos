
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Post, UserProfile, RetreatPhase } from "@/types/community";
import { toast } from "sonner";

// Use any for the raw database query to avoid TypeScript recursion
export function useRetreatPosts(retreatId: string | undefined, phase: RetreatPhase) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    if (!retreatId) return;
    
    setIsLoading(true);
    try {
      // Use raw query approach to avoid type recursion
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
      
      // Transform the post data into our app's Post type
      const transformedPosts: Post[] = [];
      
      // Process each post individually
      for (const rawPost of rawPosts) {
        // Fetch the user profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('username, avatar_url, is_wellness_practitioner')
          .eq('id', rawPost.user_id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
        }
        
        // Create properly typed user profile
        let userProfile: UserProfile | null = null;
        
        if (profileData) {
          userProfile = {
            username: profileData.username,
            avatar_url: profileData.avatar_url || '',
            is_wellness_practitioner: Boolean(profileData.is_wellness_practitioner)
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
