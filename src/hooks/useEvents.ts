
import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { supabase } from "@/integrations/supabase/client";
import { loadForumEvents } from "@/lib/api/forum/events";
import { startOfDay } from "date-fns";
import { retreats } from "@/lib/data";
import { fetchInsightLAEvents } from "@/lib/insightEvents";

export function useEvents(location: string = "San Francisco, CA") {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Add a mount tracking ref to help with debugging
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Track that the component has mounted
    setMounted(true);
    console.log('useEvents: useEffect triggered - Initial mount');
    
    const fetchEvents = async () => {
      // Set loading state at the beginning
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`useEvents: Fetching events for location: ${location}`);
        
        // Fetch all data sources concurrently for better performance
        console.log('useEvents: Starting concurrent data fetching');
        
        // Use Promise.allSettled to prevent one failure from blocking others
        const results = await Promise.allSettled([
          loadForumEvents(),
          fetchInsightLAEvents()
        ]);
        
        console.log('useEvents: All data sources fetched, processing results');
        
        // Get featured retreats directly from the imported data
        console.log('useEvents: Processing featured retreats from imported data');
        const featuredRetreats = retreats.filter(r => r.featured);
        console.log(`useEvents: Found ${featuredRetreats.length} featured retreats`);
        
        // Process results from Promise.allSettled
        let forumEvents = [];
        let insightLARetreats = [];
        
        // Extract forum events (first promise result)
        if (results[0].status === 'fulfilled') {
          forumEvents = results[0].value || [];
          console.log(`useEvents: Received ${forumEvents?.length || 0} forum events`);
        } else {
          console.error('useEvents: Failed to fetch forum events:', results[0].reason);
        }
        
        // Extract InsightLA events (second promise result)
        if (results[1].status === 'fulfilled') {
          insightLARetreats = results[1].value || [];
          console.log(`useEvents: Received ${insightLARetreats?.length || 0} InsightLA events`);
        } else {
          console.error('useEvents: Failed to fetch InsightLA events:', results[1].reason);
        }
        
        // 1. Process featured retreats - these are the same ones shown on the Retreats page
        const transformedRetreats = featuredRetreats.map(retreat => {
          // Convert retreat to event format
          return {
            id: retreat.id,
            title: retreat.title,
            shortDescription: retreat.description.substring(0, 120) + (retreat.description.length > 120 ? '...' : ''),
            description: retreat.description,
            imageUrl: retreat.image,
            category: determineRetreatCategory(retreat.category),
            startDate: new Date(retreat.date),
            endDate: new Date(new Date(retreat.date).getTime() + (2 * 60 * 60 * 1000)), // 2 hours after start
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
          } as Event;
        });
        
        console.log(`useEvents: Transformed ${transformedRetreats.length} featured retreats`);
        
        // 2. Process forum events
        let transformedForumEvents: Event[] = [];
        
        if (forumEvents && forumEvents.length > 0) {
          // Transform forum events to match the Event type
          transformedForumEvents = forumEvents.map(event => {
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
          
          console.log(`useEvents: Transformed ${transformedForumEvents.length} forum events`);
        }
        
        // 3. Process InsightLA events
        let transformedInsightLAEvents: Event[] = [];
        
        if (insightLARetreats && insightLARetreats.length > 0) {
          console.log('useEvents: Processing InsightLA events data', insightLARetreats);
          
          // Transform InsightLA events to match the Event type
          transformedInsightLAEvents = insightLARetreats.map(retreat => {
            return {
              id: retreat.id,
              title: retreat.title,
              shortDescription: retreat.shortDescription || retreat.description.substring(0, 120),
              description: retreat.description,
              imageUrl: retreat.image,
              category: determineRetreatCategory(retreat.category),
              startDate: retreat.startDate || new Date(retreat.date),
              endDate: retreat.endDate || new Date(new Date(retreat.date).getTime() + (2 * 60 * 60 * 1000)),
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
            } as Event;
          });
          
          console.log(`useEvents: Transformed ${transformedInsightLAEvents.length} InsightLA events`);
        } else {
          console.warn('useEvents: No InsightLA events were loaded');
        }
        
        // Combine all events
        const allEvents = [...transformedRetreats, ...transformedForumEvents, ...transformedInsightLAEvents];
        console.log(`useEvents: Total events loaded: ${allEvents.length}`);
        
        if (allEvents.length === 0) {
          console.warn('useEvents: No events were loaded from any source');
        }
        
        setEvents(allEvents);
      } catch (err: any) {
        console.error("useEvents: Error fetching events:", err);
        setError(`Failed to fetch events: ${err.message}`);
        setEvents([]);
      } finally {
        // Always set loading to false when done, regardless of success or failure
        setIsLoading(false);
        console.log('useEvents: Fetching complete, isLoading set to false');
      }
    };
    
    fetchEvents();
    
    // Cleanup function
    return () => {
      console.log('useEvents: Component unmounting');
    };
  }, [location]); // Only re-run if location changes

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

// Helper function to convert retreat categories to event category
function determineRetreatCategory(categories: string[]): Event['category'] {
  const categoryMapping: Record<string, Event['category']> = {
    'Yoga': 'yoga',
    'Meditation': 'meditation',
    'Fitness': 'fitness',
    'Nutrition': 'nutrition',
    'Workshop': 'workshop',
    'Retreat': 'retreat',
    'Online': 'online'
  };
  
  // Find the first matching category, or default to workshop
  for (const category of categories) {
    if (categoryMapping[category]) {
      return categoryMapping[category];
    }
  }
  
  return 'workshop';
}
