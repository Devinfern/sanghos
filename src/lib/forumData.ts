// Forum data types
export type ForumAuthor = {
  name: string;
  role: string; // Admin, Host, Member
  avatar: string;
  tag?: string;
};

export type ForumPost = {
  id: number;
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
  id: number;
  date: {
    day: number;
    month: string;
  };
  title: string;
  time: string;
};

export type TrendingPost = {
  id: number;
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
  updateTrendingPosts
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
  updateTrendingPosts
};
