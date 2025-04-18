
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import EventURLInput from "@/components/admin/EventURLInput";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Retreat } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";

// Define the event data interface to match what's used in the EventURLInput
interface EventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
  };
  price: number;
  category: string[];
  instructorName?: string;
  image?: string;
  sourceUrl?: string;
  capacity?: number;
  remaining?: number;
}

const DashboardAdmin = () => {
  const [extractedEventData, setExtractedEventData] = useState<EventData | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleEventDataExtracted = (eventData: EventData) => {
    setExtractedEventData(eventData);
    toast.success("Event data extracted successfully!");
  };

  const handlePublishEvent = async () => {
    if (!extractedEventData) return;

    setIsPublishing(true);
    try {
      // Convert the extracted data to the format expected by the retreats collection
      const retreatData: Partial<Retreat> = {
        title: extractedEventData.title,
        description: extractedEventData.description,
        image: extractedEventData.image || "https://images.unsplash.com/photo-1518002171953-a080ee817e1f", // Default image if none provided
        additionalImages: [],
        location: {
          name: extractedEventData.location.name,
          address: extractedEventData.location.address || "",
          city: extractedEventData.location.city,
          state: extractedEventData.location.state,
          description: "Location extracted from event URL"
        },
        date: extractedEventData.date,
        time: extractedEventData.time,
        duration: "1 day", // Default duration
        price: extractedEventData.price,
        capacity: extractedEventData.capacity || 20,
        remaining: extractedEventData.remaining || extractedEventData.capacity || 20,
        category: extractedEventData.category,
        amenities: [],
        featured: false,
        isSanghos: true // Mark as Sanghos event
      };

      // Save to database
      const { error } = await supabase
        .from('wellness_events')
        .insert({
          title: extractedEventData.title,
          description: extractedEventData.description,
          event_date: new Date(extractedEventData.date),
          location: `${extractedEventData.location.name}, ${extractedEventData.location.city}, ${extractedEventData.location.state}`,
          price: extractedEventData.price,
          max_participants: extractedEventData.capacity,
          category: extractedEventData.category[0] || "Wellness"
        });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Event published successfully!");
      setExtractedEventData(null);
    } catch (error) {
      console.error("Error publishing event:", error);
      toast.error("Failed to publish event. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Admin Tools</CardTitle>
        <CardDescription>
          Quick tools for event and content management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <EventURLInput onEventDataExtracted={handleEventDataExtracted} />
        
        {extractedEventData && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to Publish</h3>
            <p className="text-muted-foreground mb-4">
              The event "{extractedEventData.title}" is ready to be published to the retreats page.
            </p>
            <Button 
              onClick={handlePublishEvent} 
              disabled={isPublishing}
              className="w-full md:w-auto"
            >
              {isPublishing ? "Publishing..." : "Publish Event"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardAdmin;
