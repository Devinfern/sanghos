
import { supabase } from "@/integrations/supabase/client";
import { TrendingPost } from "../types";
import { defaultTrendingPosts } from "../../data/defaultCommunityData";

// State variable to store the current data
export let trendingPosts = [...defaultTrendingPosts];

// Function to load trending posts from Supabase
export const loadTrendingPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('trending_posts')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error loading trending posts:', error);
      return;
    }
    
    if (data && data.length > 0) {
      // Transform data to match our format
      const transformedPosts = data.map(post => ({
        id: post.id,
        title: post.title,
        author: post.author,
        avatar: post.avatar
      }));
      
      trendingPosts = transformedPosts;
    } else {
      // If no data, seed the database with our initial data
      await seedTrendingPosts();
    }
  } catch (error) {
    console.error('Error in loadTrendingPosts:', error);
  }
};

// Seed functions to populate the database with initial data
export const seedTrendingPosts = async () => {
  try {
    const postsToInsert = defaultTrendingPosts.map(post => ({
      title: post.title,
      author: post.author,
      avatar: post.avatar
    }));
    
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
export const updateTrendingPosts = async (newTrendingPosts: typeof trendingPosts) => {
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
    const postsToInsert = newTrendingPosts.map(post => ({
      title: post.title,
      author: post.author,
      avatar: post.avatar
    }));
    
    const { error: insertError } = await supabase
      .from('trending_posts')
      .insert(postsToInsert);
      
    if (insertError) {
      console.error('Error updating trending posts:', insertError);
      return;
    }
    
    // Update the local variable
    trendingPosts = [...newTrendingPosts];
    
    console.log('Trending posts updated successfully:', postsToInsert.length, 'posts inserted');
    
    // Reload the data
    await loadTrendingPosts();
  } catch (error) {
    console.error('Error in updateTrendingPosts:', error);
  }
};
