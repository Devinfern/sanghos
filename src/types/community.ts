
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

// New types for retreat/event management
export interface RetreatFormData {
  id?: string;
  title: string;
  description: string;
  image: string;
  additionalImages?: string[];
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    description: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  instructorId: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  capacity: number;
  category: string[];
  amenities?: string[];
  featured: boolean;
  isSanghos: boolean;
}
