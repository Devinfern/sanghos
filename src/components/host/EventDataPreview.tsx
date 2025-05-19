
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ExtractedEventData } from "@/lib/api/forum/events/types";

interface EventDataPreviewProps {
  extractedData: ExtractedEventData;
  onEdit: (field: string, value: string) => void;
  onUseData: () => void;
}

const EventDataPreview = ({ extractedData, onEdit, onUseData }: EventDataPreviewProps) => {
  return (
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
              onChange={(e) => onEdit('title', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={extractedData.description}
              onChange={(e) => onEdit('description', e.target.value)}
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
                onChange={(e) => onEdit('date', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={extractedData.time}
                onChange={(e) => onEdit('time', e.target.value)}
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
              onChange={(e) => onEdit('location.name', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location-city">City</Label>
              <Input
                id="location-city"
                value={extractedData.location.city || ''}
                onChange={(e) => onEdit('location.city', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="location-state">State</Label>
              <Input
                id="location-state"
                value={extractedData.location.state || ''}
                onChange={(e) => onEdit('location.state', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={extractedData.price || 0}
              onChange={(e) => onEdit('price', e.target.value)}
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
        <Button onClick={onUseData} className="w-full md:w-auto">
          Use This Data
        </Button>
      </div>
    </div>
  );
};

export default EventDataPreview;
