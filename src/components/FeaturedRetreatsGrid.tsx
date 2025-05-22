
import React, { useState, useEffect } from "react";
import { retreats } from "@/lib/data";
import { fetchInsightLAEvents } from "@/lib/insightEvents";
import RetreatCard from "./RetreatCard";
import { ensureValidCategory } from "@/utils/categoryUtils";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

const FeaturedRetreatsGrid: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredRetreats, setFeaturedRetreats] = useState([]);
  
  // Use effect to load retreats
  useEffect(() => {
    const loadRetreats = async () => {
      try {
        // Load retreats from Sanghos
        const sanghosRetreats = await retreats;
        
        // Load InsightLA events
        const insightLARetreats = await fetchInsightLAEvents().catch(err => {
          console.error("Failed to load InsightLA retreats:", err);
          return [];
        });
        
        // Filter for featured retreats from both sources
        const featuredSanghosRetreats = sanghosRetreats.filter(r => r.featured);
        const featuredInsightLARetreats = insightLARetreats.filter(r => r.featured);
        
        // Combine both sources
        const allFeaturedRetreats = [...featuredSanghosRetreats, ...featuredInsightLARetreats];
        
        setFeaturedRetreats(allFeaturedRetreats);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading featured retreats:", error);
        setIsLoading(false);
      }
    };
    
    loadRetreats();
  }, []);

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
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Featured Retreats
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our hand-picked selection of transformative wellness retreats, chosen for their outstanding settings and expert instructors.
          </p>
        </motion.div>
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
