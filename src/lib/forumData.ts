
// Forum data types
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
