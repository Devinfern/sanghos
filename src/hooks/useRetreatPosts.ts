
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define simpler types without circular references
export type Post = {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_id: string;
  created_at: string;
  likes: number;
  comments: number;
  author_avatar?: string;
  author_role?: string;
  category?: string;
  user_id?: string;
};

export type RetreatPostsResult = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useRetreatPosts = (retreatId: string): RetreatPostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Here we would normally fetch posts related to a specific retreat
      // Since we don't have actual data, we're simulating with forum_posts
      const { data, error: fetchError } = await supabase
        .from('forum_posts')
        .select('*')
        .eq('posted_in', `retreat-${retreatId}`)
        .order('created_at', { ascending: false });

      if (fetchError) throw new Error(fetchError.message);
      
      // Cast the data to our simplified Post type
      setPosts(data as Post[] || []);
    } catch (err) {
      console.error("Error fetching retreat posts:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch retreat posts");
      
      // Fallback to empty array
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Set up real-time subscription for this retreat's posts
    const channel = supabase
      .channel('public:forum_posts')
      .on('postgres_changes', {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'forum_posts',
        filter: `posted_in=eq.retreat-${retreatId}` // Only listen to this retreat's posts
      }, (payload) => {
        console.log('Real-time update received:', payload);
        
        // Handle different types of changes
        if (payload.eventType === 'INSERT') {
          // Add the new post to the list
          setPosts(currentPosts => [payload.new as Post, ...currentPosts]);
        } else if (payload.eventType === 'UPDATE') {
          // Update the existing post
          setPosts(currentPosts => 
            currentPosts.map(post => 
              post.id === payload.new.id ? payload.new as Post : post
            )
          );
        } else if (payload.eventType === 'DELETE') {
          // Remove the deleted post
          setPosts(currentPosts => 
            currentPosts.filter(post => post.id !== payload.old.id)
          );
        }
      })
      .subscribe();

    // Clean up subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [retreatId]);

  return {
    posts,
    isLoading,
    error,
    refetch: fetchPosts
  };
};
