
import React, { useEffect, useState } from 'react';
import { fetchInsightLAEvents } from '@/lib/insightEvents';
import { retreats } from '@/lib/data';

const InsightLAEventLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const insightEvents = await fetchInsightLAEvents();
        
        // Replace the placeholder retreats with the fetched events
        if (insightEvents.length > 0) {
          // This works because we're modifying the array reference that's exported from data.ts
          retreats.length = 0; // Clear the array
          retreats.push(...insightEvents); // Add the new events
        }
      } catch (error) {
        console.error('Failed to load InsightLA events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  // This component doesn't render anything
  return null;
};

export default InsightLAEventLoader;
