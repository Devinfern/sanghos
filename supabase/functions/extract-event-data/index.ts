
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

    // Extract event data
    const title = doc.querySelector(".event-block-detail__title")?.textContent?.trim() || "";
    
    // Extract description
    const descriptionEl = doc.querySelector(".event-block-detail__description");
    const description = descriptionEl ? descriptionEl.textContent?.trim() || "" : "";
    
    // Extract image
    const imageEl = doc.querySelector(".event-block-detail__image img");
    const image = imageEl?.getAttribute("src") || "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop";
    
    // Extract date and time
    const dateTimeEl = doc.querySelector(".event-block-detail__date-time");
    let date = "";
    let time = "";
    
    if (dateTimeEl) {
      const dateTimeText = dateTimeEl.textContent?.trim() || "";
      // Example format: "Monday, June 2, 2025 | 2:00pm-4:00pm PST"
      const dateTimeParts = dateTimeText.split("|");
      
      if (dateTimeParts.length >= 1) {
        date = dateTimeParts[0].trim();
      }
      
      if (dateTimeParts.length >= 2) {
        time = dateTimeParts[1].trim();
      }
    }
    
    // Extract location
    const locationEl = doc.querySelector(".event-block-detail__location");
    const location = {
      name: locationEl?.querySelector(".name")?.textContent?.trim() || "InsightLA",
      address: locationEl?.querySelector(".address")?.textContent?.trim() || "",
      city: "Los Angeles",
      state: "CA"
    };
    
    // Extract teacher/instructor
    const teacherEl = doc.querySelector(".event-block-detail__teacher");
    const instructor = teacherEl?.textContent?.trim() || "InsightLA";
    
    // Extract pricing
    const pricingEl = doc.querySelector(".event-block-detail__pricing .price");
    let price = 0;
    if (pricingEl) {
      const priceText = pricingEl.textContent?.trim() || "";
      // Extract numbers from string like "$180.00"
      const priceMatch = priceText.match(/\d+(\.\d+)?/);
      if (priceMatch) {
        price = parseFloat(priceMatch[0]);
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

    // Compose the extracted data
    const eventData = {
      title,
      description,
      image,
      date,
      time,
      location,
      instructor,
      price,
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
