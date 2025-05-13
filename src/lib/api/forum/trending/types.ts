
import { TrendingPost } from "../types";

// Database trending post schema mapping
export type TrendingPostDatabaseSchema = {
  id: string;
  title: string;
  author: string;
  avatar: string;
  created_at: string;
  updated_at: string;
};

export type { TrendingPost };
