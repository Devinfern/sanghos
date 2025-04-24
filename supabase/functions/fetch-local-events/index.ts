
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
    // Use the API key provided by the user
    const EVENTBRITE_API_KEY = Deno.env.get("EVENTBRITE_API_KEY") || "MOMPRUBS6TSGJEACONBE";
    
    if (!EVENTBRITE_API_KEY) {
      console.error("Eventbrite API key is missing");
      throw new Error("Eventbrite API key is not configured");
    }

    console.log("API Key available:", EVENTBRITE_API_KEY ? "Yes (masked for security)" : "No");

    const { location, interests, startDatetime, endDatetime } = await req.json();
    
    if (!location) {
      throw new Error("Location is required");
    }

    console.log("Request received:", { location, interests, startDatetime, endDatetime });

    // Build the Eventbrite API URL with query parameters
    const baseUrl = "https://www.eventbriteapi.com/v3/events/search/";
    
    // Parameters for the Eventbrite API
    const params = new URLSearchParams({
      "location.address": location,
      "location.within": "20km", // Search within 20km
      "start_date.range_start": startDatetime || new Date().toISOString(),
    });

    if (endDatetime) {
      params.append("start_date.range_end", endDatetime);
    }

    // Add keyword filtering based on interests
    if (interests && interests.length > 0) {
      // First try category filtering using wellness-related categories
      // Health & Wellness category ID in Eventbrite is 107
      params.append("categories", "107");
      
      // Additionally use keywords for more targeted results
      params.append("q", interests.join(" OR "));
    } else {
      // Default to wellness category if no specific interests
      params.append("categories", "107");
    }
    
    // Add expand parameter to get venue info
    params.append("expand", "venue,category");
    
    const url = `${baseUrl}?${params.toString()}`;
    
    console.log("Fetching events from URL:", url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const responseStatus = response.status;
    const responseStatusText = response.statusText;
    
    console.log("Eventbrite API response status:", responseStatus, responseStatusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from Eventbrite:", errorText);
      throw new Error(`Eventbrite API error: ${response.status} ${errorText}`);
    }

    const eventData = await response.json();
    console.log(`Found ${eventData.events?.length || 0} events`);
    
    // If no events found, return empty array
    if (!eventData.events || eventData.events.length === 0) {
      console.log("No events found, returning empty array");
      return new Response(JSON.stringify({ 
        recommendations: [] 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Transform Eventbrite events to match our application's format
    const formattedEvents = eventData.events.map(event => {
      const venueInfo = event.venue || {};
      const startInfo = event.start || {};
      const endInfo = event.end || {};
      
      // Parse dates
      const startDate = new Date(startInfo.local || startInfo.utc);
      
      // Calculate match score based on keywords in description/name
      let matchScore = 0.75; // Default score
      
      if (interests && interests.length > 0) {
        const eventText = (event.name?.text || "") + " " + (event.description?.text || "");
        const matchCount = interests.filter(keyword => 
          eventText.toLowerCase().includes(keyword.toLowerCase())
        ).length;
        
        if (matchCount > 0) {
          // Increase score based on matches (max 0.95)
          matchScore = Math.min(0.75 + (matchCount * 0.05), 0.95);
        }
      }
      
      // Extract image URL from the event
      const imageUrl = event.logo?.url || 
                      event.logo?.original?.url || 
                      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86";
      
      return {
        retreatId: `event-${event.id}`,
        title: event.name?.text || "Unnamed Event",
        matchScore: matchScore,
        reason: "This event matches your wellness interests",
        location: venueInfo.address?.localized_address_display || 
                  venueInfo.name || 
                  "Location TBD",
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
        image: imageUrl,
        category: event.category_id ? [event.category_id.toString()] : ["Wellness"],
      };
    });

    // Sort by start time (soonest first)
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
