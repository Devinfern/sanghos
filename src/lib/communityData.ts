// Community data types
import { supabase } from "@/integrations/supabase/client";

export type ForumAuthor = {
  name: string;
  role: string; // Admin, Host, Member
  avatar: string;
  tag?: string;
};

export type ForumPost = {
  id: number | string;
  author: ForumAuthor;
  postedIn: string;
  timeAgo: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  bookmarked: boolean;
  isPinned?: boolean; // Added property for important announcements
};

export type ForumEvent = {
  id: number | string;
  date: {
    day: number;
    month: string;
  };
  title: string;
  time: string;
};

export type TrendingPost = {
  id: number | string;
  title: string;
  author: string;
  avatar: string;
};

// Default community data (used until data is loaded from Supabase)
export let forumSpaces = [
  {
    name: "Open Space",
    spaces: [
      { name: "Open Here", icon: "MessageSquare", count: 4 },
      { name: "Open Conversation", icon: "MessageSquare", count: 2 },
      { name: "Open Events", icon: "Calendar", count: 2 },
    ]
  },
  {
    name: "Loving Yourself Forward",
    spaces: [
      { name: "LYF Course", icon: "MessageSquare", count: 3 },
      { name: "LYF Community", icon: "Users", count: 5 },
    ]
  },
  {
    name: "Practice Groups",
    spaces: [
      { name: "Meditation Circle", icon: "Users", count: 8 },
      { name: "Mindfulness Practice", icon: "Users", count: 4 },
    ]
  },
  {
    name: "Links",
    spaces: [
      { name: "Knowledge Base", icon: "MessageSquare", count: null },
      { name: "Resources", icon: "MessageSquare", count: null },
    ]
  }
];

// Posts data
export let forumPosts: ForumPost[] = [
  {
    id: 1,
    author: {
      name: "Sarita Walsh",
      role: "Admin",
      avatar: "/lovable-uploads/91da0c1f-b9f1-4310-aea3-1afbfe1358f7.png",
      tag: "Being° Coach"
    },
    postedIn: "Open Conversation",
    timeAgo: "4h",
    title: "Tired of Feeling Disappointed?",
    content: `Join us for a LIVE session where we'll explore a simple but powerful distinction: Agreements vs. Expectations. This one shift can change how you navigate relationships, communicate your needs, and move through life with more clarity and ease.

This is part of our ongoing series on practical wisdom for everyday challenges.`,
    likes: 12,
    comments: 3,
    bookmarked: false
  },
  {
    id: 2,
    author: {
      name: "Maya Johnson",
      role: "Host",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tag: "Retreat Host"
    },
    postedIn: "Meditation Circle",
    timeAgo: "1d",
    title: "Mindfulness Practice for Beginners",
    content: `I'm excited to share some simple mindfulness techniques that anyone can practice, regardless of experience level. These have been incredibly helpful for my retreat participants.

Would you like me to host a free online session to walk through these techniques together?`,
    likes: 15,
    comments: 7,
    bookmarked: true
  },
  {
    id: 3,
    author: {
      name: "David Chen",
      role: "Member",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    postedIn: "LYF Community",
    timeAgo: "2d",
    title: "My LYF Journey - Month 3 Reflections",
    content: `I wanted to share some reflections after completing my third month in the Loving Yourself Forward program. The changes I've experienced have been profound, especially around my relationship with self-criticism.

Before LYF, I was constantly in a state of self-judgment. Now I'm finding moments of genuine self-compassion. Has anyone else noticed similar shifts?`,
    likes: 24,
    comments: 12,
    bookmarked: false
  },
  {
    id: 4,
    author: {
      name: "Aisha Williams",
      role: "Host",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tag: "Wellness Guide"
    },
    postedIn: "Mindfulness Practice",
    timeAgo: "3d",
    title: "Creating a Consistent Practice",
    content: `Many of you have asked how to maintain consistency with mindfulness practice when life gets busy. Here are a few practical tips that have worked for my students:

1. Start with just 5 minutes daily
2. Connect it to an existing habit (like morning coffee)
3. Use environmental cues (place a cushion somewhere visible)
4. Join a practice group for accountability

What helps you stay consistent with your practice?`,
    likes: 18,
    comments: 9,
    bookmarked: false
  }
];

// Events data
export let forumEvents: ForumEvent[] = [
  {
    id: 1,
    date: { day: 11, month: "MAR" },
    title: "Support Our Event Test + Discover a Powerful Distinction",
    time: "9:00 - 10:00 AM PDT"
  },
  {
    id: 2,
    date: { day: 14, month: "MAR" },
    title: "Masterclass: How to Break the Cycle of Doubt & Overthinking",
    time: "9:00 - 10:30 AM PDT"
  },
  {
    id: 3,
    date: { day: 16, month: "MAR" },
    title: "Workshop: Update Your Operating System → Break Patterns of Doubt",
    time: "9:00 - 10:30 AM PDT"
  },
  {
    id: 4,
    date: { day: 22, month: "APR" },
    title: "Quarterly Being° Gathering (Q2)",
    time: "9:00 - 10:30 AM PDT"
  },
  {
    id: 5,
    date: { day: 22, month: "JUL" },
    title: "Quarterly Being° Gathering (Q3)",
    time: "9:00 - 10:30 AM PDT"
  }
];

// Trending posts data
export let trendingPosts: TrendingPost[] = [
  {
    id: 1,
    title: "An Invitation to Slow Down and Return to Yourself",
    author: "Sarita Walsh",
    avatar: "/lovable-uploads/91da0c1f-b9f1-4310-aea3-1afbfe1358f7.png"
  },
  {
    id: 2,
    title: "How to Practice Self-Compassion in Difficult Moments",
    author: "Maya Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Finding Peace in Uncertainty",
    author: "David Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

// Format timeAgo from timestamp
const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? "1y" : interval + "y";
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1mo" : interval + "mo";
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1d" : interval + "d";
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1h" : interval + "h";
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1m" : interval + "m";
  }
  
  return Math.floor(seconds) + "s";
};

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
      author_name: post.author_name,
      author_role: post.author_role,
      author_avatar: post.author_avatar,
      author_tag: post.author_tag,
      author_id: post.author_id,
      posted_in: post.posted_in,
      timeAgo: formatTimeAgo(post.created_at),
      likes: post.likes || 0,
      comments: post.comments || 0,
      bookmarked: post.bookmarked || false,
      isPinned: post.is_pinned || false,  // Make sure we map is_pinned from database to isPinned in our model
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
    
    for (const category of forumSpaces) {
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
    const postsToInsert = forumPosts.map(post => ({
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
      is_pinned: post.isPinned // Ensure we map isPinned to is_pinned when seeding the database
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
    const eventsToInsert = forumEvents.map(event => ({
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
    const postsToInsert = trendingPosts.map(post => ({
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
      is_pinned: post.isPinned // Added property for important announcements
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
const loadAllData = async () => {
  await Promise.all([
    loadForumSpaces(),
    loadForumPosts(),
    loadForumEvents(),
    loadTrendingPosts()
  ]);
};

// Call this function to initialize data
loadAllData();
