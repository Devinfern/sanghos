
import { extractDateFromUrl, createFutureDate } from "./utils.ts";

// Title extraction
export function extractTitle(doc: Document): string {
  // Try meta title first (usually most reliable)
  const metaTitle = doc.querySelector('meta[property="og:title"]');
  if (metaTitle && metaTitle.getAttribute("content")) {
    const title = metaTitle.getAttribute("content")?.trim();
    console.log(`Title found in meta: ${title}`);
    return title || "";
  }
  
  // Try multiple selectors for the title
  const titleSelectors = [
    "h1.entry-title",
    ".event-block-detail__title",
    "article header h1",
    "main h1",
    ".event-title"
  ];
  
  for (const selector of titleSelectors) {
    const titleEl = doc.querySelector(selector);
    if (titleEl && titleEl.textContent) {
      const title = titleEl.textContent.trim();
      console.log(`Title found with selector '${selector}': ${title}`);
      return title;
    }
  }
  
  return "InsightLA Event";
}

// Description extraction
export function extractDescription(doc: Document): string {
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
      description = metaDescription.getAttribute("content")?.trim() || "";
      console.log("Using meta description as fallback");
    }
  }
  
  return description;
}

// Image extraction
export function extractImage(doc: Document): string {
  // First check for OpenGraph image which is often the hero image
  const metaImage = doc.querySelector('meta[property="og:image"]');
  if (metaImage && metaImage.getAttribute("content")) {
    const image = metaImage.getAttribute("content") || "";
    console.log("Image found in meta og:image");
    return image;
  } 
  
  // Try event-specific image selectors
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
      const image = imageEl.getAttribute("src") || "";
      console.log(`Image found with selector '${selector}': ${image}`);
      return image;
    }
  }
  
  // Fallback image if none found
  return "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop";
}

// Date and time extraction
export function extractDateTime(doc: Document, url: string): {
  display: string;
  iso: string;
  time: string;
} {
  let dateInfo = {
    display: "",
    iso: "",
    time: ""
  };
  
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
        dateInfo.time = dateTimeMatch[2].trim();
        console.log(`Time info: ${dateInfo.time}`);
      }
    }
  }
  
  // Second approach: Try to extract from URL path components
  if (!dateInfo.iso) {
    const urlDateInfo = extractDateFromUrl(url);
    if (urlDateInfo) {
      dateInfo.iso = urlDateInfo.iso;
      dateInfo.display = urlDateInfo.display;
      
      // Extract time from ISO string
      const timeMatch = dateInfo.iso.match(/T(\d{2}:\d{2})/);
      if (timeMatch) {
        const [hours, minutes] = timeMatch[1].split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        
        dateInfo.time = `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      }
      
      console.log(`Date extracted from URL: ${dateInfo.iso}, display: ${dateInfo.display}`);
    }
  }
  
  // Third approach: Check for structured data in JSON-LD
  if (!dateInfo.iso || !dateInfo.time) {
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
                
                dateInfo.time = dateObj.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                });
                
                console.log(`Date/time from JSON-LD: ${dateInfo.iso}, ${dateInfo.time}`);
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
        const dateObj = new Date(metaDate.getAttribute("content") || "");
        if (!isNaN(dateObj.getTime())) {
          dateInfo.iso = dateObj.toISOString();
          dateInfo.display = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          if (!dateInfo.time) {
            dateInfo.time = dateObj.toLocaleTimeString('en-US', {
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
  
  // If all extraction methods fail, use future date
  if (!dateInfo.iso) {
    const futureDate = createFutureDate();
    dateInfo.iso = futureDate.iso;
    dateInfo.display = futureDate.display;
    dateInfo.time = "10:00 AM"; // Default time
    console.log("Using fallback future date");
  }
  
  return dateInfo;
}

// Location extraction
export function extractLocation(doc: Document): {
  name: string;
  address: string;
  city: string;
  state: string;
  type: string;
} {
  let locationName = "InsightLA East Hollywood";
  let locationAddress = "4300 Melrose Ave";
  let locationCity = "Los Angeles";
  let locationState = "CA";
  let locationType = "venue";
  
  // Try to find location information
  const locationSelectors = [
    ".event-block-detail__location",
    ".event-location",
    ".event-meta .location",
    ".event-venue"
  ];
  
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
      doc.body?.textContent?.toLowerCase().includes("zoom")) {
    locationType = "online";
    console.log("Detected online event");
  }
  
  return {
    name: locationName,
    address: locationAddress,
    city: locationCity,
    state: locationState,
    type: locationType
  };
}

// Instructor extraction
export function extractInstructor(doc: Document): string {
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
  
  return instructor;
}

// Price extraction
export function extractPrice(doc: Document, description: string): {
  price: number;
  priceDisplay: string;
} {
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
    if (doc.body?.textContent?.toLowerCase().includes("retreat")) {
      price = 250;
      priceDisplay = "$250";
    } else {
      price = 85;
      priceDisplay = "$85";
    }
    console.log(`Using fallback price: ${priceDisplay}`);
  }
  
  return { price, priceDisplay };
}

// Capacity and remaining extraction
export function extractCapacity(doc: Document, description: string): {
  capacity: number;
  remaining: number;
} {
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
  
  return { capacity, remaining };
}

// Category extraction
export function extractCategories(doc: Document, title: string, description: string): string[] {
  let categories = ["Meditation", "Mindfulness"];
  
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
      if (!categories.includes(detector.category)) {
        categories.push(detector.category);
        console.log(`Category detected: ${detector.category}`);
        // Limit to 3 categories maximum
        if (categories.length >= 3) break;
      }
    }
  }
  
  return categories;
}
