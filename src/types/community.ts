
// Common types for community components
export interface UserProfile {
  username: string;
  avatar_url: string;
  is_wellness_practitioner: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes: number;
  category: string;
  user_profiles?: UserProfile | null;
}

// Raw post data from Supabase
export type RawPost = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  likes: number;
  category: string;
  retreat_id: string;
  retreat_phase: string;
  is_pinned?: boolean;
  updated_at: string;
};

export type RetreatPhase = "pre" | "post";
