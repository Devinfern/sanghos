
// Forum data types
export type ForumAuthor = {
  name: string;
  role: string; // Admin, Host, Member
  avatar: string;
  tag?: string;
};

export type ForumPost = {
  id: string; // Using string type consistently
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
  isPinned?: boolean; // For important announcements
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
  id: string; // Using string type consistently
  date: {
    day: number;
    month: string;
  };
  title: string;
  time: string;
  retreatId?: string; // Link to related retreat
};

export type TrendingPost = {
  id: string; // Using string type consistently
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

// Import the data from communityData to keep synchronized
import {
  forumSpaces,
  forumPosts,
  forumEvents,
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

// Export the same data and update functions
export {
  forumSpaces,
  forumPosts,
  forumEvents,
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
