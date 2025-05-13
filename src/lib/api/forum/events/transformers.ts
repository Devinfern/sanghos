
import { ForumEvent } from "../types";
import { EventDatabaseSchema } from "./types";

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
export const transformEventToDatabase = (event: ForumEvent): Partial<EventDatabaseSchema> => {
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
