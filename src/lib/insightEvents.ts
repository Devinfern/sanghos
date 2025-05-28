
import { Retreat, Instructor } from "@/lib/data";
import { extractEventDataFromUrl } from "@/lib/api/forum/events/extractApi";

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

// Fallback event data for when API fails
const fallbackEvents = [
  {
    title: "Understanding the Mind: A Vipassana Retreat",
    description: "A weekend meditation retreat focusing on Vipassana techniques to understand the nature of mind and develop mindful awareness.",
    date: "2025-04-24",
    time: "06:30 AM",
    location: {
      name: "InsightLA East Hollywood",
      address: "4300 Melrose Ave",
      city: "Los Angeles",
      state: "CA"
    },
    instructor: "Jack Kornfield",
    price: 85,
    image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Living Deeply Retreat",
    description: "A day-long retreat to explore mindfulness practices that help us live with greater presence, compassion, and joy.",
    date: "2025-05-31",
    time: "10:00 AM",
    location: {
      name: "InsightLA Santa Monica",
      address: "1001 Colorado Ave",
      city: "Santa Monica",
      state: "CA"
    },
    instructor: "Trudy Goodman",
    price: 95,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
  }
];

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
    
    // Log any rejected promises for debugging
    const failedRequests = eventResults.filter((result): result is PromiseRejectedResult => result.status === 'rejected');
    if (failedRequests.length > 0) {
      console.log(`fetchInsightLAEvents: ${failedRequests.length} requests failed, using fallback data`);
    }
    
    console.log(`fetchInsightLAEvents: Successfully extracted ${extractedEvents.length} out of ${eventUrls.length} events`);
    
    // If we have some extracted events, use them; otherwise use fallback
    const eventsToProcess = extractedEvents.length > 0 ? extractedEvents : fallbackEvents;
    const isUsingFallback = extractedEvents.length === 0;
    
    // Transform the data into Retreat objects
    const retreats: Retreat[] = eventsToProcess.map((eventData, index) => {
      // Generate a unique ID based on the source
      const id = isUsingFallback ? `insight-la-fallback-${index + 1}` : `insight-la-${index + 1}`;
      
      // Create instructor object based on extracted data or use default
      const eventInstructor: Instructor = {
        ...insightLAInstructor,
        name: eventData.instructor || insightLAInstructor.name,
      };
      
      // Parse date from extracted data
      let dateString = "";
      
      // Handle the case where date is an object with iso and display properties
      if (typeof eventData.date === 'object' && eventData.date?.iso) {
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
        duration: "Full day",
        price: price,
        capacity: eventData.capacity || 25,
        remaining: eventData.remaining || Math.floor(Math.random() * 20) + 5,
        category: ["meditation", "mindfulness"],
        amenities: ["Meditation cushions", "Tea service", "Lunch provided", "Accessible facilities"],
        featured: true,
        isSanghos: false,
        sourceUrl: eventUrls[index] || "https://insightla.org/events/",
        bookingUrl: eventData.bookingLink || eventUrls[index] || "https://insightla.org/events/",
        organizer: {
          name: "InsightLA",
          website: "https://insightla.org"
        },
        source: isUsingFallback ? "InsightLA (Fallback Data)" : "InsightLA"
      };
      
      return retreat;
    });
    
    console.log(`fetchInsightLAEvents: Successfully transformed ${retreats.length} InsightLA events`);
    return retreats;
  } catch (error) {
    console.error("Error fetching InsightLA events:", error);
    
    // Return fallback events in case of error
    return fallbackEvents.map((eventData, index) => {
      return {
        id: `insight-la-error-${index + 1}`,
        title: eventData.title,
        description: eventData.description,
        image: eventData.image,
        additionalImages: [
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1170&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=1170&auto=format&fit=crop"
        ],
        location: {
          name: eventData.location.name,
          address: eventData.location.address,
          city: eventData.location.city,
          state: eventData.location.state,
          description: `${eventData.location.name}, ${eventData.location.city}, ${eventData.location.state}`,
          coordinates: {
            lat: 34.0736,
            lng: -118.2936
          }
        },
        instructor: {
          ...insightLAInstructor,
          name: eventData.instructor || insightLAInstructor.name,
        },
        date: eventData.date,
        time: eventData.time,
        duration: "Full day",
        price: eventData.price,
        capacity: 25,
        remaining: Math.floor(Math.random() * 20) + 5,
        category: ["meditation", "mindfulness"],
        amenities: ["Meditation cushions", "Tea service", "Lunch provided", "Accessible facilities"],
        featured: true,
        isSanghos: false,
        sourceUrl: eventUrls[index] || "https://insightla.org/events/",
        bookingUrl: eventUrls[index] || "https://insightla.org/events/",
        organizer: {
          name: "InsightLA",
          website: "https://insightla.org"
        },
        source: "InsightLA (Fallback)"
      };
    });
  }
};
