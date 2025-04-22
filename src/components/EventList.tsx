
import React from "react";
import EventCard from "./EventCard";
import { Event } from "@/types/event";

interface EventListProps {
  events: Event[];
  title?: string;
}

const EventList: React.FC<EventListProps> = ({ events, title }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find more events.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {title && <h2 className="text-3xl md:text-4xl font-semibold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
