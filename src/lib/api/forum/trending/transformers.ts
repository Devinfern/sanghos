
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
export const transformTrendingPostToDatabase = (post: TrendingPost): Partial<TrendingPostDatabaseSchema> => {
  return {
    title: post.title,
    author: post.author,
    avatar: post.avatar
  };
};
