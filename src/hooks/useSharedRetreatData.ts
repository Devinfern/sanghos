import { useState, useEffect, useMemo } from 'react';
import { fetchSanghosRetreats } from '@/lib/data';
import { fetchInsightLAEvents } from '@/lib/insightEvents';
import { transformSanghosRetreatToEvent, transformInsightLARetreatToEvent } from '@/lib/transformers/eventTransformers';
import { filterPastRetreats } from '@/lib/utils/dateUtils';
import { Event } from '@/types/event';

export interface SharedRetreatData {
  // Raw retreat data (original format)
  allRetreats: any[];
  sanghoRetreats: any[];
  insightLARetreats: any[];
  
  // Transformed event data
  allEvents: Event[];
  featuredEvents: Event[];
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

export const useSharedRetreatData = (): SharedRetreatData => {
  const [allRetreats, setAllRetreats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all data sources
        const [sanghosData, insightLAData] = await Promise.allSettled([
          fetchSanghosRetreats(),
          fetchInsightLAEvents()
        ]);

        // Process Sanghos retreats
        const sanghoRetreats = sanghosData.status === 'fulfilled' 
          ? filterPastRetreats(sanghosData.value) 
          : [];

        // Process InsightLA retreats
        const insightLARetreats = insightLAData.status === 'fulfilled' 
          ? filterPastRetreats(insightLAData.value) 
          : [];

        // Note: Forum events are handled separately in useEvents hook

        // Combine all retreats
        const combinedRetreats = [...sanghoRetreats, ...insightLARetreats];
        setAllRetreats(combinedRetreats);

        // Handle any errors
        if (sanghosData.status === 'rejected' || insightLAData.status === 'rejected') {
          console.warn('Some data sources failed to load');
        }
      } catch (err) {
        console.error('Error loading retreat data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load retreat data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Computed values
  const computedData = useMemo(() => {
    const sanghoRetreats = allRetreats.filter(retreat => retreat.isSanghos);
    const insightLARetreats = allRetreats.filter(retreat => !retreat.isSanghos);

    // Transform retreats to events
    const sanghoEvents = sanghoRetreats.map(transformSanghosRetreatToEvent);
    const insightLAEvents = insightLARetreats.map(transformInsightLARetreatToEvent);
    
    // Combine all events
    const allEvents = [...sanghoEvents, ...insightLAEvents];
    
    // Filter featured events (those marked as featured)
    const featuredEvents = allEvents.filter(event => 
      event.featured || 
      allRetreats.find(retreat => retreat.id === event.id)?.featured
    );

    return {
      sanghoRetreats,
      insightLARetreats,
      allEvents,
      featuredEvents
    };
  }, [allRetreats]);

  return {
    allRetreats,
    sanghoRetreats: computedData.sanghoRetreats,
    insightLARetreats: computedData.insightLARetreats,
    allEvents: computedData.allEvents,
    featuredEvents: computedData.featuredEvents,
    isLoading,
    error
  };
};