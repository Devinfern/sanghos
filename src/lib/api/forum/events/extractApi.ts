
import { supabase } from "@/integrations/supabase/client";
import { ExtractedEventData } from "./types";
import { transformExtractedToForumEvent } from "./transformers";

/**
 * Extracts event data from a provided URL using the Supabase Edge Function
 */
export const extractEventDataFromUrl = async (url: string): Promise<ExtractedEventData> => {
  console.log("Extracting event data from URL:", url);
  
  try {
    const { data, error } = await supabase.functions.invoke('extract-event-data', {
      body: { url },
    });
    
    if (error) {
      console.error("Function error:", error);
      throw new Error(error.message || "Failed to extract event data");
    }
    
    console.log("Extracted data:", data);
    
    if (!data) {
      throw new Error("No data returned from extraction");
    }
    
    return data as ExtractedEventData;
  } catch (error) {
    console.error("Error extracting event data:", error);
    throw error;
  }
};

/**
 * Extract and transform event data to forum event format
 */
export const extractAndTransformEventData = async (url: string) => {
  const extractedData = await extractEventDataFromUrl(url);
  return transformExtractedToForumEvent(extractedData);
};
