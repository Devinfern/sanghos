
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
    // Create an array of promises to fetch all events in parallel
    const eventPromises = eventUrls.map(url => extractEventDataFromUrl(url));
    const extractedEvents = await Promise.all(eventPromises);
    
    // Transform the extracted data into Retreat objects
    const retreats: Retreat[] = extractedEvents.map((eventData, index) => {
      // Generate a unique ID based on the URL
      const id = `insight-la-${index + 1}`;
      
      return {
        id,
        title: eventData.title || `InsightLA Event ${index + 1}`,
        description: eventData.description || "A mindfulness retreat by InsightLA.",
        image: eventData.image || "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop",
        additionalImages: [
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1170&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=1170&auto=format&fit=crop"
        ],
        location: {
          name: eventData.location.name || "InsightLA East Hollywood",
          address: eventData.location.address || "4300 Melrose Ave",
          city: eventData.location.city || "Los Angeles",
          state: eventData.location.state || "CA",
          description: `${eventData.location.name || "InsightLA"}, ${eventData.location.city || "Los Angeles"}, ${eventData.location.state || "CA"}`,
          coordinates: {
            lat: 34.0736,
            lng: -118.2936
          }
        },
        instructor: insightLAInstructor,
        date: eventData.date || new Date().toISOString().split('T')[0],
        time: eventData.time || "10:00 AM",
        duration: "Full day",
        price: typeof eventData.price === 'number' ? eventData.price : 180,
        capacity: eventData.capacity || 25,
        remaining: eventData.remaining || Math.floor(Math.random() * 20) + 5,
        category: eventData.category || ["Meditation", "Mindfulness"],
        amenities: ["Meditation cushions", "Tea service", "Lunch provided", "Accessible facilities"],
        featured: true,
        isSanghos: false,
        sourceUrl: eventUrls[index]
      };
    });
    
    return retreats;
  } catch (error) {
    console.error("Error fetching InsightLA events:", error);
    toast.error("Failed to load InsightLA events");
    return [];
  }
};

