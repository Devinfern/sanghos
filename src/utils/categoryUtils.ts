
import { EventCategory } from "@/types/event";

// Utility functions to replace the ones from mockEvents
export const getCategoryLabel = (category: EventCategory): string => {
  const labels: Record<EventCategory, string> = {
    yoga: "Yoga",
    meditation: "Meditation",
    fitness: "Fitness",
    nutrition: "Nutrition",
    workshop: "Workshop",
    retreat: "Retreat",
    online: "Online"
  };
  
  return labels[category] || "Event";
};

export const getCategoryColor = (category: EventCategory): string => {
  const colors: Record<EventCategory, string> = {
    yoga: "bg-purple-100 text-purple-800",
    meditation: "bg-blue-100 text-blue-800",
    fitness: "bg-green-100 text-green-800",
    nutrition: "bg-yellow-100 text-yellow-800",
    workshop: "bg-orange-100 text-orange-800",
    retreat: "bg-sage-100 text-sage-800",
    online: "bg-gray-100 text-gray-800"
  };
  
  return colors[category] || "bg-sage-100 text-sage-800";
};

// For compatibility with the EventCard component
export const ensureValidCategory = (category: string | string[]): string[] => {
  if (Array.isArray(category)) {
    return category;
  }
  return [category || "workshop"];
};
