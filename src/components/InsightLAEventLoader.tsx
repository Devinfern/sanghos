
import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useLocation } from 'react-router-dom';
import { fetchInsightLAEvents } from "@/lib/insightEvents";

/**
 * This component monitors routes and ensures InsightLA events are properly loaded
 * It provides debugging and error recovery for InsightLA event loading
 */
const InsightLAEventLoader: React.FC = () => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [hasShownError, setHasShownError] = useState(false);
  
  useEffect(() => {
    console.log(`Navigation detected: ${previousPath || 'initial'} → ${location.pathname}`);
    
    // Track the previous path for navigation debugging
    setPreviousPath(location.pathname);
    
    // When loading the home page or retreats page, verify InsightLA events can be fetched
    if (location.pathname === '/' || location.pathname === '/retreats') {
      const verifyInsightLAEvents = async () => {
        try {
          console.log("InsightLAEventLoader: Attempting to fetch InsightLA events...");
          setLoadAttempts(prev => prev + 1);
          
          // Only attempt to load a maximum of 3 times
          if (loadAttempts >= 3) {
            console.log("InsightLAEventLoader: Maximum load attempts reached, using fallback data");
            if (!hasShownError) {
              toast.warning("Warning: No InsightLA events could be loaded", {
                description: "Using fallback event data instead",
                duration: 5000,
              });
              setHasShownError(true);
            }
            return;
          }
          
          const events = await fetchInsightLAEvents();
          console.log(`InsightLAEventLoader: Successfully fetched ${events.length} InsightLA events`);
          
          if (events.length === 0) {
            toast.warning("Warning: No InsightLA events could be loaded", {
              description: "This may affect event listings on the site",
              duration: 5000,
            });
          } else if (events.some(event => event.source?.includes("Fallback"))) {
            console.log("InsightLAEventLoader: Some fallback events were used");
            if (!hasShownError) {
              toast.warning("Warning: Using some fallback InsightLA event data", {
                description: "Some events couldn't be loaded from the original source",
                duration: 5000,
              });
              setHasShownError(true);
            }
          }
        } catch (error) {
          console.error("InsightLAEventLoader: Failed to fetch InsightLA events", error);
          if (!hasShownError) {
            toast.error("Failed to load InsightLA events", {
              description: "Using fallback event data instead",
              duration: 5000,
            });
            setHasShownError(true);
          }
        }
      };
      
      // Run the verification but don't block the UI
      verifyInsightLAEvents();
    }
  }, [location.pathname]);

  return null; // This is a non-visual component
};

export default InsightLAEventLoader;
