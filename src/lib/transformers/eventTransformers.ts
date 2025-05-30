
import { Event, EventCategory } from "@/types/event";
import { Retreat } from "@/lib/data";

/**
 * Helper function to convert month abbreviation to number (0-11)
 */
export function getMonthNumberFromAbbr(monthAbbr: string): number {
  const months: Record<string, number> = {
    'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
    'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
  };
  
  return months[monthAbbr.toUpperCase()] || 0;
}

/**
 * Helper function to determine category based on event title and description
 */
export function determineCategory(title: string, description?: string): Event['category'] {
  const text = `${title} ${description || ''}`.toLowerCase();
  
  if (text.includes('yoga') || text.includes('asana')) {
    return 'yoga';
  } else if (text.includes('meditation') || text.includes('mindfulness')) {
    return 'meditation';
  } else if (text.includes('fitness') || text.includes('exercise')) {
    return 'fitness';
  } else if (text.includes('nutrition') || text.includes('food')) {
    return 'nutrition';
  } else if (text.includes('retreat')) {
    return 'retreat';
  } else if (text.includes('online') || text.includes('virtual')) {
    return 'online';
  } else {
    return 'workshop'; // Default category
  }
}

/**
 * Helper function to convert retreat categories to event category
 */
export function determineRetreatCategory(categories: string[]): Event['category'] {
  const categoryMapping: Record<string, Event['category']> = {
    'Yoga': 'yoga',
    'Meditation': 'meditation',
    'Fitness': 'fitness',
    'Nutrition': 'nutrition',
    'Workshop': 'workshop',
    'Retreat': 'retreat',
    'Online': 'online'
  };
  
  // Find the first matching category, or default to retreat for meditation events
  for (const category of categories) {
    if (categoryMapping[category]) {
      return categoryMapping[category];
    }
  }
  
  // Default to retreat for InsightLA meditation events
  return 'retreat';
}

/**
 * Transform a Sanghos retreat to Event format
 */
export function transformSanghosRetreatToEvent(retreat: Retreat): Event {
  return {
    id: retreat.id,
    title: retreat.title,
    shortDescription: retreat.description.substring(0, 120) + (retreat.description.length > 120 ? '...' : ''),
    description: retreat.description,
    imageUrl: retreat.image,
    category: determineRetreatCategory(retreat.category),
    startDate: new Date(retreat.date),
    endDate: new Date(new Date(retreat.date).getTime() + (8 * 60 * 60 * 1000)), // 8 hours for full day retreat
    location: {
      locationType: "venue" as const,
      name: retreat.location.name,
      address: retreat.location.address || "",
      city: retreat.location.city || "",
      state: retreat.location.state || "",
      zip: ""
    },
    bookingUrl: `/retreat/${retreat.id}`,
    price: retreat.price.toString(),
    source: "Sanghos",
    organizer: {
      name: retreat.instructor?.name || "Sanghos",
      website: "/"
    },
    capacity: retreat.capacity,
    remaining: retreat.remaining
  };
}

/**
 * Transform forum event to Event format
 */
export function transformForumEvent(event: any): Event {
  // Create Date objects for start and end dates
  const startDate = new Date();
  
  // Parse the day number and month string (e.g., "MAY")
  if (event.date && event.date.day && event.date.month) {
    const month = getMonthNumberFromAbbr(event.date.month);
    // Set the date to the event day/month in the current year
    startDate.setDate(event.date.day);
    startDate.setMonth(month);
    
    // If time is available, parse it (format like "7:00 PM - 9:00 PM")
    if (event.time && event.time.includes('-')) {
      const [startTime] = event.time.split('-').map(t => t.trim());
      const [hourStr, minuteStr] = startTime.split(':');
      let hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);
      
      // Handle PM times
      if (startTime.toLowerCase().includes('pm') && hour < 12) {
        hour += 12;
      }
      
      startDate.setHours(hour, minute, 0, 0);
    } else {
      // Default to noon if no specific time
      startDate.setHours(12, 0, 0, 0);
    }
  }
  
  // Create end date (default: 2 hours after start time)
  const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000));
  
  // Set location details
  const locationDetails = {
    locationType: event.location && 
      event.location.toLowerCase().includes('online') ? 
      "online" as const : 
      "venue" as const,
    name: event.location || "Venue to be announced",
    address: event.location || "",
    city: event.location?.split(",")[0] || "",
    state: event.location?.split(",")[1]?.trim() || "CA",
    zip: ""
  };
  
  // Determine the event category based on title or description
  const category = determineCategory(event.title, event.description);
  
  return {
    id: event.id.toString(),
    title: event.title,
    shortDescription: event.description || "Join this wellness event",
    description: event.description || "Details for this event will be provided soon.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Default image
    category,
    startDate,
    endDate,
    location: locationDetails,
    bookingUrl: "https://insightla.org", // Default booking URL
    price: event.price ? event.price.toString() : "Free",
    source: "InsightLA",
    organizer: {
      name: event.instructor_name || "Event Organizer",
      website: "https://insightla.org"
    },
    capacity: event.capacity || undefined,
    remaining: event.remaining || undefined
  };
}

/**
 * Transform InsightLA retreat to Event format
 */
export function transformInsightLARetreatToEvent(retreat: any): Event {
  // Parse the date string and time for proper Date object creation
  let startDate = new Date();
  
  if (retreat.date) {
    startDate = new Date(retreat.date);
    
    // Parse time if available (format like "10:00 AM")
    if (retreat.time) {
      const timeMatch = retreat.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
      if (timeMatch) {
        let hour = parseInt(timeMatch[1]);
        const minute = parseInt(timeMatch[2]);
        const ampm = timeMatch[3]?.toUpperCase();
        
        if (ampm === 'PM' && hour < 12) {
          hour += 12;
        } else if (ampm === 'AM' && hour === 12) {
          hour = 0;
        }
        
        startDate.setHours(hour, minute, 0, 0);
      }
    }
  }
  
  const endDate = new Date(startDate.getTime() + (8 * 60 * 60 * 1000)); // 8 hours for full day
  
  return {
    id: retreat.id,
    title: retreat.title,
    shortDescription: retreat.description.substring(0, 120) + (retreat.description.length > 120 ? '...' : ''),
    description: retreat.description,
    imageUrl: retreat.image,
    category: determineRetreatCategory(retreat.category),
    startDate,
    endDate,
    location: {
      locationType: "venue" as const,
      name: retreat.location.name,
      address: retreat.location.address || "",
      city: retreat.location.city || "",
      state: retreat.location.state || "",
      zip: ""
    },
    bookingUrl: retreat.bookingUrl || retreat.sourceUrl,
    price: retreat.price.toString(),
    source: "InsightLA",
    organizer: {
      name: retreat.instructor?.name || "InsightLA",
      website: "https://insightla.org"
    },
    capacity: retreat.capacity,
    remaining: retreat.remaining
  };
}
