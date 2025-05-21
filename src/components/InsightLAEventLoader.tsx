
import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useLocation } from 'react-router-dom';
import { fetchInsightLAEvents } from "@/lib/insightEvents";

/**
 * This component helps debug the InsightLA event loading issue
 * It monitors route changes and logs relevant information about InsightLA events
 */
const InsightLAEventLoader: React.FC = () => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  
  useEffect(() => {
    console.log(`Navigation detected: ${previousPath || 'initial'} → ${location.pathname}`);
    
    // Track the previous path for navigation debugging
    setPreviousPath(location.pathname);
    
    // When loading the home page or retreats page, verify InsightLA events can be fetched
    if (location.pathname === '/' || location.pathname === '/retreats') {
      const verifyInsightLAEvents = async () => {
        try {
          console.log("InsightLAEventLoader: Verifying InsightLA events can be loaded...");
          const events = await fetchInsightLAEvents();
          console.log(`InsightLAEventLoader: Successfully fetched ${events.length} InsightLA events`);
          
          if (events.length === 0) {
            toast.warning("Warning: No InsightLA events could be loaded", {
              description: "This may affect event listings on the site",
              duration: 5000,
            });
          }
        } catch (error) {
          console.error("InsightLAEventLoader: Failed to fetch InsightLA events", error);
          toast.error("Failed to load InsightLA events", {
            description: "Please check network connection or try again later",
            duration: 5000,
          });
        }
      };
      
      // Run the verification but don't block the UI
      verifyInsightLAEvents();
    }
  }, [location.pathname]);

  return null; // This is a non-visual component
};

export default InsightLAEventLoader;
