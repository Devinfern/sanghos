
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EventURLForm } from "@/components/admin/EventURLForm";
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
  };

  const handlePublishEvent = async () => {
    if (!extractedEventData) return;

    setIsPublishing(true);
    try {
      // Get the current user's ID for the user_id field
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("You must be logged in to publish events");
      }
      
      // Format the location string
      const locationStr = `${extractedEventData.location?.name || 'Venue TBD'}, ${extractedEventData.location?.city || ''}, ${extractedEventData.location?.state || ''}`.trim().replace(/,\s*$/, '');
      
      // Save to database - using the string date directly from extractedEventData
      const { error } = await supabase
        .from('wellness_events')
        .insert({
          title: extractedEventData.title,
          description: extractedEventData.description || "No description provided",
          event_date: extractedEventData.date, // Using the string date directly
          location: locationStr,
          price: Number(extractedEventData.price) || 0,
          max_participants: Number(extractedEventData.capacity) || 20,
          category: extractedEventData.category?.[0] || "Wellness",
          user_id: session.user.id
        });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Event published successfully!");
      setExtractedEventData(null);
    } catch (error) {
      console.error("Error publishing event:", error);
      toast.error(error instanceof Error ? error.message : "Failed to publish event. Please try again.");
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
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Quick Event Creation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Paste an event URL to extract information and quickly create a new event
          </p>
          <EventURLForm onEventDataExtracted={handleEventDataExtracted} />
        </div>
        
        {extractedEventData && (
          <EventPreview
            eventData={extractedEventData}
            onUseData={handlePublishEvent}
            isPublishing={isPublishing}
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
