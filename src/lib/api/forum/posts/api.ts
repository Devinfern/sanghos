
import { supabase } from "@/integrations/supabase/client";
import { ForumPost } from "../types";
import { forumPosts, updatePostsState } from "./state";
import { transformDatabasePost, transformForumPostToDatabase } from "./transformers";
import { PostDatabaseSchema } from "./types";

// Function to load forum posts from Supabase
export const loadForumPosts = async (): Promise<ForumPost[]> => {
  try {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*');
    
    if (error) {
      console.error("Error loading forum posts:", error);
      return [];
    }
    
    const posts = data.map(post => transformDatabasePost(post as PostDatabaseSchema));
    updatePostsState(posts);
    return posts;
  } catch (error) {
    console.error("Error in loadForumPosts:", error);
    return [];
  }
};

// Function to load forum posts for a specific space
export const loadForumPostsBySpace = async (spaceName: string): Promise<ForumPost[]> => {
  try {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .ilike('posted_in', spaceName);
    
    if (error) {
      console.error("Error loading forum posts for space:", error);
      return [];
    }
    
    return data.map(post => transformDatabasePost(post as PostDatabaseSchema));
  } catch (error) {
    console.error("Error in loadForumPostsBySpace:", error);
    return [];
  }
};

// Create a single forum post
export const createForumPost = async (postData: Omit<ForumPost, 'id' | 'timeAgo' | 'created_at' | 'updated_at'>): Promise<ForumPost> => {
  try {
    // Transform the post data to match the database schema
    const postToInsert = transformForumPostToDatabase(postData);
    
    // Insert the post into the database
    const { data, error } = await supabase
      .from('forum_posts')
      .insert(postToInsert)
      .select('*')
      .single();
      
    if (error) {
      console.error('Error creating forum post:', error);
      throw error;
    }
    
    if (!data) {
      throw new Error('No data returned after creating post');
    }
    
    // Transform the returned data to match our ForumPost format
    const newPost = transformDatabasePost(data as PostDatabaseSchema);
    
    // Update our local cache of posts
    updatePostsState([newPost, ...forumPosts]);
    
    return newPost;
  } catch (error) {
    console.error('Error in createForumPost:', error);
    throw error;
  }
};

// Update function to modify the posts data in Supabase
export const updateForumPosts = async (newPosts: typeof forumPosts): Promise<void> => {
  try {
    // First, delete all existing posts - fixed method that avoids using neq('id', 'dummy')
    const { error: deleteError } = await supabase
      .from('forum_posts')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
      
    if (deleteError) {
      console.error('Error deleting forum posts:', deleteError);
      return;
    }
    
    // Then insert the new posts
    const postsToInsert = newPosts.map(post => transformForumPostToDatabase(post));
    
    const { error: insertError } = await supabase
      .from('forum_posts')
      .insert(postsToInsert);
      
    if (insertError) {
      console.error('Error updating forum posts:', insertError);
      return;
    }
    
    // Update the local variable
    updatePostsState([...newPosts]);
    
    console.log('Forum posts updated successfully:', postsToInsert.length, 'posts inserted');
    
    // Reload the data
    await loadForumPosts();
  } catch (error) {
    console.error('Error in updateForumPosts:', error);
  }
};

// Seed function to populate the database with initial forum posts
export const seedForumPosts = async (): Promise<void> => {
  try {
    const { forumPosts } = await import("./state");
    const postsToInsert = forumPosts.map(post => transformForumPostToDatabase(post));
    
    const { error } = await supabase
      .from('forum_posts')
      .insert(postsToInsert);
      
    if (error) {
      console.error('Error seeding forum posts:', error);
    }
  } catch (error) {
    console.error('Error in seedForumPosts:', error);
  }
};
