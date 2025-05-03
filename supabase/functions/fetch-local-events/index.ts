
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const EVENTBRITE_API_KEY = Deno.env.get("EVENTBRITE_API_KEY");
    
    if (!EVENTBRITE_API_KEY) {
      // Instead of throwing an error, return an empty array with a message
      return new Response(JSON.stringify({ 
        recommendations: [],
        message: "API key not configured" 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { location, interests, startDatetime, endDatetime } = await req.json();
    
    if (!location) {
      return new Response(JSON.stringify({ 
        recommendations: [],
        message: "Location is required" 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Request received:", { location, interests, startDatetime });

    const baseUrl = "https://www.eventbriteapi.com/v3/events/search/";
    
    const params = new URLSearchParams({
      "location.address": location,
      "location.within": "20km",
      "start_date.range_start": startDatetime || new Date().toISOString(),
      "categories": "107", // Health & Wellness category
      "expand": "venue,ticket_availability"
    });

    if (endDatetime) {
      params.append("start_date.range_end", endDatetime);
    }

    if (interests && interests.length > 0) {
      params.append("q", interests.join(" OR "));
    }
    
    const url = `${baseUrl}?${params.toString()}`;
    
    console.log("Fetching events from URL:", url);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from Eventbrite:", errorText);
        
        // Instead of throwing error, return empty array with a message
        return new Response(JSON.stringify({ 
          recommendations: [],
          message: "Could not fetch events from Eventbrite" 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const eventData = await response.json();
      console.log(`Found ${eventData.events?.length || 0} events`);
      
      if (!eventData.events || eventData.events.length === 0) {
        console.log("No events found, returning empty array");
        return new Response(JSON.stringify({ 
          recommendations: [] 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      const formattedEvents = eventData.events.map(event => {
        const venueInfo = event.venue || {};
        const startInfo = event.start || {};
        const endInfo = event.end || {};
        const ticketInfo = event.ticket_availability || {};
        
        return {
          retreatId: `event-${event.id}`,
          title: event.name?.text || "Unnamed Event",
          reason: "This event matches your wellness interests",
          location: venueInfo.address?.localized_address_display || 
                   venueInfo.name || 
                   "Location TBD",
          date: new Date(startInfo.local || startInfo.utc).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }),
          time: new Date(startInfo.local || startInfo.utc).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          description: event.description?.text || "",
          url: event.url,
          image: event.logo?.url || 
                 event.logo?.original?.url || 
                 "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
          category: ["Wellness"],
          remaining: ticketInfo.available || null,
          capacity: ticketInfo.capacity || null,
        };
      });

      formattedEvents.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });

      console.log(`Returning ${formattedEvents.length} formatted events`);
      
      return new Response(JSON.stringify({ 
        recommendations: formattedEvents
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (fetchError) {
      console.error("Error fetching events:", fetchError);
      return new Response(JSON.stringify({ 
        recommendations: [],
        message: "Error connecting to event service" 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error("Error in fetch-local-events function:", error);
    return new Response(JSON.stringify({ 
      recommendations: [],
      message: error.message || "Failed to fetch local events" 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200, // Changed from 400 to 200 to avoid triggering error handling
    });
  }
});
