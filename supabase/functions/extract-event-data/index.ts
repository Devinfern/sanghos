
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

    // IMPROVED TITLE EXTRACTION - Try multiple selectors with more specific targeting
    let title = "";
    const titleSelectors = [
      "h1.entry-title",                       // Primary selector for main title
      ".event-block-detail__title",           // Alternative class
      "article header h1",                    // Common structure
      "main h1",                              // Another common structure
      ".event-title"                          // Another possible class
    ];
    
    for (const selector of titleSelectors) {
      const titleEl = doc.querySelector(selector);
      if (titleEl && titleEl.textContent) {
        title = titleEl.textContent.trim();
        console.log(`Title found with selector '${selector}': ${title}`);
        break;
      }
    }
    
    // If title extraction failed, try to extract from metadata
    if (!title) {
      const metaTitle = doc.querySelector('meta[property="og:title"]');
      if (metaTitle && metaTitle.getAttribute("content")) {
        title = metaTitle.getAttribute("content").trim();
        console.log(`Title found in meta: ${title}`);
      }
    }
    
    // IMPROVED DESCRIPTION EXTRACTION - Focus on getting the full unique content
    let description = "";
    
    // Try to find the main content area
    const descriptionSelectors = [
      ".event-block-detail__description", 
      ".entry-content", 
      "article .post-content",
      ".event-description"
    ];
    
    let descriptionEl = null;
    for (const selector of descriptionSelectors) {
      const el = doc.querySelector(selector);
      if (el) {
        descriptionEl = el;
        console.log(`Description container found with selector '${selector}'`);
        break;
      }
    }
    
    if (descriptionEl) {
      // Extract paragraphs from the description element
      const paragraphs = Array.from(descriptionEl.querySelectorAll("p"));
      
      if (paragraphs.length > 0) {
        // Combine all paragraphs into a single description
        description = paragraphs.map(p => p.textContent?.trim()).filter(Boolean).join("\n\n");
      } else {
        // If no paragraphs found, use the entire content
        description = descriptionEl.textContent?.trim() || "";
      }
      
      // Clean up excessive whitespace
      description = description.replace(/\n{3,}/g, "\n\n").trim();
    }
    
    // Fallback to meta description if content extraction failed
    if (!description) {
      const metaDescription = doc.querySelector('meta[name="description"]');
      if (metaDescription && metaDescription.getAttribute("content")) {
        description = metaDescription.getAttribute("content").trim();
        console.log("Using meta description as fallback");
      }
    }
    
    // IMPROVED IMAGE EXTRACTION - Try specific event image selectors first
    let image = "";
    
    // First check for OpenGraph image which is often the hero image
    const metaImage = doc.querySelector('meta[property="og:image"]');
    if (metaImage && metaImage.getAttribute("content")) {
      image = metaImage.getAttribute("content") || "";
      console.log("Image found in meta og:image");
    } 
    // Try event-specific image selectors
    else {
      const imageSelectors = [
        ".event-block-detail__image img",
        ".entry-content img:first-child",
        ".post-thumbnail img",
        "article img:first-child",
        ".wp-post-image"
      ];
      
      for (const selector of imageSelectors) {
        const imageEl = doc.querySelector(selector);
        if (imageEl && imageEl.getAttribute("src")) {
          image = imageEl.getAttribute("src") || "";
          console.log(`Image found with selector '${selector}': ${image}`);
          break;
        }
      }
    }
    
    // Fallback image if none found
    if (!image) {
      image = "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop";
      console.log("Using fallback image");
    }
    
    // IMPROVED DATE AND TIME EXTRACTION - Structured approach
    // Look for date/time information in multiple formats and locations
    let dateInfo = {
      display: "",
      iso: ""
    };
    let timeInfo = "";
    
    // First approach: Look for structured date-time elements
    const dateTimeSelectors = [
      ".event-block-detail__date-time",
      ".event-date-time",
      ".event-meta .date",
      ".event-details .date",
      "time.event-date"
    ];
    
    let dateTimeEl = null;
    for (const selector of dateTimeSelectors) {
      const el = doc.querySelector(selector);
      if (el && el.textContent) {
        dateTimeEl = el;
        console.log(`Date/time found with selector '${selector}': ${el.textContent.trim()}`);
        break;
      }
    }
    
    if (dateTimeEl) {
      const dateTimeText = dateTimeEl.textContent?.trim() || "";
      
      // Try to parse date and time from the text
      // Common formats: "Monday, June 2, 2025 | 2:00pm-4:00pm"
      const dateTimeMatch = dateTimeText.match(/([^|]+)(?:\|(.+))?/);
      
      if (dateTimeMatch) {
        dateInfo.display = dateTimeMatch[1].trim();
        
        // Parse the display date into a proper Date object
        try {
          const dateObj = new Date(dateInfo.display);
          if (!isNaN(dateObj.getTime())) {
            dateInfo.iso = dateObj.toISOString();
            console.log(`Parsed date: ${dateInfo.iso} from: ${dateInfo.display}`);
          }
        } catch (error) {
          console.error("Error parsing date:", error);
        }
        
        // Extract time component if available
        if (dateTimeMatch[2]) {
          timeInfo = dateTimeMatch[2].trim();
          console.log(`Time info: ${timeInfo}`);
        }
      }
    }
    
    // Second approach: Try to extract from URL path components
    if (!dateInfo.iso) {
      const urlPathMatch = url.match(/\/(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2})\/?$/);
      if (urlPathMatch) {
        const dateStr = urlPathMatch[1]; // e.g. "2025-04-24"
        const timeStr = urlPathMatch[2].replace('-', ':'); // e.g. "06:30"
        
        const dateTimeStr = `${dateStr}T${timeStr}:00`;
        try {
          const dateObj = new Date(dateTimeStr);
          if (!isNaN(dateObj.getTime())) {
            dateInfo.iso = dateObj.toISOString();
            
            // Create a nice display date
            dateInfo.display = dateObj.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            // Use the time extracted from URL
            if (!timeInfo) {
              timeInfo = dateObj.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              });
            }
            
            console.log(`Date extracted from URL: ${dateInfo.iso}, display: ${dateInfo.display}`);
          }
        } catch (error) {
          console.error("Error parsing date from URL:", error);
        }
      }
    }
    
    // Third approach: Check for structured data in JSON-LD
    if (!dateInfo.iso || !timeInfo) {
      const jsonLdScripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
      
      for (const script of jsonLdScripts) {
        try {
          if (script.textContent) {
            const jsonData = JSON.parse(script.textContent);
            
            // Look for Event schema
            if (jsonData["@type"] === "Event" || 
                (Array.isArray(jsonData["@graph"]) && 
                 jsonData["@graph"].some(item => item["@type"] === "Event"))) {
              
              const eventData = jsonData["@type"] === "Event" ? 
                jsonData : 
                jsonData["@graph"].find(item => item["@type"] === "Event");
              
              if (eventData && eventData.startDate) {
                const dateObj = new Date(eventData.startDate);
                if (!isNaN(dateObj.getTime())) {
                  dateInfo.iso = dateObj.toISOString();
                  dateInfo.display = dateObj.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });
                  
                  timeInfo = dateObj.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  });
                  
                  console.log(`Date/time from JSON-LD: ${dateInfo.iso}, ${timeInfo}`);
                  break;
                }
              }
            }
          }
        } catch (error) {
          console.error("Error parsing JSON-LD:", error);
        }
      }
    }
    
    // Fourth approach: Try meta tags
    if (!dateInfo.iso) {
      const metaDate = doc.querySelector('meta[property="event:start_time"]') || 
                      doc.querySelector('meta[property="article:published_time"]');
      
      if (metaDate && metaDate.getAttribute("content")) {
        try {
          const dateObj = new Date(metaDate.getAttribute("content"));
          if (!isNaN(dateObj.getTime())) {
            dateInfo.iso = dateObj.toISOString();
            dateInfo.display = dateObj.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            if (!timeInfo) {
              timeInfo = dateObj.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              });
            }
            
            console.log(`Date from meta tag: ${dateInfo.iso}`);
          }
        } catch (error) {
          console.error("Error parsing meta date:", error);
        }
      }
    }
    
    // Fallback for missing date
    if (!dateInfo.iso) {
      // Extract date from URL as last resort
      const dateMatch = url.match(/\/(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        try {
          const dateStr = dateMatch[1];
          const dateObj = new Date(dateStr);
          if (!isNaN(dateObj.getTime())) {
            dateInfo.iso = dateObj.toISOString();
            dateInfo.display = dateObj.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            console.log(`Date extracted from URL as last resort: ${dateInfo.iso}`);
          }
        } catch (error) {
          console.error("Error parsing URL date:", error);
        }
      }
    }
    
    // If all extraction methods fail, use current date (but future dated)
    if (!dateInfo.iso) {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 3); // 3 months in the future
      
      dateInfo.iso = futureDate.toISOString();
      dateInfo.display = futureDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      console.log("Using fallback future date");
    }
    
    // ENHANCED LOCATION DATA
    // Try to find location information
    const locationSelectors = [
      ".event-block-detail__location",
      ".event-location",
      ".event-meta .location",
      ".event-venue"
    ];
    
    let locationName = "InsightLA East Hollywood";
    let locationAddress = "4300 Melrose Ave";
    let locationCity = "Los Angeles";
    let locationState = "CA";
    let locationType = "venue";
    
    for (const selector of locationSelectors) {
      const locationEl = doc.querySelector(selector);
      if (locationEl) {
        // Check if there's a specific name element
        const nameEl = locationEl.querySelector(".name") || locationEl.querySelector("strong");
        if (nameEl && nameEl.textContent) {
          locationName = nameEl.textContent.trim();
        } else if (locationEl.textContent) {
          locationName = locationEl.textContent.trim();
        }
        
        // Check for address elements
        const addressEl = locationEl.querySelector(".address") || locationEl.querySelector("address");
        if (addressEl && addressEl.textContent) {
          locationAddress = addressEl.textContent.trim();
          
          // Try to extract city/state if available
          const cityStateMatch = locationAddress.match(/([^,]+),\s*([A-Z]{2})/);
          if (cityStateMatch) {
            locationCity = cityStateMatch[1].trim();
            locationState = cityStateMatch[2].trim();
          }
        }
        
        console.log(`Location found: ${locationName}, ${locationAddress}`);
        break;
      }
    }
    
    // Check if location is online
    if (locationName.toLowerCase().includes("online") || 
        locationAddress.toLowerCase().includes("online") ||
        description.toLowerCase().includes("zoom") ||
        title.toLowerCase().includes("online")) {
      locationType = "online";
      console.log("Detected online event");
    }
    
    // ENHANCED INSTRUCTOR/TEACHER EXTRACTION
    let instructor = "InsightLA";
    const teacherSelectors = [
      ".event-block-detail__teacher",
      ".event-teacher",
      ".teacher",
      ".event-meta .instructor",
      ".presenter-name"
    ];
    
    for (const selector of teacherSelectors) {
      const teacherEl = doc.querySelector(selector);
      if (teacherEl && teacherEl.textContent) {
        instructor = teacherEl.textContent.trim();
        console.log(`Instructor found: ${instructor}`);
        break;
      }
    }
    
    // ENHANCED PRICE EXTRACTION
    let price = 0;
    let priceDisplay = "";
    
    // Try dedicated price elements first
    const priceSelectors = [
      ".event-block-detail__pricing .price",
      ".event-price",
      ".price",
      ".ticket-price",
      ".event-cost"
    ];
    
    for (const selector of priceSelectors) {
      const priceEl = doc.querySelector(selector);
      if (priceEl && priceEl.textContent) {
        priceDisplay = priceEl.textContent.trim();
        console.log(`Price found: ${priceDisplay}`);
        
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
        break;
      }
    }
    
    // If no price found, try to find it in description
    if (!priceDisplay && description) {
      // Look for price patterns like "Suggested donation: $85" in the description
      const suggestionMatch = description.match(/suggested\s+donation:?\s*\$?(\d+)/i);
      if (suggestionMatch) {
        price = parseInt(suggestionMatch[1], 10);
        priceDisplay = `$${price}`;
        console.log(`Price found in description: ${priceDisplay}`);
      }
    }
    
    // fallback price based on event type
    if (!price) {
      if (title.toLowerCase().includes("retreat")) {
        price = 250;
        priceDisplay = "$250";
      } else {
        price = 85;
        priceDisplay = "$85";
      }
      console.log(`Using fallback price: ${priceDisplay}`);
    }
    
    // ENHANCED CAPACITY AND REMAINING EXTRACTION
    // Note: This is often not directly available on public event pages
    // Set reasonable defaults or extract if available
    let capacity = 30;
    let remaining = Math.floor(Math.random() * 15) + 5; // Random number between 5-20
    
    // Try to find capacity text if available
    const capacityTexts = [
      /(\d+)\s+spots\s+available/i,
      /limited\s+to\s+(\d+)/i,
      /capacity:\s*(\d+)/i,
      /max\s+(\d+)\s+participants/i
    ];
    
    for (const regex of capacityTexts) {
      const match = description.match(regex);
      if (match && match[1]) {
        capacity = parseInt(match[1], 10);
        console.log(`Capacity found: ${capacity}`);
        break;
      }
    }
    
    // Try to find remaining spots if available
    const remainingTexts = [
      /only\s+(\d+)\s+spots\s+left/i,
      /(\d+)\s+spots\s+remaining/i,
      /(\d+)\s+places\s+available/i
    ];
    
    for (const regex of remainingTexts) {
      const match = description.match(regex);
      if (match && match[1]) {
        remaining = parseInt(match[1], 10);
        console.log(`Remaining spots found: ${remaining}`);
        break;
      }
    }
    
    // ENHANCED CATEGORY EXTRACTION
    let category = ["Meditation", "Mindfulness"];
    
    // Try to determine more specific categories based on title and description
    const categoryDetectors = [
      { pattern: /yoga/i, category: "Yoga" },
      { pattern: /vipassana|insight/i, category: "Vipassana" },
      { pattern: /retreat|weekend/i, category: "Retreat" },
      { pattern: /workshop/i, category: "Workshop" },
      { pattern: /zen/i, category: "Zen" },
      { pattern: /compassion|metta|loving[\s-]*kindness/i, category: "Compassion" },
      { pattern: /breath|breathing/i, category: "Breathwork" }
    ];
    
    for (const detector of categoryDetectors) {
      if (detector.pattern.test(title) || detector.pattern.test(description)) {
        if (!category.includes(detector.category)) {
          category.push(detector.category);
          console.log(`Category detected: ${detector.category}`);
          // Limit to 3 categories maximum
          if (category.length >= 3) break;
        }
      }
    }
    
    // Compose the enhanced extracted data
    const eventData = {
      title: title || "InsightLA Event",
      description: description || "A mindfulness event by InsightLA.",
      image,
      date: dateInfo,
      time: timeInfo || "Check event details for time",
      location: {
        name: locationName,
        address: locationAddress,
        city: locationCity,
        state: locationState,
        type: locationType
      },
      instructor,
      price,
      priceDisplay,
      capacity,
      remaining,
      category,
      bookingLink: url,
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
