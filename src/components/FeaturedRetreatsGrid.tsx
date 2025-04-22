
import React from "react";
import { retreats } from "@/lib/data";
import RetreatCard from "./RetreatCard";

const FeaturedRetreatsGrid: React.FC = () => {
  // Only show retreats marked as featured
  const featuredRetreats = retreats.filter(r => r.featured);

  if (featuredRetreats.length === 0) {
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
          {featuredRetreats.map((retreat, idx) => (
            <RetreatCard key={retreat.id} retreat={retreat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRetreatsGrid;
