import { Event } from "@/types/event";

// Function to generate a random number within a range
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Mock event categories
const eventCategories = ["yoga", "meditation", "fitness", "nutrition", "workshop", "retreat", "online"];

// Mock location types
const locationTypes = ["venue", "online"];

// Mock cities
const cities = ["Los Angeles", "New York", "London", "Paris", "Tokyo", "Sydney", "Toronto", "Vancouver"];

// Mock organizer names
const organizerNames = ["Sanghos", "MindfulLife", "Zenith Wellness", "Serene Escapes", "Global Retreats"];

// Function to generate a mock event
const createMockEvent = (index: number): Event => {
  const category = getRandomItem(eventCategories);
  const locationType = getRandomItem(locationTypes);
  const city = getRandomItem(cities);
  const organizerName = getRandomItem(organizerNames);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + getRandomNumber(1, 30)); // Set start date within the next 30 days
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + getRandomNumber(0, 3)); // Set end date within the next 3 days

  return {
    id: `evt-${index + 1}`,
    title: `Mock Event ${index + 1}`,
    shortDescription: `Join us for a ${category} event in ${city}!`,
    description: `This is a mock event for testing purposes. It includes a ${category} session, ${locationType === "venue" ? "at a physical location" : "online"}, and is organized by ${organizerName}.`,
    imageUrl: `https://source.unsplash.com/800x600/?${category}`,
    category: category as any,
    startDate: startDate,
    endDate: endDate,
    location: {
      locationType: locationType as any,
      name: `${city} ${locationType === "venue" ? "Center" : "Online"}`,
      address: locationType === "venue" ? `${getRandomNumber(100, 999)} Main St` : undefined,
      city: city,
      state: "CA",
      zip: locationType === "venue" ? `${getRandomNumber(90000, 99999)}` : undefined,
    },
    bookingUrl: "https://example.com/booking",
    price: getRandomNumber(25, 150),
    source: organizerName,
    organizer: {
      name: organizerName,
      website: "https://example.com",
    },
    capacity: getRandomNumber(10, 50),
    remaining: getRandomNumber(0, 50),
  };
};

// Generate an array of mock events
export const mockEvents: Event[] = Array.from({ length: 5 }, (_, index) => createMockEvent(index));

export const getCategoryLabel = (category: string): string => {
  switch (category) {
    case "yoga":
      return "Yoga";
    case "meditation":
      return "Meditation";
    case "fitness":
      return "Fitness";
    case "nutrition":
      return "Nutrition";
    case "workshop":
      return "Workshop";
    case "retreat":
      return "Retreat";
    case "online":
      return "Online";
    default:
      return "Wellness";
  }
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case "yoga":
      return "bg-amber-50 text-amber-700";
    case "meditation":
      return "bg-blue-50 text-blue-700";
    case "fitness":
      return "bg-red-50 text-red-700";
    case "nutrition":
      return "bg-green-50 text-green-700";
    case "workshop":
      return "bg-purple-50 text-purple-700";
    case "retreat":
      return "bg-pink-50 text-pink-700";
    case "online":
      return "bg-sky-50 text-sky-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

// Add the InsightLA event to the events array
export const events: Event[] = [
  ...mockEvents,
  {
    id: "evt-insightla-recovery-2025",
    title: "Living Recovery in Unsettling Times",
    shortDescription: "Explore practical mindfulness approaches to recovery and healing during challenging times with a supportive community.",
    description: "This workshop offers a compassionate space for those in recovery (from substances, behaviors, or difficult life circumstances) to explore how mindfulness practices can support healing, especially during unsettling times. We'll discuss practical approaches to maintaining balance, cultivating resilience, and finding community support. All experience levels welcome. This is a welcoming, inclusive environment for anyone interested in the intersection of mindfulness and recovery.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800",
    category: "workshop",
    startDate: new Date("2025-05-22T14:00:00"),
    endDate: new Date("2025-05-22T16:00:00"),
    location: {
      locationType: "venue",
      name: "InsightLA",
      address: "4300 Melrose Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90029"
    },
    bookingUrl: "https://insightla.org/event/living-recovery-in-unsettling-times/2025-05-22-14-00/",
    price: 35,
    source: "InsightLA",
    organizer: {
      name: "InsightLA",
      website: "https://insightla.org"
    },
    capacity: 30,
    remaining: 18
  }
];
