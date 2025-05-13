
import { TrendingPost } from "../types";
import { TrendingPostDatabaseSchema } from "./types";

// Transform database trending post to TrendingPost
export const transformDatabaseTrendingPost = (post: TrendingPostDatabaseSchema): TrendingPost => {
  return {
    id: post.id,
    title: post.title,
    author: post.author,
    avatar: post.avatar
  };
};

// Transform TrendingPost to database schema
export const transformTrendingPostToDatabase = (post: TrendingPost): Omit<TrendingPostDatabaseSchema, 'id' | 'created_at' | 'updated_at'> => {
  return {
    title: post.title,
    author: post.author,
    avatar: post.avatar
  };
};
