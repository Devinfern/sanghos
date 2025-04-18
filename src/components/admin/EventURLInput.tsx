
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { EventURLForm } from "./EventURLForm";
import { EventPreview } from "./EventPreview";

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

interface EventURLInputProps {
  onEventDataExtracted: (eventData: EventData) => void;
}

const EventURLInput = ({ onEventDataExtracted }: EventURLInputProps) => {
  const [extractedData, setExtractedData] = useState<EventData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEventDataExtracted = (data: EventData) => {
    setError(null);
    setExtractedData(data);
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
        <EventURLForm onEventDataExtracted={handleEventDataExtracted} />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {extractedData && (
          <EventPreview 
            eventData={extractedData}
            onUseData={handleUseData}
            onEdit={handleEdit}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EventURLInput;
