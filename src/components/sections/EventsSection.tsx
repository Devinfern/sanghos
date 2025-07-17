
import React, { useState, useMemo } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Event } from "@/types/event";
import EventList from "@/components/EventList";
import DateFilter, { DateFilterOption } from "@/components/DateFilter";
import { startOfDay, getDay, isSameDay, isThisWeek, isToday, isTomorrow, startOfWeek, endOfWeek } from "date-fns";
import { useSharedRetreatData } from "@/hooks/useSharedRetreatData";

interface EventsSectionProps {
  showFeaturedOnly?: boolean;
}

const EventsSection: React.FC<EventsSectionProps> = ({ showFeaturedOnly = false }) => {
  const { allEvents, featuredEvents, isLoading } = useSharedRetreatData();
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilterOption>('all');
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);

  // Use featured events or all events based on prop
  const events = showFeaturedOnly ? featuredEvents : allEvents;

  function isDateInThisWeekend(date: Date) {
    const day = getDay(date);
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
  }

  const filteredEvents = useMemo(() => {
    if (selectedDateFilter === "all") return events;

    const today = startOfDay(new Date());
    
    switch (selectedDateFilter) {
      case "today":
        return events.filter(event =>
          isToday(event.startDate)
        );
      case "tomorrow":
        return events.filter(event =>
          isTomorrow(event.startDate)
        );
      case "this-week":
        const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday start
        const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
        return events.filter(event =>
          event.startDate >= weekStart && event.startDate <= weekEnd
        );
      case "this-weekend":
        // Get the current week's weekend dates
        const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
        const saturday = new Date(currentWeekStart);
        saturday.setDate(saturday.getDate() + 5); // Saturday
        const sunday = new Date(currentWeekStart);
        sunday.setDate(sunday.getDate() + 6); // Sunday
        
        return events.filter(event =>
          isSameDay(event.startDate, saturday) || isSameDay(event.startDate, sunday)
        );
      case "custom":
        if (customDate) {
          return events.filter(event =>
            isSameDay(event.startDate, startOfDay(customDate))
          );
        }
        return events;
      default:
        return events;
    }
  }, [selectedDateFilter, customDate, events]);

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
