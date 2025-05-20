
import { EventCategory } from "@/types/event";

export const getCategoryLabel = (category: EventCategory): string => {
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
      return "";
  }
};

export const getCategoryColor = (category: EventCategory): string => {
  // Map to bg-colors/text-colors as Tailwind classes
  switch (category) {
    case "yoga":
      return "bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold";
    case "meditation":
      return "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold";
    case "fitness":
      return "bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-semibold";
    case "nutrition":
      return "bg-lime-100 text-lime-700 px-2 py-1 rounded text-xs font-semibold";
    case "workshop":
      return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold";
    case "retreat":
      return "bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold";
    case "online":
      return "bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs font-semibold";
    default:
      return "bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold";
  }
};

// Partner events
export const partnerEvents = [
  {
    id: "insight-living-recovery",
    title: "Living Recovery in Unsettling Times",
    shortDescription: "A 6-week educational course that provides support for those on recovery paths during these unsettling times",
    description: "A 6-week educational course that provides support for those on recovery paths during these unsettling times. Many of us in recovery are finding ourselves experiencing heightened anxiety, irritability, and other difficult emotions, with an increased urge to use or engage in behaviors we have found harm us. In this class, we'll work with ways our mindfulness practice supports recovery and wellbeing. All are welcome. No prior experience with mindfulness or meditation necessary.",
    imageUrl: "https://insightla.org/img/meditation-course.jpg",
    category: "workshop",
    startDate: new Date("2025-05-22T14:00:00"),
    endDate: new Date("2025-05-22T16:00:00"),
    location: {
      locationType: "venue",
      name: "InsightLA East Hollywood",
      address: "4300 Melrose Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90029"
    },
    bookingUrl: "https://insightla.org/event/living-recovery-in-unsettling-times/2025-05-22-14-00/",
    price: 180,
    source: "insightla",
    organizer: {
      name: "InsightLA",
      website: "https://insightla.org"
    },
    capacity: 25,
    remaining: 12
  }
];
