
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define simpler types without circular references
type Post = {
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
};

type RetreatPostsResult = {
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
  }, [retreatId]);

  return {
    posts,
    isLoading,
    error,
    refetch: fetchPosts
  };
};
