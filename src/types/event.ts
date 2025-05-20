
export type EventCategory =
  | "yoga"
  | "meditation"
  | "fitness"
  | "nutrition"
  | "workshop"
  | "retreat"
  | "online";

export interface EventLocation {
  locationType: "venue" | "online";
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface Organizer {
  name: string;
  website?: string;
}

export interface Event {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  category: EventCategory;
  startDate: Date;
  endDate: Date;
  location: EventLocation;
  bookingUrl: string;
  price: string | number;
  source: string;
  organizer: Organizer;
  capacity?: number;
  remaining?: number;
}
