
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EventURLForm } from "@/components/admin/EventURLForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Retreat } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";
import { convertEventDataToRetreat } from "@/lib/eventUtils";
import { EventPreview } from "@/components/admin/EventPreview";

// Define the event data interface to match what's used in the EventURLForm
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
      const retreatData = convertEventDataToRetreat(extractedEventData);

      // Get the current user's ID for the user_id field
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("You must be logged in to publish events");
      }
      
      // Format the location string
      const locationStr = `${extractedEventData.location.name}, ${extractedEventData.location.city}, ${extractedEventData.location.state}`;
      
      // Convert date to string format if it's not already
      const eventDate = extractedEventData.date;
      
      // Save to database
      const { error } = await supabase
        .from('wellness_events')
        .insert({
          title: extractedEventData.title,
          description: extractedEventData.description,
          event_date: eventDate, // Using the string date directly
          location: locationStr,
          price: extractedEventData.price,
          max_participants: extractedEventData.capacity || 20,
          category: extractedEventData.category[0] || "Wellness",
          user_id: session.user.id
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
        <EventURLForm onEventDataExtracted={handleEventDataExtracted} />
        
        {extractedEventData && (
          <EventPreview
            eventData={extractedEventData}
            onUseData={handlePublishEvent}
            onEdit={(field, value) => {
              setExtractedEventData(prev => {
                if (!prev) return prev;
                
                if (field.includes('.')) {
                  const [parent, child] = field.split('.');
                  if (parent === 'location') {
                    return {
                      ...prev,
                      location: {
                        ...prev.location,
                        [child]: value
                      }
                    };
                  }
                }
                
                return {
                  ...prev,
                  [field]: field === 'price' || field === 'capacity' ? Number(value) : value
                };
              });
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardAdmin;
