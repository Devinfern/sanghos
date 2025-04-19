
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const EVENTBRITE_API_KEY = Deno.env.get('EVENTBRITE_API_KEY');
    
    if (!EVENTBRITE_API_KEY) {
      throw new Error("Eventbrite API key is not configured");
    }

    const { location, interests, startDatetime, endDatetime } = await req.json();
    
    if (!location) {
      throw new Error("Location is required");
    }

    // Build the Eventbrite API URL with query parameters
    const baseUrl = "https://www.eventbriteapi.com/v3/events/search/";
    
    // Parameters for the Eventbrite API
    const params = new URLSearchParams({
      "location.address": location,
      "location.within": "20km", // Search within 20km
      "categories": "107", // Health & Wellness category in Eventbrite
      "start_date.range_start": startDatetime || new Date().toISOString(),
      "expand": "venue"
    });

    if (endDatetime) {
      params.append("start_date.range_end", endDatetime);
    }

    // Add keyword filtering based on interests
    if (interests && interests.length > 0) {
      params.append("q", interests.join(" OR "));
    }
    
    const url = `${baseUrl}?${params.toString()}`;
    
    console.log("Fetching events from URL:", url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Eventbrite API error: ${response.status} ${errorText}`);
    }

    const eventData = await response.json();
    
    // Transform Eventbrite events to match our application's format
    const formattedEvents = eventData.events.map(event => {
      const venueInfo = event.venue || {};
      const startInfo = event.start || {};
      const endInfo = event.end || {};
      
      // Parse dates
      const startDate = new Date(startInfo.local || startInfo.utc);
      
      return {
        retreatId: `event-${event.id}`,
        title: event.name?.text || "Unnamed Event",
        matchScore: 0.75, // Default match score - will be refined based on interests
        reason: "This event matches your wellness interests",
        location: venueInfo.address?.localized_address_display || venueInfo.name || "Location TBD",
        date: startDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        }),
        time: startDate.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        description: event.description?.text || "",
        url: event.url,
        image: event.logo?.url,
        category: event.category_id ? [event.category_id] : ["Wellness"],
        // Add any other fields needed for your application
      };
    });

    // Sort by start time (soonest first)
    formattedEvents.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    return new Response(JSON.stringify({ 
      recommendations: formattedEvents
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in fetch-local-events function:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message || "Failed to fetch local events" 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
