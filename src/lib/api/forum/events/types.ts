
export interface ExtractedEventData {
  title: string;
  description: string;
  image: string;
  date: {
    display: string;
    iso: string;
  };
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    type: "online" | "venue";
  };
  instructor: string;
  price: number;
  priceDisplay?: string;
  capacity: number;
  remaining: number;
  category: string[];
  bookingLink: string;
  source: string;
}

// Database schema that matches the Supabase forum_events table
export interface EventDatabaseSchema {
  id: string;
  title: string;
  date_day: number;
  date_month: string;
  time: string;
  retreat_id: string | null;
  location: string | null;
  description: string | null;
  instructor_name: string | null;
  price: number | null;
  capacity: number | null;
  remaining: number | null;
  created_at: string;
  updated_at: string;
}

// Frontend-friendly version of event data (used when transforming extracted data)
export interface ForumEventData {
  id: string;
  title: string;
  date: {
    day: number;
    month: string;
  };
  time: string;
  location: string;
  description: string;
  instructor_name: string;
  price: number;
  capacity: number;
  remaining: number;
}
