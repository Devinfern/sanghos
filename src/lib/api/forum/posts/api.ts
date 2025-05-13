
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
    
    // Make sure we have all required fields
    if (!postToInsert.author_name || !postToInsert.author_role || !postToInsert.author_avatar || 
        !postToInsert.title || !postToInsert.content || !postToInsert.posted_in) {
      throw new Error('Missing required fields for forum post');
    }
    
    // Insert the post into the database
    const { data, error } = await supabase
      .from('forum_posts')
      .insert({
        author_name: postToInsert.author_name,
        author_role: postToInsert.author_role,
        author_avatar: postToInsert.author_avatar,
        author_tag: postToInsert.author_tag,
        posted_in: postToInsert.posted_in,
        title: postToInsert.title,
        content: postToInsert.content,
        likes: postToInsert.likes || 0,
        comments: postToInsert.comments || 0,
        bookmarked: postToInsert.bookmarked || false,
        is_pinned: postToInsert.is_pinned || false
      })
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
    
    // Then prepare posts for insertion, making sure all required fields are present
    const postsToInsert = newPosts.map(post => {
      const dbPost = transformForumPostToDatabase(post);
      return {
        author_name: dbPost.author_name || "Unknown Author",
        author_role: dbPost.author_role || "Member",
        author_avatar: dbPost.author_avatar || "/placeholder.svg",
        author_tag: dbPost.author_tag,
        posted_in: dbPost.posted_in || "General",
        title: dbPost.title || "Untitled Post",
        content: dbPost.content || "No content provided",
        likes: dbPost.likes || 0,
        comments: dbPost.comments || 0,
        bookmarked: dbPost.bookmarked || false,
        is_pinned: dbPost.is_pinned || false
      };
    });
    
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
    
    // Prepare posts for insertion, making sure all required fields are present
    const postsToInsert = forumPosts.map(post => {
      const dbPost = transformForumPostToDatabase(post);
      return {
        author_name: dbPost.author_name || "Unknown Author",
        author_role: dbPost.author_role || "Member",
        author_avatar: dbPost.author_avatar || "/placeholder.svg",
        author_tag: dbPost.author_tag,
        posted_in: dbPost.posted_in || "General",
        title: dbPost.title || "Untitled Post",
        content: dbPost.content || "No content provided",
        likes: dbPost.likes || 0,
        comments: dbPost.comments || 0,
        bookmarked: dbPost.bookmarked || false,
        is_pinned: dbPost.is_pinned || false
      };
    });
      
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
