
import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { supabase } from "@/integrations/supabase/client";
import { loadForumEvents } from "@/lib/api/forum/events";
import { fetchSanghosRetreats } from "@/lib/data";
import { fetchInsightLAEvents } from "@/lib/insightEvents";
import {
  transformSanghosRetreatToEvent,
  transformForumEvent,
  transformInsightLARetreatToEvent
} from "@/lib/transformers/eventTransformers";

/**
 * Hook to fetch events from multiple sources
 */
export function useEvents(location: string = "San Francisco, CA") {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Track that the component has mounted
    setMounted(true);
    console.log('useEvents: useEffect triggered - Initial mount');
    
    const fetchEvents = async () => {
      // Set loading state at the beginning
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`useEvents: Fetching events for location: ${location}`);
        console.log('useEvents: Starting concurrent data fetching');
        
        // Use Promise.allSettled to prevent one failure from blocking others
        const results = await Promise.allSettled([
          fetchSanghosRetreats(),
          loadForumEvents(),
          fetchInsightLAEvents()
        ]);
        
        console.log('useEvents: All data sources fetched, processing results');
        
        // Process results from Promise.allSettled
        let sanghoRetreats = [];
        let forumEvents = [];
        let insightLARetreats = [];
        
        // Extract Sanghos retreats (first promise result)
        if (results[0].status === 'fulfilled') {
          sanghoRetreats = results[0].value || [];
          console.log(`useEvents: Received ${sanghoRetreats?.length || 0} Sanghos retreats`);
        } else {
          console.error('useEvents: Failed to fetch Sanghos retreats:', results[0].reason);
        }
        
        // Extract forum events (second promise result)
        if (results[1].status === 'fulfilled') {
          forumEvents = results[1].value || [];
          console.log(`useEvents: Received ${forumEvents?.length || 0} forum events`);
        } else {
          console.error('useEvents: Failed to fetch forum events:', results[1].reason);
        }
        
        // Extract InsightLA events (third promise result)
        if (results[2].status === 'fulfilled') {
          insightLARetreats = results[2].value || [];
          console.log(`useEvents: Received ${insightLARetreats?.length || 0} InsightLA events`);
        } else {
          console.error('useEvents: Failed to fetch InsightLA events:', results[2].reason);
        }
        
        // 1. Process featured retreats - explicitly filter the actual loaded data
        const featuredRetreats = sanghoRetreats.filter(retreat => retreat.featured);
        console.log(`useEvents: Found ${featuredRetreats.length} featured retreats after filtering`);
        
        // Transform each data source to Event format
        const transformedRetreats = featuredRetreats.map(transformSanghosRetreatToEvent);
        console.log(`useEvents: Transformed ${transformedRetreats.length} featured retreats`);
        
        // 2. Process forum events
        let transformedForumEvents: Event[] = [];
        if (forumEvents && forumEvents.length > 0) {
          transformedForumEvents = forumEvents.map(transformForumEvent);
          console.log(`useEvents: Transformed ${transformedForumEvents.length} forum events`);
        }
        
        // 3. Process InsightLA events
        let transformedInsightLAEvents: Event[] = [];
        if (insightLARetreats && insightLARetreats.length > 0) {
          console.log('useEvents: Processing InsightLA events data', insightLARetreats);
          transformedInsightLAEvents = insightLARetreats.map(transformInsightLARetreatToEvent);
          console.log(`useEvents: Transformed ${transformedInsightLAEvents.length} InsightLA events`);
        } else {
          console.warn('useEvents: No InsightLA events were loaded');
        }
        
        // Combine all events
        const allEvents = [...transformedRetreats, ...transformedForumEvents, ...transformedInsightLAEvents];
        console.log(`useEvents: Total events loaded: ${allEvents.length}`);
        
        if (allEvents.length === 0) {
          console.warn('useEvents: No events were loaded from any source');
        }
        
        setEvents(allEvents);
      } catch (err: any) {
        console.error("useEvents: Error fetching events:", err);
        setError(`Failed to fetch events: ${err.message}`);
        setEvents([]);
      } finally {
        // Always set loading to false when done, regardless of success or failure
        setIsLoading(false);
        console.log('useEvents: Fetching complete, isLoading set to false');
      }
    };
    
    fetchEvents();
    
    // Cleanup function
    return () => {
      console.log('useEvents: Component unmounting');
    };
  }, [location]); // Only re-run if location changes

  return { events, isLoading, error };
}
