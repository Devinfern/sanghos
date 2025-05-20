
export interface ExtractedEventData {
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
  };
  instructor: string;
  price: number;
  capacity: number;
  remaining: number;
  category: string[];
  bookingLink: string;
  source: string;
}
