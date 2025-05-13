
import { ForumPost } from "../types";
import { PostDatabaseSchema } from "./types";
import { formatTimeAgo } from "../../../utils/formatters";

// Transform database post to ForumPost
export const transformDatabasePost = (post: PostDatabaseSchema): ForumPost => {
  return {
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
    isPinned: Boolean(post.is_pinned),
    created_at: post.created_at,
    updated_at: post.updated_at
  };
};

// Transform ForumPost to database schema
export const transformForumPostToDatabase = (post: Partial<ForumPost>): Partial<PostDatabaseSchema> => {
  return {
    author_name: post.author?.name,
    author_role: post.author?.role,
    author_avatar: post.author?.avatar,
    author_tag: post.author?.tag,
    posted_in: post.postedIn,
    title: post.title,
    content: post.content,
    likes: post.likes || 0,
    comments: post.comments || 0,
    bookmarked: post.bookmarked || false,
    is_pinned: post.isPinned || false
  };
};
