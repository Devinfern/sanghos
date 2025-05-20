
import { Event, EventCategory } from "@/types/event";

export const defaultEvents: Event[] = [
  {
    id: "ev-1",
    title: "Outdoor Sunrise Yoga",
    shortDescription: "Start your day with a nourishing outdoor yoga session in the park.",
    description: "Experience a refreshing sunrise yoga flow led by a certified instructor, suitable for all levels. Bring your own mat and water bottle. In case of rain, the class will be rescheduled.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "yoga" as EventCategory,
    startDate: new Date("2025-04-18T07:00:00"),
    endDate: new Date("2025-04-18T08:00:00"),
    location: {
      locationType: "venue" as "venue" | "online",
      name: "Lakeside Park",
      address: "123 Lakeview Ave",
      city: "Springfield",
      state: "CA",
      zip: "90102"
    },
    bookingUrl: "https://www.sunriseyoga.com/book",
    price: 18,
    source: "Sunrise Yoga",
    organizer: {
      name: "Sophia Lee",
      website: "https://www.sunriseyoga.com"
    }
  },
  {
    id: "ev-2",
    title: "Guided Mindfulness Meditation",
    shortDescription: "A calming online session to help you cultivate mindfulness.",
    description: "This virtual meditation event is guided live via Zoom and suitable for beginners and regular practitioners alike. Expect gentle instructions and space for Q&A.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "meditation" as EventCategory,
    startDate: new Date("2025-04-19T18:00:00"),
    endDate: new Date("2025-04-19T18:45:00"),
    location: {
      locationType: "online" as "venue" | "online",
      name: "Online"
    },
    bookingUrl: "https://www.mindfulcommunity.com/meditate",
    price: "Free",
    source: "Mindful Community",
    organizer: {
      name: "Mindful Community",
      website: "https://www.mindfulcommunity.com"
    }
  },
  {
    id: "ev-3",
    title: "Nutrition Workshop: Plant-Based Basics",
    shortDescription: "Learn how to nourish yourself with easy plant-based meals.",
    description: "This hands-on workshop introduces the benefits and practicalities of plant-based eating. Enjoy samples, recipes, and expert Q&A. All are welcome!",
    imageUrl: "https://images.unsplash.com/photo-1481931098730-318b6f776db0",
    category: "nutrition" as EventCategory,
    startDate: new Date("2025-04-22T17:30:00"),
    endDate: new Date("2025-04-22T19:15:00"),
    location: {
      locationType: "venue" as "venue" | "online",
      name: "Healthy Eats Kitchen",
      address: "789 Wellness Lane",
      city: "Hillcrest",
      state: "CA",
      zip: "90215"
    },
    bookingUrl: "https://www.healthyeats.com/workshop",
    price: 35,
    source: "Healthy Eats",
    organizer: {
      name: "Chef Rosa Morales",
      website: ""
    }
  }
];
