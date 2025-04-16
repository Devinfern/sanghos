
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ForumSpace, ForumPost } from "@/lib/forumData";

// Define types for Supabase forum space data
type SupabaseForumSpace = {
  id: string;
  name: string;
  description?: string;
  category: string;
  icon: string;
  count?: number;
  retreat_id?: string;
  is_pre_retreat?: boolean;
  is_post_retreat?: boolean;
  created_at: string;
  updated_at: string;
};

// Define types for Supabase forum post data
type SupabaseForumPost = {
  id: string;
  title: string;
  content: string;
  posted_in: string;
  likes: number;
  comments: number;
  bookmarked: boolean;
  author_name: string;
  author_role: string;
  author_avatar: string;
  author_tag?: string;
  retreat_id?: string;
  retreat_phase?: "pre" | "post";
  is_pinned?: boolean;
  created_at: string;
  updated_at: string;
  user_id?: string;
  user_profiles?: {
    username?: string;
    avatar_url?: string;
    is_wellness_practitioner?: boolean;
  } | null;
};

// User profile type for mapping
type UserProfile = {
  username?: string;
  avatar_url?: string;
  is_wellness_practitioner?: boolean;
} | null;

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
        // Mock data for spaces and posts since the database tables don't exist yet
        const mockSpaces: ForumSpace[] = [
          {
            id: "space-1",
            name: "General Discussion",
            description: "Talk about anything related to the retreat",
            category: "discussion",
            icon: "MessageCircle",
            count: 5,
            retreatId: retreatId,
            isPreRetreat: phase === "pre",
            isPostRetreat: phase === "post"
          },
          {
            id: "space-2",
            name: "Travel Coordination",
            description: "Plan your journey to the retreat",
            category: "logistics",
            icon: "Calendar",
            count: 3,
            retreatId: retreatId,
            isPreRetreat: phase === "pre",
            isPostRetreat: false
          },
          {
            id: "space-3",
            name: "Practice Support",
            description: "Get support for your ongoing practice",
            category: "support",
            icon: "Users",
            count: 8,
            retreatId: retreatId,
            isPreRetreat: false,
            isPostRetreat: phase === "post"
          }
        ];

        const mockPosts: ForumPost[] = [
          {
            id: "post-1",
            title: "Welcome to our retreat community!",
            content: "We're excited to have you join us for this transformative experience.",
            author: {
              name: "Sarah Johnson",
              role: "Host",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
              tag: "Retreat Leader"
            },
            postedIn: "General Discussion",
            timeAgo: "2 days ago",
            likes: 12,
            comments: 5,
            bookmarked: false,
            isPinned: true,
            retreatId: retreatId,
            retreatPhase: phase,
            user_id: "user-1",
            created_at: "2025-04-14T10:00:00Z"
          },
          {
            id: "post-2",
            title: "What to pack for the retreat",
            content: "Here's a list of essential items to bring with you...",
            author: {
              name: "Michael Chen",
              role: "Member",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            },
            postedIn: "Travel Coordination",
            timeAgo: "1 day ago",
            likes: 8,
            comments: 10,
            bookmarked: true,
            retreatId: retreatId,
            retreatPhase: phase,
            user_id: "user-2",
            created_at: "2025-04-15T14:30:00Z"
          },
          {
            id: "post-3",
            title: "My meditation experience so far",
            content: "I've been practicing the techniques we learned and wanted to share my progress...",
            author: {
              name: "Emma Wilson",
              role: "Member",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            },
            postedIn: "Practice Support",
            timeAgo: "5 hours ago",
            likes: 15,
            comments: 7,
            bookmarked: false,
            retreatId: retreatId,
            retreatPhase: phase,
            user_id: "user-3",
            created_at: "2025-04-16T08:15:00Z"
          }
        ];

        // Filter spaces based on retreat phase if specified
        let filteredSpaces = [...mockSpaces];
        if (phase === "pre") {
          filteredSpaces = filteredSpaces.filter(space => space.isPreRetreat);
        } else if (phase === "post") {
          filteredSpaces = filteredSpaces.filter(space => space.isPostRetreat);
        }

        setSpaces(filteredSpaces);
        setPosts(mockPosts);

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
