
import { supabase } from "@/integrations/supabase/client";
import { ForumPost } from "../types";
import { defaultForumPosts } from "../../data/defaultCommunityData";
import { formatTimeAgo } from "../../utils/formatters";

// State variable to store the current data
export let forumPosts = [...defaultForumPosts];

// Function to load forum posts from Supabase
export const loadForumPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*');
    
    if (error) {
      console.error("Error loading forum posts:", error);
      return [];
    }
    
    return data.map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: {
        name: post.author_name,
        role: post.author_role,
        avatar: post.author_avatar,
        tag: post.author_tag,
      },
      postedIn: post.posted_in,
      timeAgo: formatTimeAgo(post.created_at),
      likes: post.likes || 0,
      comments: post.comments || 0,
      bookmarked: post.bookmarked || false,
      isPinned: Boolean(post.is_pinned),  // Convert to Boolean to handle undefined/null
      created_at: post.created_at,
      updated_at: post.updated_at
    }));
  } catch (error) {
    console.error("Error in loadForumPosts:", error);
    return [];
  }
};

// Function to load forum posts for a specific space
export const loadForumPostsBySpace = async (spaceName: string) => {
  try {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .ilike('posted_in', spaceName);
    
    if (error) {
      console.error("Error loading forum posts for space:", error);
      return [];
    }
    
    return data.map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: {
        name: post.author_name,
        role: post.author_role,
        avatar: post.author_avatar,
        tag: post.author_tag,
      },
      postedIn: post.posted_in,
      timeAgo: formatTimeAgo(post.created_at),
      likes: post.likes || 0,
      comments: post.comments || 0,
      bookmarked: post.bookmarked || false,
      isPinned: Boolean(post.is_pinned),  // Convert to Boolean to handle undefined/null
      created_at: post.created_at,
      updated_at: post.updated_at
    }));
  } catch (error) {
    console.error("Error in loadForumPostsBySpace:", error);
    return [];
  }
};

// Create a single forum post
export const createForumPost = async (postData: Omit<ForumPost, 'id' | 'timeAgo' | 'created_at' | 'updated_at'>) => {
  try {
    // Transform the post data to match the database schema
    const postToInsert = {
      author_name: postData.author.name,
      author_role: postData.author.role,
      author_avatar: postData.author.avatar,
      author_tag: postData.author.tag,
      posted_in: postData.postedIn,
      title: postData.title,
      content: postData.content,
      likes: postData.likes || 0,
      comments: postData.comments || 0,
      bookmarked: postData.bookmarked || false,
      is_pinned: postData.isPinned || false  // Match database column name here
    };
    
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
    const newPost: ForumPost = {
      id: data.id,
      title: data.title,
      content: data.content,
      author: {
        name: data.author_name,
        role: data.author_role,
        avatar: data.author_avatar,
        tag: data.author_tag,
      },
      postedIn: data.posted_in,
      timeAgo: formatTimeAgo(data.created_at),
      likes: data.likes || 0,
      comments: data.comments || 0,
      bookmarked: data.bookmarked || false,
      isPinned: Boolean(data.is_pinned),  // Convert to Boolean to handle undefined/null
      created_at: data.created_at,
      updated_at: data.updated_at
    };
    
    // Update our local cache of posts
    forumPosts = [newPost, ...forumPosts];
    
    return newPost;
  } catch (error) {
    console.error('Error in createForumPost:', error);
    throw error;
  }
};

// Seed function to populate the database with initial forum posts
export const seedForumPosts = async () => {
  try {
    const postsToInsert = defaultForumPosts.map(post => ({
      author_name: post.author.name,
      author_role: post.author.role,
      author_avatar: post.author.avatar,
      author_tag: post.author.tag,
      posted_in: post.postedIn,
      title: post.title,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      bookmarked: post.bookmarked,
      is_pinned: post.isPinned || false, // Add is_pinned with null fallback
    }));
    
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

// Update function to modify the posts data in Supabase
export const updateForumPosts = async (newPosts: typeof forumPosts) => {
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
    const postsToInsert = newPosts.map(post => ({
      author_name: post.author.name,
      author_role: post.author.role,
      author_avatar: post.author.avatar,
      author_tag: post.author.tag,
      posted_in: post.postedIn,
      title: post.title,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      bookmarked: post.bookmarked,
      is_pinned: post.isPinned || false // Properly handle the isPinned field
    }));
    
    const { error: insertError } = await supabase
      .from('forum_posts')
      .insert(postsToInsert);
      
    if (insertError) {
      console.error('Error updating forum posts:', insertError);
      return;
    }
    
    // Update the local variable
    forumPosts = [...newPosts];
    
    console.log('Forum posts updated successfully:', postsToInsert.length, 'posts inserted');
    
    // Reload the data
    await loadForumPosts();
  } catch (error) {
    console.error('Error in updateForumPosts:', error);
  }
};
