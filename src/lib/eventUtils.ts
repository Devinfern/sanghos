
import { ForumEvent } from "./forumData";
import { Retreat } from "./data";

export const convertRetreatToForumEvent = (retreat: Retreat): Omit<ForumEvent, 'id'> => {
  const date = new Date(retreat.date);
  return {
    title: retreat.title,
    date: {
      day: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    },
    time: retreat.time,
    location: retreat.location.name,
    description: retreat.description,
    instructor_name: retreat.instructor.name,
    price: retreat.price,
    capacity: retreat.capacity,
    remaining: retreat.remaining,
    retreat_id: retreat.id,
  };
};

export const convertEventDataToRetreat = (
  eventData: any, 
  defaultInstructorId: string = "inst-1"
): Partial<Retreat> => {
  // Make sure we have arrays for categories and other array properties
  let categories = eventData.category || [];
  if (!Array.isArray(categories)) {
    categories = categories ? [categories] : [];
  }
  
  // Create a retreat object from the extracted data
  return {
    title: eventData.title || "New Event",
    description: eventData.description || "No description provided",
    image: eventData.image || "https://images.unsplash.com/photo-1518002171953-a080ee817e1f",
    additionalImages: [],
    location: {
      name: eventData.location?.name || "Venue TBD",
      address: eventData.location?.address || "",
      city: eventData.location?.city || "",
      state: eventData.location?.state || "",
      description: "Location details from event listing"
    },
    date: eventData.date || new Date().toISOString().split('T')[0],
    time: eventData.time || "TBD",
    duration: "1 day", // Default duration
    price: Number(eventData.price) || 0,
    capacity: Number(eventData.capacity) || 20,
    remaining: Number(eventData.remaining || eventData.capacity) || 20,
    category: categories.length ? categories : ["Wellness"],
    amenities: [],
    featured: false,
    isSanghos: true
  };
};

export const syncRetreatsToEvents = (retreats: Retreat[]): ForumEvent[] => {
  return retreats.map((retreat, index) => ({
    id: `retreat-${retreat.id}`,
    ...convertRetreatToForumEvent(retreat)
  }));
};
