
export interface EventDatabaseSchema {
  id: string | number;
  title: string;
  date_day: number;
  date_month: string;
  time: string;
  retreat_id?: string;
  location?: string;
  description?: string;
  instructor_name?: string;
  price?: number;
  capacity?: number;
  remaining?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ExtractedEventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    name: string;
    address?: string;
    city?: string;
    state?: string;
  };
  price?: number;
  category?: string[];
  instructorName?: string;
  image?: string;
  sourceUrl?: string;
  capacity?: number;
  remaining?: number;
}

export interface ForumEventData {
  id: string | number;
  title: string;
  date: {
    day: number;
    month: string;
  };
  time: string;
  retreat_id?: string;
  location?: string;
  description?: string;
  instructor_name?: string;
  price?: number;
  capacity?: number;
  remaining?: number;
}
