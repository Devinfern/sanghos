
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

export const syncRetreatsToEvents = (retreats: Retreat[]): ForumEvent[] => {
  return retreats.map((retreat, index) => ({
    id: `retreat-${retreat.id}`,
    ...convertRetreatToForumEvent(retreat)
  }));
};
