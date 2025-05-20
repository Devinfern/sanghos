
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ExtractedEventData } from "@/lib/api/forum/events/types";
import { Card } from "@/components/ui/card";

interface EventDataPreviewProps {
  extractedData: ExtractedEventData;
  onEdit: (field: string, value: string) => void;
  onUseData: () => void;
}

const EventDataPreview = ({ extractedData, onEdit, onUseData }: EventDataPreviewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Extracted Event Data</h3>
        <Button onClick={onUseData} size="sm">Use This Data</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Basic Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={extractedData.title}
              onChange={(e) => onEdit('title', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="instructor">Instructor</Label>
            <Input
              id="instructor"
              value={extractedData.instructor}
              onChange={(e) => onEdit('instructor', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={extractedData.date.display}
                onChange={(e) => onEdit('date.display', e.target.value)}
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
        
        {/* Column 2: Details & Image */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={extractedData.description}
              onChange={(e) => onEdit('description', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={extractedData.price}
                onChange={(e) => onEdit('price', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={extractedData.capacity}
                onChange={(e) => onEdit('capacity', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Column 3: Location & Image */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="location-name">Location</Label>
            <Input
              id="location-name"
              value={extractedData.location.name}
              onChange={(e) => onEdit('location.name', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="location-address">Address</Label>
            <Input
              id="location-address"
              value={extractedData.location.address}
              onChange={(e) => onEdit('location.address', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location-city">City</Label>
              <Input
                id="location-city"
                value={extractedData.location.city}
                onChange={(e) => onEdit('location.city', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="location-state">State</Label>
              <Input
                id="location-state"
                value={extractedData.location.state}
                onChange={(e) => onEdit('location.state', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Preview */}
      {extractedData.image && (
        <Card className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={extractedData.image}
              alt="Event"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2070&auto=format&fit=crop";
              }}
            />
          </div>
          <div className="p-3">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={extractedData.image}
              onChange={(e) => onEdit('image', e.target.value)}
              className="mt-1"
            />
          </div>
        </Card>
      )}
      
      <div className="flex justify-end">
        <Button onClick={onUseData}>Use This Event Data</Button>
      </div>
    </div>
  );
};

export default EventDataPreview;
