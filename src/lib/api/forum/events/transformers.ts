
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
  // Parse the date from enhanced format
  let dateObj: Date;
  
  // Try to use the ISO date if available
  if (typeof extractedData.date === 'object' && extractedData.date.iso) {
    dateObj = new Date(extractedData.date.iso);
  } 
  // Fallback to display date if iso date is not available or invalid
  else if (typeof extractedData.date === 'object' && extractedData.date.display) {
    dateObj = new Date(extractedData.date.display);
  }
  // Handle if date is a simple string
  else if (typeof extractedData.date === 'string') {
    dateObj = new Date(extractedData.date);
  }
  // Final fallback to current date
  else {
    dateObj = new Date();
  }
  
  // If date parsing failed, use current date
  if (isNaN(dateObj.getTime())) {
    dateObj = new Date();
  }
  
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
    instructor_name: extractedData.instructor || "",
    price: extractedData.price || 0,
    capacity: extractedData.capacity || 20,
    remaining: extractedData.remaining || extractedData.capacity || 20,
  };
};
