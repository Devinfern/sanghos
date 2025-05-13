
import { ForumPost } from "../types";

// Extended post types specific to this module
export type PostTransformOptions = {
  includeTimeFormatting?: boolean;
};

// Database post schema mapping
export type PostDatabaseSchema = {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  author_tag?: string;
  posted_in: string;
  likes: number;
  comments: number;
  bookmarked: boolean;
  is_pinned?: boolean;
  created_at: string;
  updated_at: string;
};

export type { ForumPost };
