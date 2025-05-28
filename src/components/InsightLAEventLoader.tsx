
import React, { useEffect, useState } from 'react';
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
          
          // Only attempt to load a maximum of 2 times to avoid spam
          if (loadAttempts >= 2) {
            console.log("InsightLAEventLoader: Maximum load attempts reached");
            return;
          }
          
          const events = await fetchInsightLAEvents();
          console.log(`InsightLAEventLoader: Successfully fetched ${events.length} InsightLA events`);
          
          // Only log fallback usage, don't show toast warnings
          if (events.some(event => event.source?.includes("Fallback"))) {
            console.log("InsightLAEventLoader: Using some fallback InsightLA event data");
          }
        } catch (error) {
          console.error("InsightLAEventLoader: Failed to fetch InsightLA events", error);
        }
      };
      
      // Run the verification but don't block the UI
      verifyInsightLAEvents();
    }
  }, [location.pathname]);

  return null; // This is a non-visual component
};

export default InsightLAEventLoader;
