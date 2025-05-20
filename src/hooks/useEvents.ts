
import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { supabase } from "@/integrations/supabase/client";
import { defaultEvents } from "@/data/mockFeaturedEvents";
import { partnerEvents } from "@/data/mockEvents";

export function useEvents(location: string = "San Francisco, CA") {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching events for location: ${location}`);
        
        const { data, error } = await supabase.functions.invoke("fetch-local-events", {
          body: {
            location,
            interests: ["yoga", "meditation", "wellness", "mindfulness"],
            startDatetime: new Date().toISOString(),
          },
        });
        
        if (error) {
          console.error("Error fetching events:", error);
          setError(`Failed to fetch events: ${error.message}`);
          
          // Combine default events with partner events
          const combinedFallbackEvents = [...defaultEvents, ...partnerEvents];
          setEvents(combinedFallbackEvents);
          
          // Don't show error toast - just load fallback data silently
          console.log("Using fallback events data due to API error");
        } else if (data?.recommendations && data.recommendations.length > 0) {
          console.log(`Successfully fetched ${data.recommendations.length} events`);
          
          const transformedEvents: Event[] = data.recommendations.map((rec: any, index: number) => {
            // Parse dates properly
            let startDate = new Date();
            let endDate = new Date();
            endDate.setHours(endDate.getHours() + 2);
            
            if (rec.date && rec.time) {
              try {
                const dateTimeStr = `${rec.date} ${rec.time}`;
                const parsedDate = new Date(dateTimeStr);
                
                if (!isNaN(parsedDate.getTime())) {
                  startDate = new Date(parsedDate.getTime());
                  endDate = new Date(parsedDate.getTime() + (2 * 60 * 60 * 1000));
                }
              } catch (e) {
                console.warn("Error parsing event date/time:", e);
              }
            }
            
            return {
              id: rec.retreatId || `ev-api-${index}`,
              title: rec.title,
              shortDescription: rec.reason || "A wellness event near you",
              description: rec.description || "Join this event to improve your wellness journey.",
              imageUrl: rec.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
              category: Array.isArray(rec.category) ? rec.category[0] : "wellness",
              startDate,
              endDate,
              location: {
                locationType: rec.url ? "online" : "venue",
                name: rec.location || "Venue to be announced",
                address: rec.location || "",
                city: rec.location?.split(",")?.[0] || "",
                state: rec.location?.split(",")?.[1]?.trim() || "CA",
                zip: ""
              },
              bookingUrl: rec.url || "https://www.example.com",
              price: rec.price || "Free",
              source: rec.source || "Eventbrite",
              organizer: {
                name: rec.organizer || "Event Organizer",
                website: rec.url
              },
              // Add retreatId for linking to retreat details
              retreatId: rec.retreatId || `ev-api-${index}`
            };
          });
          
          // Combine API events with partner events
          const combinedEvents = [...transformedEvents, ...partnerEvents];
          
          // Only log success, don't show toast
          if (combinedEvents.length > 0) {
            console.log(`Found ${combinedEvents.length} wellness events`);
          }
          
          setEvents(combinedEvents);
        } else {
          console.log("No events returned, using default events");
          
          // Combine default events with partner events
          const combinedFallbackEvents = [...defaultEvents, ...partnerEvents];
          setEvents(combinedFallbackEvents);
          
          // Don't show error toast - just load fallback data silently
          console.log("Using fallback events data due to no results");
        }
      } catch (err: any) {
        console.error("Error in fetchEvents:", err);
        setError(`Unexpected error: ${err.message}`);
        
        // Combine default events with partner events
        const combinedFallbackEvents = [...defaultEvents, ...partnerEvents];
        setEvents(combinedFallbackEvents);
        
        // Don't show error toast - just load fallback data silently
        console.log("Using fallback events data due to exception");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, [location]);

  return { events, isLoading, error };
}
