
import React, { useState, useEffect } from "react";
import { retreats } from "@/lib/data";
import { allEvents, eventToRetreatFormat } from "@/data/mockEvents"; 
import RetreatCard from "./RetreatCard";
import { ensureValidCategory } from "@/mockEvents";
import { Spinner } from "@/components/ui/spinner";

const FeaturedRetreatsGrid: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use effect to show a loading state while retreats are being loaded
  useEffect(() => {
    // If retreats has more than just the placeholder, we're done loading
    if (retreats.length > 1 || (retreats.length === 1 && retreats[0].id !== "insight-la-1")) {
      setIsLoading(false);
    } else {
      // Check again after a short delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Only show retreats marked as featured
  const featuredSanghosRetreats = retreats.filter(r => r.featured);
  
  // Convert partner events to retreat format and add to featured retreats
  // Ensure events have correctly typed categories first
  const typeSafeEvents = allEvents.map(event => ({
    ...event,
    category: ensureValidCategory(event.category),
    location: {
      ...event.location,
      locationType: event.location.locationType === "venue" ? "venue" : "online"
    }
  }));
  
  // Convert all events to proper retreat format with all required properties
  const partnerRetreats = typeSafeEvents.map(event => eventToRetreatFormat(event));
  
  // Combine both sources of retreats
  const allFeaturedRetreats = [...featuredSanghosRetreats, ...partnerRetreats];

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Spinner className="mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Loading retreats...</h3>
        </div>
      </section>
    );
  }

  if (allFeaturedRetreats.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-medium mb-2">No featured retreats at this time</h3>
          <p className="text-muted-foreground">Check back soon for more wellness experiences.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Featured Retreats
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our hand-picked selection of transformative wellness retreats, chosen for their outstanding settings and expert instructors.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {allFeaturedRetreats.map((retreat, idx) => (
            <RetreatCard key={retreat.id} retreat={retreat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRetreatsGrid;
