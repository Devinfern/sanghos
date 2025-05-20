
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
