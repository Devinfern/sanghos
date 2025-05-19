
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ExtractedEventData } from "@/lib/api/forum/events/types";
import EventURLForm from "./EventURLForm";
import EventDataError from "./EventDataError";
import EventDataPreview from "./EventDataPreview";

interface EventURLInputProps {
  onEventDataExtracted: (eventData: ExtractedEventData) => void;
}

const EventURLInput = ({ onEventDataExtracted }: EventURLInputProps) => {
  const [extractedData, setExtractedData] = useState<ExtractedEventData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDataExtracted = (data: ExtractedEventData) => {
    setError(null);
    setExtractedData(data);
    toast.success("Event data extracted successfully!");
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    toast.error("Failed to extract event data from URL");
  };

  const handleEdit = (field: string, value: string) => {
    if (extractedData) {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (parent === 'location' && typeof extractedData.location === 'object') {
          setExtractedData({
            ...extractedData,
            location: {
              ...extractedData.location,
              [child]: value
            }
          });
        }
      } else {
        setExtractedData({
          ...extractedData,
          [field]: value
        });
      }
    }
  };

  const handleUseData = () => {
    if (extractedData) {
      onEventDataExtracted(extractedData);
      toast.success("Data applied to form!");
      setExtractedData(null);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Quick Event Creation</CardTitle>
        <CardDescription>
          Paste an event URL to automatically extract information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <EventURLForm 
          onDataExtracted={handleDataExtracted} 
          onError={handleError} 
        />
        
        <EventDataError error={error} />
        
        {extractedData && (
          <EventDataPreview 
            extractedData={extractedData} 
            onEdit={handleEdit} 
            onUseData={handleUseData} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EventURLInput;
