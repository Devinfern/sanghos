import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

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
    const { url } = await req.json();

    if (!url || !url.includes("insightla.org/event/")) {
      return new Response(
        JSON.stringify({ error: "Invalid URL. Must be an InsightLA event URL" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log("Attempting to fetch URL:", url);
    const response = await fetch(url);
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch URL: ${response.status} ${response.statusText}` }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const html = await response.text();
    console.log("HTML length:", html.length);
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    if (!doc) {
      return new Response(
        JSON.stringify({ error: "Failed to parse HTML" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Enhanced extraction of event data
    const title = doc.querySelector(".event-block-detail__title")?.textContent?.trim() || "";
    
    // Extract description
    const descriptionEl = doc.querySelector(".event-block-detail__description");
    const description = descriptionEl ? descriptionEl.textContent?.trim() || "" : "";
    
    // Enhanced image extraction - look for specific meta tag first, fallback to page image
    let image = "";
    const metaImage = doc.querySelector('meta[property="og:image"]');
    if (metaImage && metaImage.getAttribute("content")) {
      image = metaImage.getAttribute("content") || "";
    } else {
      const imageEl = doc.querySelector(".event-block-detail__image img");
      image = imageEl?.getAttribute("src") || "";
    }
    
    // Fallback image if none found
    if (!image) {
      image = "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop";
    }
    
    // Enhanced date and time extraction
    const dateTimeEl = doc.querySelector(".event-block-detail__date-time");
    let date = "";
    let time = "";
    let fullDateTime = "";
    
    if (dateTimeEl) {
      fullDateTime = dateTimeEl.textContent?.trim() || "";
      // Example format: "Monday, June 2, 2025 | 2:00pm-4:00pm PST"
      const dateTimeParts = fullDateTime.split("|");
      
      if (dateTimeParts.length >= 1) {
        date = dateTimeParts[0].trim();
        
        // Try to convert date to ISO format for better storage (YYYY-MM-DD)
        try {
          if (date) {
            // Parse date like "Monday, June 2, 2025"
            const dateObj = new Date(date);
            if (!isNaN(dateObj.getTime())) {
              // Format as ISO date string (YYYY-MM-DD)
              const isoDate = dateObj.toISOString().split('T')[0];
              // Keep both formats
              date = {
                display: date,
                iso: isoDate
              };
            }
          }
        } catch (error) {
          console.error("Error parsing date:", error);
          // Keep original date format if parsing fails
          date = { display: date, iso: "" };
        }
      }
      
      if (dateTimeParts.length >= 2) {
        time = dateTimeParts[1].trim();
      }
    }
    
    // Enhanced location extraction
    const locationEl = doc.querySelector(".event-block-detail__location");
    let locationName = locationEl?.querySelector(".name")?.textContent?.trim() || "InsightLA";
    let locationAddress = locationEl?.querySelector(".address")?.textContent?.trim() || "";
    let city = "Los Angeles";
    let state = "CA";
    
    // Try to parse city and state from address if available
    if (locationAddress) {
      // Common address format: "Street, City, State ZIP"
      const addressParts = locationAddress.split(',');
      if (addressParts.length >= 2) {
        // Last part might contain "State ZIP"
        const lastPart = addressParts[addressParts.length - 1].trim();
        const stateZipMatch = lastPart.match(/([A-Z]{2})\s+\d+/);
        if (stateZipMatch) {
          state = stateZipMatch[1];
        }
        
        // Second-to-last part might be the city
        if (addressParts.length >= 2) {
          city = addressParts[addressParts.length - 2].trim();
        }
      }
    }
    
    const location = {
      name: locationName,
      address: locationAddress,
      city: city,
      state: state,
      type: locationAddress.toLowerCase().includes("online") || locationName.toLowerCase().includes("online") 
        ? "online" 
        : "venue"
    };
    
    // Enhanced teacher/instructor extraction
    const teacherEl = doc.querySelector(".event-block-detail__teacher");
    const instructor = teacherEl?.textContent?.trim() || "InsightLA";
    
    // Enhanced price extraction
    const pricingEl = doc.querySelector(".event-block-detail__pricing .price");
    let price = 0;
    let priceDisplay = "";
    
    if (pricingEl) {
      priceDisplay = pricingEl.textContent?.trim() || "";
      
      // Handle different price formats
      if (priceDisplay.toLowerCase().includes("free")) {
        price = 0;
      } else {
        // Extract numbers from string like "$180.00" or "Sliding Scale $50-$150"
        const priceMatches = priceDisplay.match(/\d+(\.\d+)?/g);
        if (priceMatches && priceMatches.length > 0) {
          // If there are multiple numbers (like in a range), use the first one
          price = parseFloat(priceMatches[0]);
        }
      }
    }
    
    // Extract capacity and remaining spots
    // This is often not directly available, so we'll set default values
    const capacity = 30;
    const remaining = Math.floor(Math.random() * 20) + 5; // Random number between 5-25
    
    // Extract category
    const categoryEl = doc.querySelector(".event-block-detail__category");
    const categoryText = categoryEl?.textContent?.trim() || "Meditation";
    const category = [categoryText, "Mindfulness"];
    
    // Extract booking link
    const bookingLinkEl = doc.querySelector(".event-block-detail__register a");
    const bookingLink = bookingLinkEl?.getAttribute("href") || url;

    // Compose the enhanced extracted data
    const eventData = {
      title,
      description,
      image,
      date: typeof date === 'object' ? date : { display: date, iso: "" },
      time,
      location,
      instructor,
      price,
      priceDisplay,
      capacity,
      remaining,
      category,
      bookingLink,
      source: "InsightLA"
    };

    console.log("Extracted event data:", JSON.stringify(eventData));
    
    return new Response(
      JSON.stringify(eventData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
