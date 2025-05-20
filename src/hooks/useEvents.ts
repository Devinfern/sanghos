
import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { supabase } from "@/integrations/supabase/client";
import { loadForumEvents } from "@/lib/api/forum/events";
import { startOfDay } from "date-fns";
import { partnerEvents } from "@/data/mockEvents"; 
import { ensureValidCategory } from "@/mockEvents";

export function useEvents(location: string = "San Francisco, CA") {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching real events for location: ${location}`);
        
        // Load events from the forum_events table through our API wrapper
        const forumEvents = await loadForumEvents();
        let allEvents: Event[] = [];
        
        if (forumEvents && forumEvents.length > 0) {
          // Transform forum events to match the Event type
          const transformedEvents: Event[] = forumEvents.map(event => {
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
          });
          
          console.log(`Successfully transformed ${transformedEvents.length} events`);
          allEvents = transformedEvents;
        } else {
          console.log("No forum events found");
        }
        
        // Add partner events from the same source used on retreats page
        if (partnerEvents && partnerEvents.length > 0) {
          // Type-safe conversion for partner events
          const typeSafePartnerEvents = partnerEvents.map(event => ({
            ...event,
            category: ensureValidCategory(event.category),
            location: {
              ...event.location,
              locationType: (event.location.locationType === "venue" ? "venue" : "online") as "venue" | "online"
            }
          }));
          
          // Combine with forum events
          allEvents = [...allEvents, ...typeSafePartnerEvents];
          console.log(`Added ${typeSafePartnerEvents.length} partner events`);
        }
        
        // Set combined events
        setEvents(allEvents);
        
      } catch (err: any) {
        console.error("Error fetching real events:", err);
        setError(`Failed to fetch events: ${err.message}`);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, [location]);

  return { events, isLoading, error };
}

// Helper function to convert month abbreviation to number (0-11)
function getMonthNumberFromAbbr(monthAbbr: string): number {
  const months = {
    'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
    'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
  };
  
  return months[monthAbbr.toUpperCase() as keyof typeof months] || 0;
}

// Helper function to determine category based on event title and description
function determineCategory(title: string, description?: string): Event['category'] {
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
