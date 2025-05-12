
import { supabase } from "@/integrations/supabase/client";
import { ForumCategory, ForumSpace } from "../types";
import { defaultForumSpaces } from "../../data/defaultCommunityData";

// State variable to store the current data
export let forumSpaces = [...defaultForumSpaces];

// Function to load forum spaces from Supabase
export const loadForumSpaces = async () => {
  try {
    const { data, error } = await supabase
      .from('forum_spaces')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error loading forum spaces:', error);
      return;
    }
    
    if (data && data.length > 0) {
      // Transform data to match our format
      const categorizedSpaces: any = {};
      
      data.forEach(space => {
        if (!categorizedSpaces[space.category]) {
          categorizedSpaces[space.category] = [];
        }
        
        categorizedSpaces[space.category].push({
          name: space.name,
          icon: space.icon,
          count: space.count
        });
      });
      
      const transformedSpaces = Object.keys(categorizedSpaces).map(category => ({
        name: category,
        spaces: categorizedSpaces[category]
      }));
      
      forumSpaces = transformedSpaces;
    } else {
      // If no data, seed the database with our initial data
      await seedForumSpaces();
    }
  } catch (error) {
    console.error('Error in loadForumSpaces:', error);
  }
};

// Seed function to populate the database with initial data
export const seedForumSpaces = async () => {
  try {
    const spacesToInsert = [];
    
    for (const category of defaultForumSpaces) {
      for (const space of category.spaces) {
        spacesToInsert.push({
          name: space.name,
          category: category.name,
          icon: space.icon,
          count: space.count
        });
      }
    }
    
    const { error } = await supabase
      .from('forum_spaces')
      .insert(spacesToInsert);
      
    if (error) {
      console.error('Error seeding forum spaces:', error);
    }
  } catch (error) {
    console.error('Error in seedForumSpaces:', error);
  }
};

// Update function to modify the data in Supabase
export const updateForumSpaces = async (newSpaces: typeof forumSpaces) => {
  try {
    // First, delete all existing spaces - fixed method that avoids using neq('id', 'dummy')
    const { error: deleteError } = await supabase
      .from('forum_spaces')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000');
      
    if (deleteError) {
      console.error('Error deleting forum spaces:', deleteError);
      return;
    }
    
    // Then insert the new spaces
    const spacesToInsert = [];
    
    for (const category of newSpaces) {
      for (const space of category.spaces) {
        spacesToInsert.push({
          name: space.name,
          category: category.name,
          icon: space.icon,
          count: space.count
        });
      }
    }
    
    const { error: insertError } = await supabase
      .from('forum_spaces')
      .insert(spacesToInsert);
      
    if (insertError) {
      console.error('Error updating forum spaces:', insertError);
      return;
    }
    
    // Update the local variable
    forumSpaces = [...newSpaces];
    
    console.log('Forum spaces updated successfully:', spacesToInsert.length, 'spaces inserted');
    
    // Reload the data
    await loadForumSpaces();
  } catch (error) {
    console.error('Error in updateForumSpaces:', error);
  }
};
