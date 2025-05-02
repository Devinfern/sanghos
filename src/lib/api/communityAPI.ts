import { supabase } from "@/integrations/supabase/client";
import { 
  ForumCategory, 
  ForumPost, 
  ForumEvent, 
  TrendingPost 
} from "../types/community";
import { formatTimeAgo } from "../utils/formatters";
import {
  defaultForumSpaces,
  defaultForumPosts,
  defaultForumEvents,
  defaultTrendingPosts
} from "../data/defaultCommunityData";

// State variables to store the current data
export let forumSpaces = [...defaultForumSpaces];
export let forumPosts = [...defaultForumPosts];
export let forumEvents = [...defaultForumEvents];
export let trendingPosts = [...defaultTrendingPosts];

// Function to load forum spaces from Supabase
export const loadForumSpaces = async () => {
  try {
    const { data, error } = await supabase
      .from('forum_spaces')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error loading forum spaces:', error);
      return;
    }
    
    if (data && data.length > 0) {
      // Transform data to match our format
      const categorizedSpaces: any = {};
      
      data.forEach(space => {
        if (!categorizedSpaces[space.category]) {
          categorizedSpaces[space.category] = [];
        }
        
        categorizedSpaces[space.category].push({
          name: space.name,
          icon: space.icon,
          count: space.count
        });
      });
      
      const transformedSpaces = Object.keys(categorizedSpaces).map(category => ({
        name: category,
        spaces: categorizedSpaces[category]
      }));
      
      forumSpaces = transformedSpaces;
    } else {
      // If no data, seed the database with our initial data
      await seedForumSpaces();
    }
  } catch (error) {
    console.error('Error in loadForumSpaces:', error);
  }
};

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
    
    return data.map(post => ({
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
      isPinned: post.is_pinned || false,
      created_at: post.created_at,
      updated_at: post.updated_at
    }));
  } catch (error) {
    console.error("Error in loadForumPosts:", error);
    return [];
  }
};

// Function to load forum events from Supabase
export const loadForumEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('forum_events')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error loading forum events:', error);
      return;
    }
    
    if (data && data.length > 0) {
      // Transform data to match our format
      const transformedEvents = data.map(event => ({
        id: event.id,
        date: {
          day: event.date_day,
          month: event.date_month
        },
        title: event.title,
        time: event.time
      }));
      
      forumEvents = transformedEvents;
    } else {
      // If no data, seed the database with our initial data
      await seedForumEvents();
    }
  } catch (error) {
    console.error('Error in loadForumEvents:', error);
  }
};

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
const seedForumSpaces = async () => {
  try {
    const spacesToInsert = [];
    
    for (const category of defaultForumSpaces) {
      for (const space of category.spaces) {
        spacesToInsert.push({
          name: space.name,
          category: category.name,
          icon: space.icon,
          count: space.count
        });
      }
    }
    
    const { error } = await supabase
      .from('forum_spaces')
      .insert(spacesToInsert);
      
    if (error) {
      console.error('Error seeding forum spaces:', error);
    }
  } catch (error) {
    console.error('Error in seedForumSpaces:', error);
  }
};

const seedForumPosts = async () => {
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

const seedForumEvents = async () => {
  try {
    const eventsToInsert = defaultForumEvents.map(event => ({
      title: event.title,
      date_day: event.date.day,
      date_month: event.date.month,
      time: event.time
    }));
    
    const { error } = await supabase
      .from('forum_events')
      .insert(eventsToInsert);
      
    if (error) {
      console.error('Error seeding forum events:', error);
    }
  } catch (error) {
    console.error('Error in seedForumEvents:', error);
  }
};

const seedTrendingPosts = async () => {
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

// Update functions to modify the data in Supabase
export const updateForumSpaces = async (newSpaces: typeof forumSpaces) => {
  try {
    // First, delete all existing spaces - fixed method that avoids using neq('id', 'dummy')
    const { error: deleteError } = await supabase
      .from('forum_spaces')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
      
    if (deleteError) {
      console.error('Error deleting forum spaces:', deleteError);
      return;
    }
    
    // Then insert the new spaces
    const spacesToInsert = [];
    
    for (const category of newSpaces) {
      for (const space of category.spaces) {
        spacesToInsert.push({
          name: space.name,
          category: category.name,
          icon: space.icon,
          count: space.count
        });
      }
    }
    
    const { error: insertError } = await supabase
      .from('forum_spaces')
      .insert(spacesToInsert);
      
    if (insertError) {
      console.error('Error updating forum spaces:', insertError);
      return;
    }
    
    // Update the local variable
    forumSpaces = [...newSpaces];
    
    console.log('Forum spaces updated successfully:', spacesToInsert.length, 'spaces inserted');
    
    // Reload the data
    await loadForumSpaces();
  } catch (error) {
    console.error('Error in updateForumSpaces:', error);
  }
};

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

export const updateForumEvents = async (newEvents: typeof forumEvents) => {
  try {
    // First, delete all existing events - fixed method that avoids using neq('id', 'dummy')
    const { error: deleteError } = await supabase
      .from('forum_events')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
      
    if (deleteError) {
      console.error('Error deleting forum events:', deleteError);
      return;
    }
    
    // Then insert the new events
    const eventsToInsert = newEvents.map(event => ({
      title: event.title,
      date_day: event.date.day,
      date_month: event.date.month,
      time: event.time
    }));
    
    const { error: insertError } = await supabase
      .from('forum_events')
      .insert(eventsToInsert);
      
    if (insertError) {
      console.error('Error updating forum events:', insertError);
      return;
    }
    
    // Update the local variable
    forumEvents = [...newEvents];
    
    console.log('Forum events updated successfully:', eventsToInsert.length, 'events inserted');
    
    // Reload the data
    await loadForumEvents();
  } catch (error) {
    console.error('Error in updateForumEvents:', error);
  }
};

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

// Demo login helper
export const createDemoUser = () => {
  const demoUser = {
    id: 'demo-user-id',
    name: 'Demo User',
    email: 'demo@example.com',
    avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  };
  
  localStorage.setItem('sanghos_user', JSON.stringify(demoUser));
  return demoUser;
};

export const getDemoUser = () => {
  const userString = localStorage.getItem('sanghos_user');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};

// Load all data on module import
export const loadAllData = async () => {
  await Promise.all([
    loadForumSpaces(),
    loadForumPosts(),
    loadForumEvents(),
    loadTrendingPosts()
  ]);
};

// Call this function to initialize data
loadAllData();
