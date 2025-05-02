
// Community data types
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
  isPinned?: boolean; // Added property for important announcements
  user_id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ForumEvent = {
  id: number | string;
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
  id: number | string;
  title: string;
  author: string;
  avatar: string;
};

export type ForumSpace = {
  name: string;
  icon: string;
  count?: number;
};

export type ForumCategory = {
  name: string;
  spaces: ForumSpace[];
};
