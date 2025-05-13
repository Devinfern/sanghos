
import { ForumEvent } from "../types";

// Database event schema mapping
export type EventDatabaseSchema = {
  id: string;
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
  created_at: string;
  updated_at: string;
};

export type { ForumEvent };
