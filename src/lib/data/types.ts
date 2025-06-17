
export type Instructor = {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  yearsExperience: number;
};

export interface Location {
  name: string;
  address: string;
  city: string;
  state: string;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Retreat {
  id: string;
  title: string;
  description: string;
  image: string;
  additionalImages?: string[];
  location: Location;
  instructor: Instructor;
  date: string;
  time: string;
  duration: string;
  price: number;
  capacity: number;
  remaining: number;
  category: string[];
  amenities?: string[];
  featured?: boolean;
  isSanghos?: boolean;
  sourceUrl?: string;
  bookingUrl?: string;
  organizer?: {
    name: string;
    website?: string;
  };
  source?: string;
}
