
// Forum data types
export type ForumAuthor = {
  name: string;
  role: string; // Admin, Host, Member
  avatar: string;
  tag?: string;
};

export type ForumPost = {
  id: string | number; // Update to match communityData.ts
  author: ForumAuthor;
  postedIn: string;
  timeAgo: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  bookmarked: boolean;
  retreatId?: string; // Link to specific retreat
  retreatPhase?: "pre" | "post"; // Pre-retreat or post-retreat discussion
  isPinned?: boolean; // Added property for important announcements
  user_id?: string;
  created_at?: string;
  category?: string;
  user_profiles?: {
    username?: string;
    avatar_url?: string;
    is_wellness_practitioner?: boolean;
  } | null;
};

export type ForumEvent = {
  id: string | number;
  date: {
    day: number;
    month: string;
  };
  title: string;
  time: string;
  retreat_id?: string;
  location?: string;
  description?: string;
  instructor_name?: string;
  price?: number;
  capacity?: number;
  remaining?: number;
};

export type TrendingPost = {
  id: string | number; // Update to match communityData.ts
  title: string;
  author: string;
  avatar: string;
  retreatId?: string; // Link to specific retreat
};

export type ForumSpace = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  count?: number;
  retreatId?: string;
  isPreRetreat?: boolean;
  isPostRetreat?: boolean;
};

// Import the data from communityData and the retreat data
import {
  forumSpaces,
  forumPosts,
  forumEvents as communityEvents,
  trendingPosts,
  updateForumSpaces,
  updateForumPosts,
  updateForumEvents,
  updateTrendingPosts,
  loadForumSpaces,
  loadForumPosts,
  loadForumEvents,
  loadTrendingPosts
} from "./communityData";
import { retreats } from "./data";
import { syncRetreatsToEvents } from "./eventUtils";

// Combine community events with retreat events
const combinedEvents = [...communityEvents, ...syncRetreatsToEvents(retreats)];

// Export the combined data and update functions
export {
  forumSpaces,
  forumPosts,
  combinedEvents as forumEvents,
  trendingPosts,
  updateForumSpaces,
  updateForumPosts,
  updateForumEvents,
  updateTrendingPosts,
  loadForumSpaces,
  loadForumPosts,
  loadForumEvents,
  loadTrendingPosts
};
