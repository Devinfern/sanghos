
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { extractEventDataFromUrl } from "@/lib/api/forum/events";
import { ExtractedEventData } from "@/lib/api/forum/events/types";

interface EventURLInputProps {
  onEventDataExtracted: (eventData: ExtractedEventData) => void;
}

const EventURLInput = ({ onEventDataExtracted }: EventURLInputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedEventData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await extractEventDataFromUrl(url);
      setExtractedData(data);
      toast.success("Event data extracted successfully!");
    } catch (error) {
      console.error("Error extracting event data:", error);
      setError(error instanceof Error ? error.message : "Failed to extract event data from URL");
      toast.error("Failed to extract event data from URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseData = () => {
    if (extractedData) {
      onEventDataExtracted(extractedData);
      toast.success("Data applied to form!");
      setExtractedData(null);
    }
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

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Quick Event Creation</CardTitle>
        <CardDescription>
          Paste an event URL to automatically extract information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="url"
            placeholder="Paste event URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting...
              </>
            ) : (
              "Extract Event Data"
            )}
          </Button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {extractedData && (
          <div className="mt-6 space-y-6 bg-sage-50 p-4 rounded-md border border-sage-100">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg">Extracted Event Data</h3>
              <p className="text-sm text-muted-foreground">
                Review and edit the extracted information before using it
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={extractedData.title}
                    onChange={(e) => handleEdit('title', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={extractedData.description}
                    onChange={(e) => handleEdit('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={extractedData.date}
                      onChange={(e) => handleEdit('date', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={extractedData.time}
                      onChange={(e) => handleEdit('time', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="location-name">Location Name</Label>
                  <Input
                    id="location-name"
                    value={extractedData.location.name}
                    onChange={(e) => handleEdit('location.name', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="location-city">City</Label>
                    <Input
                      id="location-city"
                      value={extractedData.location.city || ''}
                      onChange={(e) => handleEdit('location.city', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location-state">State</Label>
                    <Input
                      id="location-state"
                      value={extractedData.location.state || ''}
                      onChange={(e) => handleEdit('location.state', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={extractedData.price || 0}
                    onChange={(e) => handleEdit('price', e.target.value)}
                  />
                </div>

                {extractedData.image && (
                  <div className="mt-3">
                    <Label>Event Image</Label>
                    <div className="h-24 rounded-md overflow-hidden bg-gray-100 mt-1">
                      <img 
                        src={extractedData.image} 
                        alt="Event" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <Button onClick={handleUseData} className="w-full md:w-auto">
                Use This Data
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventURLInput;
