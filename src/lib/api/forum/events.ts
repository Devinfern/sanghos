
import { supabase } from "@/integrations/supabase/client";
import { ForumEvent } from "../types";
import { defaultForumEvents } from "../../data/defaultCommunityData";

// State variable to store the current data
export let forumEvents = [...defaultForumEvents];

// Function to load forum events from Supabase
export const loadForumEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('forum_events')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error loading forum events:', error);
      return;
    }
    
    if (data && data.length > 0) {
      // Transform data to match our format
      const transformedEvents = data.map(event => ({
        id: event.id,
        date: {
          day: event.date_day,
          month: event.date_month
        },
        title: event.title,
        time: event.time
      }));
      
      forumEvents = transformedEvents;
    } else {
      // If no data, seed the database with our initial data
      await seedForumEvents();
    }
  } catch (error) {
    console.error('Error in loadForumEvents:', error);
  }
};

// Seed function to populate the database with initial data
export const seedForumEvents = async () => {
  try {
    const eventsToInsert = defaultForumEvents.map(event => ({
      title: event.title,
      date_day: event.date.day,
      date_month: event.date.month,
      time: event.time
    }));
    
    const { error } = await supabase
      .from('forum_events')
      .insert(eventsToInsert);
      
    if (error) {
      console.error('Error seeding forum events:', error);
    }
  } catch (error) {
    console.error('Error in seedForumEvents:', error);
  }
};

// Update function to modify the data in Supabase
export const updateForumEvents = async (newEvents: typeof forumEvents) => {
  try {
    // First, delete all existing events - fixed method that avoids using neq('id', 'dummy')
    const { error: deleteError } = await supabase
      .from('forum_events')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
      
    if (deleteError) {
      console.error('Error deleting forum events:', deleteError);
      return;
    }
    
    // Then insert the new events
    const eventsToInsert = newEvents.map(event => ({
      title: event.title,
      date_day: event.date.day,
      date_month: event.date.month,
      time: event.time
    }));
    
    const { error: insertError } = await supabase
      .from('forum_events')
      .insert(eventsToInsert);
      
    if (insertError) {
      console.error('Error updating forum events:', insertError);
      return;
    }
    
    // Update the local variable
    forumEvents = [...newEvents];
    
    console.log('Forum events updated successfully:', eventsToInsert.length, 'events inserted');
    
    // Reload the data
    await loadForumEvents();
  } catch (error) {
    console.error('Error in updateForumEvents:', error);
  }
};
