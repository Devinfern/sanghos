
import { supabase } from "@/integrations/supabase/client";
import { ForumEvent } from "../types";
import { forumEvents, updateEventsState } from "./state";
import { transformDatabaseEvent, transformEventToDatabase } from "./transformers";
import { EventDatabaseSchema } from "./types";

// Function to load forum events from Supabase
export const loadForumEvents = async (): Promise<ForumEvent[]> => {
  try {
    const { data, error } = await (supabase as any)
      .from('forum_events')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error loading forum events:', error);
      return forumEvents;
    }
    
    if (data && data.length > 0) {
      // Transform data to match our format
      const transformedEvents = data.map((event: any) => 
        transformDatabaseEvent(event as EventDatabaseSchema)
      );
      
      updateEventsState(transformedEvents);
      return transformedEvents;
    } else {
      // If no data, seed the database with our initial data
      await seedForumEvents();
      return forumEvents;
    }
  } catch (error) {
    console.error('Error in loadForumEvents:', error);
    return forumEvents;
  }
};

// Seed function to populate the database with initial data
export const seedForumEvents = async (): Promise<void> => {
  try {
    // Transform events one by one and create an array of individual event objects
    const eventsToInsert = forumEvents.map(event => 
      transformEventToDatabase(event)
    );
    
    // Insert each event individually
    for (const eventData of eventsToInsert) {
      const { error } = await (supabase as any)
        .from('forum_events')
        .insert(eventData);
        
      if (error) {
        console.error('Error seeding forum event:', error, eventData);
      }
    }
  } catch (error) {
    console.error('Error in seedForumEvents:', error);
  }
};

// Update function to modify the data in Supabase
export const updateForumEvents = async (newEvents: ForumEvent[]): Promise<void> => {
  try {
    // First, delete all existing events - fixed method that avoids using neq('id', 'dummy')
    const { error: deleteError } = await (supabase as any)
      .from('forum_events')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
      
    if (deleteError) {
      console.error('Error deleting forum events:', deleteError);
      return;
    }
    
    // Transform events and create an array of individual event objects
    const eventsToInsert = newEvents.map(event => 
      transformEventToDatabase(event)
    );
    
    // Insert events one by one
    for (const eventData of eventsToInsert) {
      const { error: insertError } = await (supabase as any)
        .from('forum_events')
        .insert(eventData);
        
      if (insertError) {
        console.error('Error inserting forum event:', insertError, eventData);
      }
    }
    
    // Update the local variable
    updateEventsState(newEvents);
    
    console.log('Forum events updated successfully:', eventsToInsert.length, 'events inserted');
    
    // Reload the data
    await loadForumEvents();
  } catch (error) {
    console.error('Error in updateForumEvents:', error);
  }
};
