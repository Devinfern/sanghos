
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EventURLForm } from "@/components/admin/EventURLForm";
import { toast } from "sonner";
import { Retreat } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";
import { convertEventDataToRetreat } from "@/lib/eventUtils";
import { EventPreview } from "@/components/admin/EventPreview";
import { AlertCircle, AlertTriangle } from "lucide-react";

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
  const [urlFormError, setUrlFormError] = useState<string | null>(null);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState<boolean | null>(null);

  // Check if FIRECRAWL_API_KEY is configured
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('extract-event-data', {
          body: { check: 'api_key' }
        });
        if (error || !data?.configured) {
          console.warn("FIRECRAWL_API_KEY may not be configured:", error);
          setIsApiKeyConfigured(false);
        } else {
          setIsApiKeyConfigured(true);
        }
      } catch (e) {
        console.error("Error checking API key:", e);
        setIsApiKeyConfigured(false);
      }
    };
    
    checkApiKey();
  }, []);

  const handleEventDataExtracted = (eventData: EventData) => {
    setUrlFormError(null);
    console.log("Event data received in DashboardAdmin:", eventData);
    setExtractedEventData(eventData);
    
    // Validate essential fields
    const missingFields = [];
    if (!eventData.title) missingFields.push('title');
    if (!eventData.date) missingFields.push('date');
    if (!eventData.location?.name) missingFields.push('location');
    
    if (missingFields.length > 0) {
      const warning = `Some important fields are missing: ${missingFields.join(', ')}. You may need to edit these details.`;
      toast.warning(warning);
    }
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
      
      console.log("Publishing event with data:", {
        title: extractedEventData.title,
        description: extractedEventData.description,
        event_date: extractedEventData.date,
        location: locationStr,
        price: Number(extractedEventData.price) || 0,
        max_participants: Number(extractedEventData.capacity) || 20,
        category: extractedEventData.category?.[0] || "Wellness",
        user_id: session.user.id
      });
      
      // Save to database - using the string date directly from extractedEventData
      const { error, data } = await supabase
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
        console.error("Supabase error when publishing:", error);
        throw new Error(error.message);
      }

      console.log("Event published successfully:", data);
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
          
          {isApiKeyConfigured === false && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-600">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <p className="font-medium">Firecrawl API Key Not Configured</p>
              </div>
              <p className="text-sm">
                The Firecrawl API key appears to be missing or invalid. Contact your administrator to set up the FIRECRAWL_API_KEY in Supabase Edge Function secrets.
              </p>
            </div>
          )}
          
          <EventURLForm onEventDataExtracted={handleEventDataExtracted} />
          
          {urlFormError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4" />
                <p className="font-medium">Error extracting event data</p>
              </div>
              <p className="text-sm">{urlFormError}</p>
            </div>
          )}
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
