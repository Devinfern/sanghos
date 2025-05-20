import React, { useState, useMemo } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Event, EventCategory } from "@/types/event";
import EventList from "@/components/EventList";
import DateFilter, { DateFilterOption } from "@/components/DateFilter";
import { startOfDay, getDay, isSameDay, isThisWeek } from "date-fns";
import { allEvents } from "@/data/mockEvents";
import { ensureValidCategory } from "@/mockEvents";

interface EventsSectionProps {
  events: Event[];
  isLoading: boolean;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, isLoading }) => {
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilterOption>('all');
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);

  // Use the combined events (API events + partner events)
  const combinedEvents = [...events];
  
  // Add partner events if they don't already exist in the events array
  // Make sure to properly type the category and location.locationType
  const typeSafeAllEvents = allEvents.map(event => ({
    ...event,
    category: ensureValidCategory(event.category),
    location: {
      ...event.location,
      // Ensure locationType is narrowed to the union type "venue" | "online"
      locationType: (event.location.locationType === "venue" ? "venue" : "online") as "venue" | "online"
    }
  }));
  
  typeSafeAllEvents.forEach(partnerEvent => {
    if (!combinedEvents.some(event => event.id === partnerEvent.id)) {
      combinedEvents.push(partnerEvent as Event);
    }
  });

  function isDateInThisWeekend(date: Date) {
    const day = getDay(date);
    return day === 0 || day === 6;
  }

  const filteredEvents = useMemo(() => {
    if (selectedDateFilter === "all") return combinedEvents;

    const today = startOfDay(new Date());
    switch (selectedDateFilter) {
      case "today":
        return combinedEvents.filter(event =>
          isSameDay(event.startDate, today)
        );
      case "tomorrow":
        const tomorrow = startOfDay(new Date(today.getTime() + 24 * 60 * 60 * 1000));
        return combinedEvents.filter(event =>
          isSameDay(event.startDate, tomorrow)
        );
      case "this-week":
        return combinedEvents.filter(event =>
          isThisWeek(event.startDate, { weekStartsOn: 1 })
        );
      case "this-weekend":
        return combinedEvents.filter(event =>
          isDateInThisWeekend(event.startDate)
        );
      case "custom":
        if (customDate) {
          return combinedEvents.filter(event =>
            isSameDay(event.startDate, startOfDay(customDate))
          );
        }
        return combinedEvents;
      default:
        return combinedEvents;
    }
  }, [selectedDateFilter, customDate, combinedEvents]);

  return (
    <section className="py-16 bg-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Featured Events
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A selection of curated wellness events for you to explore and book.
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <DateFilter
            selectedOption={selectedDateFilter}
            customDate={customDate}
            onSelectOption={setSelectedDateFilter}
            onSelectCustomDate={setCustomDate}
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner className="h-8 w-8 text-sage-600" />
            <span className="ml-3 text-sage-700">Loading events...</span>
          </div>
        ) : (
          <EventList events={filteredEvents} />
        )}
      </div>
    </section>
  );
};

export default EventsSection;
