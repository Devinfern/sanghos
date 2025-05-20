
import { EventCategory } from "@/types/event";
import { ensureValidCategory } from "@/mockEvents";

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
    imageUrl: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop",
    category: "workshop" as EventCategory,
    startDate: new Date("2025-05-22T14:00:00"),
    endDate: new Date("2025-05-22T16:00:00"),
    location: {
      locationType: "venue" as "venue" | "online", // Fix type narrowing here
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
    remaining: 12,
    // Additional fields for retreat format compatibility
    retreatId: "insight-living-recovery"
  }
];

// Export a consolidated array of events that includes partner events
// This will allow the EventsSection on the homepage to access the same events
export const allEvents = [...partnerEvents];

// Helper function to convert events to retreat format for the RetreatCard component
export const eventToRetreatFormat = (event) => {
  return {
    id: event.retreatId || event.id,
    title: event.title,
    description: event.description,
    image: event.imageUrl,
    additionalImages: [],
    location: {
      name: event.location.name,
      address: event.location.address || "",
      city: event.location.city || "",
      state: event.location.state || "",
      description: `${event.location.address}, ${event.location.city}, ${event.location.state} ${event.location.zip}`,
      coordinates: {
        lat: 34.0736, // Default coordinates for Los Angeles
        lng: -118.2936
      }
    },
    instructor: {
      id: `${event.source}-instructor`,
      name: event.organizer.name,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80",
      bio: `${event.organizer.name} is a leading provider of mindfulness and meditation programs.`,
      title: "Partner Organization",
      specialties: [getCategoryLabel(event.category)],
      yearsExperience: 10
    },
    date: event.startDate.toISOString(),
    time: event.startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    duration: "2 hours",
    price: event.price,
    capacity: event.capacity || 20,
    remaining: event.remaining || 10,
    category: [getCategoryLabel(event.category)],
    amenities: [], // Add missing amenities property with default empty array
    featured: true,
    isSanghos: false // Mark as non-Sanghos to appear in partner tab
  };
};
