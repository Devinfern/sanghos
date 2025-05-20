
import { ForumEvent } from "../types";
import { EventDatabaseSchema, ExtractedEventData, ForumEventData } from "./types";

// Transform database event to ForumEvent
export const transformDatabaseEvent = (event: EventDatabaseSchema): ForumEvent => {
  return {
    id: event.id,
    date: {
      day: event.date_day,
      month: event.date_month
    },
    title: event.title,
    time: event.time,
    retreat_id: event.retreat_id,
    location: event.location,
    description: event.description,
    instructor_name: event.instructor_name,
    price: event.price,
    capacity: event.capacity,
    remaining: event.remaining
  };
};

// Transform ForumEvent to database schema
export const transformEventToDatabase = (event: ForumEvent): Omit<EventDatabaseSchema, 'id' | 'created_at' | 'updated_at'> => {
  return {
    title: event.title,
    date_day: event.date.day,
    date_month: event.date.month,
    time: event.time,
    retreat_id: event.retreat_id,
    location: event.location,
    description: event.description,
    instructor_name: event.instructor_name,
    price: event.price,
    capacity: event.capacity,
    remaining: event.remaining
  };
};

// Transform extracted event data to ForumEvent
export const transformExtractedToForumEvent = (extractedData: ExtractedEventData): ForumEventData => {
  // Parse the date from string format (e.g., 2025-05-20) to day and month
  const dateObj = extractedData.date ? new Date(extractedData.date) : new Date();
  
  return {
    id: Date.now().toString(), // Temporary ID until saved to database
    title: extractedData.title || "New Event",
    date: {
      day: dateObj.getDate(),
      month: dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    },
    time: extractedData.time || "12:00 PM",
    location: extractedData.location?.name || "",
    description: extractedData.description || "",
    instructor_name: extractedData.instructor || "", // Fixed: Changed from instructorName to instructor
    price: extractedData.price || 0,
    capacity: extractedData.capacity || 20,
    remaining: extractedData.remaining || extractedData.capacity || 20,
  };
};
