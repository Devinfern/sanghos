
import { insightRetreatData } from "@/lib/data/insightRetreatData";

export const fetchInsightLAEvents = async (): Promise<any[]> => {
  try {
    console.log("fetchInsightLAEvents: Loading InsightLA events...");
    
    console.log(`fetchInsightLAEvents: Loaded ${insightRetreatData.length} InsightLA retreat events`);
    return insightRetreatData;
  } catch (error) {
    console.error("fetchInsightLAEvents: Error loading InsightLA events", error);
    return [];
  }
};
