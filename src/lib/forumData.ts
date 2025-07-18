
// Forum data types
import { 
  ForumAuthor as AuthorType, 
  ForumPost as BaseForumPost, 
  ForumEvent as BaseForumEvent, 
  TrendingPost as BaseTrendingPost, 
  ForumSpace as ForumSpaceType 
} from "./types/community";

// Define more detailed types for the forum
export type ForumPost = BaseForumPost & {
  retreatId?: string; // Link to specific retreat
  retreatPhase?: "pre" | "post"; // Pre-retreat or post-retreat discussion
  category?: string;
  user_profiles?: {
    username?: string;
    avatar_url?: string;
    is_wellness_practitioner?: boolean;
  } | null;
};

export type ForumEvent = BaseForumEvent;

export type TrendingPost = BaseTrendingPost & {
  retreatId?: string; // Link to specific retreat
};

export type ForumSpace = ForumSpaceType & {
  id: string;
  description: string;
  category: string;
  retreatId?: string;
  isPreRetreat?: boolean;
  isPostRetreat?: boolean;
};

// Import the data from API modules
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
} from "./api/forum";
import { retreats } from "./data";
import { syncRetreatsToEvents } from "./eventUtils";

// Combine community events with retreat events
const combinedEvents = [...communityEvents, ...syncRetreatsToEvents(retreats)];

// Export the combined data and update functions
export {
  type AuthorType as ForumAuthor,
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
