
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

    // Improved extraction of event data with extended targeting
    // Try multiple potential title elements with fallbacks
    const titleEl = doc.querySelector(".event-block-detail__title") || 
                   doc.querySelector("h1.entry-title") ||
                   doc.querySelector(".post-title");
    const title = titleEl ? titleEl.textContent?.trim() || "" : "";
    
    // Extract description - look for full content with multiple approaches
    const descriptionEl = doc.querySelector(".event-block-detail__description") || 
                         doc.querySelector(".entry-content") || 
                         doc.querySelector(".event-description");
    let description = "";
    if (descriptionEl) {
      // Get all text content from paragraphs in description
      const paragraphs = Array.from(descriptionEl.querySelectorAll("p"));
      if (paragraphs.length > 0) {
        description = paragraphs.map(p => p.textContent?.trim()).join("\n\n");
      } else {
        description = descriptionEl.textContent?.trim() || "";
      }
    }
    
    // Enhanced image extraction with multiple fallbacks
    let image = "";
    // First check for OpenGraph image which is often the hero image
    const metaImage = doc.querySelector('meta[property="og:image"]');
    if (metaImage && metaImage.getAttribute("content")) {
      image = metaImage.getAttribute("content") || "";
    } else {
      // Try multiple image selectors
      const imageSelectors = [
        ".event-block-detail__image img",
        ".entry-content img",
        ".post-thumbnail img",
        "article img"
      ];
      
      for (const selector of imageSelectors) {
        const imageEl = doc.querySelector(selector);
        if (imageEl && imageEl.getAttribute("src")) {
          image = imageEl.getAttribute("src") || "";
          break;
        }
      }
    }
    
    // Fallback image if none found
    if (!image) {
      image = "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop";
    }
    
    // Enhanced date and time extraction with multiple strategies
    const dateTimeEl = doc.querySelector(".event-block-detail__date-time") || 
                       doc.querySelector(".event-date-time") || 
                       doc.querySelector(".event-meta");

    let date = {
      display: "",
      iso: ""
    };
    let time = "";
    let fullDateTime = "";
    
    if (dateTimeEl) {
      fullDateTime = dateTimeEl.textContent?.trim() || "";
      // Example format: "Monday, June 2, 2025 | 2:00pm-4:00pm PST"
      const dateTimeParts = fullDateTime.split("|");
      
      if (dateTimeParts.length >= 1) {
        date.display = dateTimeParts[0].trim();
        
        // Try to convert date to ISO format for better storage
        try {
          if (date.display) {
            // Parse date like "Monday, June 2, 2025"
            const dateObj = new Date(date.display);
            if (!isNaN(dateObj.getTime())) {
              // Format as ISO date string
              date.iso = dateObj.toISOString();
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
    
    // Alternative date-time extraction if the previous method fails
    if (!date.display || !time) {
      // Try structured data (schema.org)
      const schemaScript = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))
        .find(script => script.textContent?.includes('"@type":"Event"'));
      
      if (schemaScript) {
        try {
          const schemaData = JSON.parse(schemaScript.textContent || "{}");
          
          if (schemaData.startDate && !date.iso) {
            const startDateObj = new Date(schemaData.startDate);
            if (!isNaN(startDateObj.getTime())) {
              date.iso = startDateObj.toISOString();
              date.display = startDateObj.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            }
          }
          
          if (schemaData.startDate && !time) {
            const startTimeObj = new Date(schemaData.startDate);
            if (!isNaN(startTimeObj.getTime())) {
              time = startTimeObj.toLocaleString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              });
              
              // Add end time if available
              if (schemaData.endDate) {
                const endTimeObj = new Date(schemaData.endDate);
                if (!isNaN(endTimeObj.getTime())) {
                  time += " - " + endTimeObj.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  });
                }
              }
            }
          }
        } catch (error) {
          console.error("Error parsing structured data:", error);
        }
      }
    }
    
    // Enhanced location extraction with multiple approaches
    const locationEl = doc.querySelector(".event-block-detail__location") || 
                      doc.querySelector(".event-location") || 
                      doc.querySelector(".event-meta .location");
    
    let locationName = locationEl?.querySelector(".name")?.textContent?.trim() || 
                      locationEl?.textContent?.trim() || "InsightLA";
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
      type: locationAddress.toLowerCase().includes("online") || 
            locationName.toLowerCase().includes("online") ||
            fullDateTime.toLowerCase().includes("zoom") ||
            title.toLowerCase().includes("online") ? "online" : "venue"
    };
    
    // Enhanced teacher/instructor extraction with multiple selectors
    const teacherEl = doc.querySelector(".event-block-detail__teacher") || 
                     doc.querySelector(".event-teacher") || 
                     doc.querySelector(".teacher");
    const instructor = teacherEl?.textContent?.trim() || "InsightLA";
    
    // Enhanced price extraction with multiple approaches
    const pricingEl = doc.querySelector(".event-block-detail__pricing .price") || 
                     doc.querySelector(".event-price") || 
                     doc.querySelector(".price");
                     
    let price = 0;
    let priceDisplay = "";
    
    if (pricingEl) {
      priceDisplay = pricingEl.textContent?.trim() || "";
      
      // Handle different price formats
      if (priceDisplay.toLowerCase().includes("free")) {
        price = 0;
        priceDisplay = "Free";
      } else {
        // Extract numbers from string like "$180.00" or "Sliding Scale $50-$150"
        const priceMatches = priceDisplay.match(/\d+(\.\d+)?/g);
        if (priceMatches && priceMatches.length > 0) {
          // If there are multiple numbers (like in a range), use the first one
          price = parseFloat(priceMatches[0]);
        }
      }
    }
    
    // Extract capacity and remaining spots (often not directly available)
    // This is often not directly available, so we set reasonable defaults
    const capacity = 30;
    const remaining = Math.floor(Math.random() * 20) + 5; // Random number between 5-25
    
    // Extract category with multiple approaches
    const categoryEl = doc.querySelector(".event-block-detail__category") || 
                      doc.querySelector(".event-categories") || 
                      doc.querySelector(".categories");
    const categoryText = categoryEl?.textContent?.trim() || "Meditation";
    const category = [categoryText, "Mindfulness"];
    
    // Extract booking link with fallbacks
    const bookingLinkEl = doc.querySelector(".event-block-detail__register a") || 
                         doc.querySelector(".event-registration a");
    const bookingLink = bookingLinkEl?.getAttribute("href") || url;

    // Compose the enhanced extracted data
    const eventData = {
      title,
      description,
      image,
      date,
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
