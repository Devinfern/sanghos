
// This file ensures proper event category types are used
import { EventCategory } from "@/types/event";

// Helper function to ensure valid category type conversion
export function ensureValidCategory(category: string | EventCategory): EventCategory {
  // Cast to correct type if string value matches valid categories
  if (typeof category === 'string') {
    const validCategories: EventCategory[] = [
      "yoga", "meditation", "fitness", "nutrition", "workshop", "retreat", "online"
    ];
    
    // Check if the string is a valid category
    if (validCategories.includes(category as EventCategory)) {
      return category as EventCategory;
    }
    
    // Default to a common category if not valid
    return "workshop";
  }
  
  return category;
}
