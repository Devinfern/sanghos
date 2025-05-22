
import { Retreat, Instructor } from "@/lib/data";
import { extractEventDataFromUrl } from "@/lib/api/forum/events/extractApi";
import { toast } from "sonner";

// Default instructor for InsightLA events
const insightLAInstructor: Instructor = {
  id: "insight-la",
  name: "InsightLA",
  title: "Mindfulness Organization",
  bio: "InsightLA is a non-profit mindfulness meditation center teaching the art of mindfulness and compassion. They offer classes, groups, workshops and retreats for developing greater awareness, compassion, resilience, and well-being.",
  specialties: ["Meditation", "Mindfulness", "Buddhist Practice", "Wellness"],
  image: "https://images.squarespace-cdn.com/content/v1/5c7feb97797f744d5f1c68a7/1553558094608-3P4IDOETDRUGBVPU5QQR/InsightLA_Logo_FullColor.jpg",
  yearsExperience: 15
};

// Function to fetch all InsightLA events
export const fetchInsightLAEvents = async (): Promise<Retreat[]> => {
  // Event URLs from InsightLA
  const eventUrls = [
    "https://insightla.org/event/understanding-the-mind-a-vipassana-retreat/2025-04-24-06-30/",
    "https://insightla.org/event/hybrid-in-person-living-deeply-retreat/2025-05-31-10-00/",
    "https://insightla.org/event/hybrid-in-person-deep-belonging/2025-06-02-14-00/",
    "https://insightla.org/event/hybrid-in-person-lgbtq-mindfulness-group-event/2025-06-08-14-30/"
  ];

  try {
    console.log("fetchInsightLAEvents: Starting to fetch events from InsightLA");
    console.log(`fetchInsightLAEvents: Will try to fetch ${eventUrls.length} events`);
    
    // Create an array of promises to fetch all events in parallel
    const eventPromises = eventUrls.map(url => extractEventDataFromUrl(url));
    
    // Wait for all promises to settle, even if some fail
    const eventResults = await Promise.allSettled(eventPromises);
    
    // Process results, filtering out rejected promises
    const extractedEvents = eventResults
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value);
    
    // Log any rejected promises
    eventResults
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .forEach((result, index) => {
        console.error(`fetchInsightLAEvents: Failed to extract data from ${eventUrls[index]}:`, result.reason);
      });
    
    console.log(`fetchInsightLAEvents: Successfully extracted ${extractedEvents.length} out of ${eventUrls.length} events`);
    console.log("Raw extracted events sample:", extractedEvents.slice(0, 1));
    
    if (extractedEvents.length === 0) {
      console.error("fetchInsightLAEvents: No events were successfully extracted");
      return [];
    }
    
    // Transform the extracted data into Retreat objects
    const retreats: Retreat[] = extractedEvents.map((eventData, index) => {
      // Generate a unique ID based on the URL
      const id = `insight-la-${index + 1}`;
      
      // Create instructor object based on extracted data or use default
      const eventInstructor: Instructor = {
        ...insightLAInstructor,
        name: eventData.instructor || insightLAInstructor.name,
      };
      
      // Parse date from extracted data
      let dateString = "";
      
      // Handle the case where date is an object with iso and display properties
      if (typeof eventData.date === 'object' && eventData.date.iso) {
        dateString = eventData.date.iso.split('T')[0]; // Get just the date part
      } 
      // Handle the case where date is a simple string
      else if (typeof eventData.date === 'string') {
        dateString = eventData.date;
      }
      // Fallback to current date if no date information is available
      else {
        dateString = new Date().toISOString().split('T')[0];
      }
      
      // Create a start date and end date for the event card
      const startDate = new Date(dateString);
      
      // Add time information if available
      if (eventData.time && typeof eventData.time === 'string') {
        const timeMatch = eventData.time.match(/(\d+):(\d+)(?:\s*(am|pm))?/i);
        if (timeMatch) {
          let hours = parseInt(timeMatch[1], 10);
          const minutes = parseInt(timeMatch[2], 10);
          
          // Handle AM/PM
          if (timeMatch[3] && timeMatch[3].toLowerCase() === 'pm' && hours < 12) {
            hours += 12;
          } else if (timeMatch[3] && timeMatch[3].toLowerCase() === 'am' && hours === 12) {
            hours = 0;
          }
          
          startDate.setHours(hours, minutes, 0);
        }
      }
      
      // Create an end date 2 hours after start time by default
      const endDate = new Date(startDate.getTime());
      endDate.setHours(endDate.getHours() + 2);
      
      // Determine if this is a multi-day retreat
      const isMultiDay = eventData.description && 
        (eventData.description.toLowerCase().includes("day retreat") || 
         eventData.description.toLowerCase().includes("weekend") ||
         eventData.description.toLowerCase().includes("multi-day"));
      
      // For multi-day retreats, set end date to be 2-3 days after start
      if (isMultiDay) {
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 2) + 2); // 2-3 days
      }
      
      // Extract location information
      const locationInfo = {
        name: eventData.location?.name || "InsightLA East Hollywood",
        address: eventData.location?.address || "4300 Melrose Ave",
        city: eventData.location?.city || "Los Angeles",
        state: eventData.location?.state || "CA",
        description: `${eventData.location?.name || "InsightLA"}, ${eventData.location?.city || "Los Angeles"}, ${eventData.location?.state || "CA"}`,
        coordinates: {
          lat: 34.0736,
          lng: -118.2936
        }
      };
      
      // Get price as a number
      const price = typeof eventData.price === 'number' ? 
        eventData.price : 
        (eventData.priceDisplay ? parseInt(eventData.priceDisplay.replace(/\D/g, '')) || 85 : 85);
      
      // Convert categories to appropriate format for EventCard
      let eventCategory: string = "meditation";
      if (eventData.category && Array.isArray(eventData.category)) {
        if (eventData.category.some(cat => /yoga/i.test(cat))) {
          eventCategory = "yoga";
        } else if (eventData.category.some(cat => /retreat/i.test(cat))) {
          eventCategory = "retreat";
        } else if (eventData.category.some(cat => /workshop/i.test(cat))) {
          eventCategory = "workshop";
        }
      }
      
      const retreat: Retreat = {
        id,
        title: eventData.title || `InsightLA Event ${index + 1}`,
        description: eventData.description || "A mindfulness retreat by InsightLA.",
        image: eventData.image || "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop",
        additionalImages: [
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1170&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=1170&auto=format&fit=crop"
        ],
        location: locationInfo,
        instructor: eventInstructor,
        date: dateString,
        time: eventData.time || "10:00 AM",
        duration: isMultiDay ? "Multiple days" : "Full day",
        price: price,
        capacity: eventData.capacity || 25,
        remaining: eventData.remaining || Math.floor(Math.random() * 20) + 5,
        category: [eventCategory, "mindfulness"],
        amenities: ["Meditation cushions", "Tea service", "Lunch provided", "Accessible facilities"],
        featured: true,
        isSanghos: false,
        sourceUrl: eventUrls[index],
        // Removed shortDescription field as it's not in the Retreat type
        startDate: startDate,
        endDate: endDate,
        bookingUrl: eventData.bookingLink || eventUrls[index],
        organizer: {
          name: "InsightLA",
          website: "https://insightla.org"
        },
        source: "InsightLA"
      };
      
      console.log(`Transformed InsightLA event ${id}:`, retreat.title);
      return retreat;
    });
    
    console.log(`fetchInsightLAEvents: Successfully transformed ${retreats.length} InsightLA events`);
    return retreats;
  } catch (error) {
    console.error("Error fetching InsightLA events:", error);
    // Throw the error so it can be handled by the caller
    throw error;
  }
};
