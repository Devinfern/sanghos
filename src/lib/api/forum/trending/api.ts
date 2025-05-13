
import { supabase } from "@/integrations/supabase/client";
import { TrendingPost } from "../types";
import { trendingPosts, updateTrendingPostsState } from "./state";
import { transformDatabaseTrendingPost, transformTrendingPostToDatabase } from "./transformers";
import { TrendingPostDatabaseSchema } from "./types";

// Function to load trending posts from Supabase
export const loadTrendingPosts = async (): Promise<TrendingPost[]> => {
  try {
    const { data, error } = await supabase
      .from('trending_posts')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error loading trending posts:', error);
      return trendingPosts;
    }
    
    if (data && data.length > 0) {
      // Transform data to match our format
      const transformedPosts = data.map(post => 
        transformDatabaseTrendingPost(post as TrendingPostDatabaseSchema)
      );
      
      updateTrendingPostsState(transformedPosts);
      return transformedPosts;
    } else {
      // If no data, seed the database with our initial data
      await seedTrendingPosts();
      return trendingPosts;
    }
  } catch (error) {
    console.error('Error in loadTrendingPosts:', error);
    return trendingPosts;
  }
};

// Seed functions to populate the database with initial data
export const seedTrendingPosts = async (): Promise<void> => {
  try {
    const postsToInsert = trendingPosts.map(post => 
      transformTrendingPostToDatabase(post)
    );
    
    const { error } = await supabase
      .from('trending_posts')
      .insert(postsToInsert);
      
    if (error) {
      console.error('Error seeding trending posts:', error);
    }
  } catch (error) {
    console.error('Error in seedTrendingPosts:', error);
  }
};

// Update function to modify the data in Supabase
export const updateTrendingPosts = async (newTrendingPosts: TrendingPost[]): Promise<void> => {
  try {
    // First, delete all existing trending posts - fixed method that avoids using neq('id', 'dummy')
    const { error: deleteError } = await supabase
      .from('trending_posts')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
      
    if (deleteError) {
      console.error('Error deleting trending posts:', deleteError);
      return;
    }
    
    // Then insert the new trending posts
    const postsToInsert = newTrendingPosts.map(post => 
      transformTrendingPostToDatabase(post)
    );
    
    const { error: insertError } = await supabase
      .from('trending_posts')
      .insert(postsToInsert);
      
    if (insertError) {
      console.error('Error updating trending posts:', insertError);
      return;
    }
    
    // Update the local variable
    updateTrendingPostsState(newTrendingPosts);
    
    console.log('Trending posts updated successfully:', postsToInsert.length, 'posts inserted');
    
    // Reload the data
    await loadTrendingPosts();
  } catch (error) {
    console.error('Error in updateTrendingPosts:', error);
  }
};
