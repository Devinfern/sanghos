
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ForumSpace, ForumPost } from "@/lib/forumData";

export const useRetreatCommunity = (retreatId?: string, phase?: "pre" | "post") => {
  const [spaces, setSpaces] = useState<ForumSpace[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRetreatCommunityData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch spaces related to this retreat
        const spacesQuery = supabase
          .from('forum_spaces')
          .select('*');
        
        // If retreat ID is provided, filter for that retreat
        if (retreatId) {
          spacesQuery.eq('retreat_id', retreatId);
        }

        // If phase is specified, filter for pre or post retreat spaces
        if (phase === "pre") {
          spacesQuery.eq('is_pre_retreat', true);
        } else if (phase === "post") {
          spacesQuery.eq('is_post_retreat', true);
        }

        const { data: spacesData, error: spacesError } = await spacesQuery;
        
        if (spacesError) throw new Error(`Error fetching spaces: ${spacesError.message}`);

        // Transform spaces data to match ForumSpace type
        const transformedSpaces: ForumSpace[] = spacesData.map(space => ({
          id: space.id,
          name: space.name,
          description: space.description || '',
          category: space.category,
          icon: space.icon,
          count: space.count,
          retreatId: space.retreat_id,
          isPreRetreat: space.is_pre_retreat,
          isPostRetreat: space.is_post_retreat
        }));

        setSpaces(transformedSpaces);

        // Fetch posts related to this retreat
        const postsQuery = supabase
          .from('forum_posts')
          .select(`
            *,
            user_profiles (
              username,
              avatar_url,
              is_wellness_practitioner
            )
          `)
          .order('created_at', { ascending: false });
        
        // If retreat ID is provided, filter for that retreat
        if (retreatId) {
          postsQuery.eq('retreat_id', retreatId);
        }

        // If phase is specified, filter for pre or post retreat posts
        if (phase === "pre") {
          postsQuery.eq('retreat_phase', 'pre');
        } else if (phase === "post") {
          postsQuery.eq('retreat_phase', 'post');
        }

        const { data: postsData, error: postsError } = await postsQuery;
        
        if (postsError) throw new Error(`Error fetching posts: ${postsError.message}`);

        // Transform posts data
        const transformedPosts: ForumPost[] = postsData.map(post => {
          const userProfile = post.user_profiles || {
            username: "Anonymous",
            avatar_url: "/placeholder.svg" 
          };

          return {
            id: post.id,
            author: {
              name: userProfile.username,
              role: userProfile.is_wellness_practitioner ? "Host" : "Member",
              avatar: userProfile.avatar_url || "/placeholder.svg",
              tag: userProfile.is_wellness_practitioner ? "Wellness Guide" : undefined
            },
            postedIn: post.posted_in,
            timeAgo: new Date(post.created_at).toLocaleString(),
            title: post.title,
            content: post.content,
            likes: post.likes || 0,
            comments: post.comments || 0,
            bookmarked: false,
            retreatId: post.retreat_id,
            retreatPhase: post.retreat_phase,
            isPinned: post.is_pinned
          };
        });

        setPosts(transformedPosts);

      } catch (err) {
        console.error("Error in useRetreatCommunity:", err);
        setError(err instanceof Error ? err.message : "Failed to load retreat community data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRetreatCommunityData();
  }, [retreatId, phase]);

  return { spaces, posts, isLoading, error };
};
