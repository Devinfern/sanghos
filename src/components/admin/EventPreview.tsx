
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { ExtractedEventData } from "@/lib/api/forum/events/types";

interface EventPreviewProps {
  eventData: ExtractedEventData;
  onUseData: () => void;
  onEdit: (field: string, value: string) => void;
  isPublishing?: boolean;
}

export const EventPreview = ({ eventData, onUseData, onEdit, isPublishing = false }: EventPreviewProps) => {
  // Function to safely get ISO date value
  const getIsoDateValue = () => {
    if (typeof eventData.date === 'object' && eventData.date.iso) {
      // Extract just the date part from the ISO string (YYYY-MM-DD)
      return eventData.date.iso.split('T')[0];
    }
    return '';
  };

  // Function to safely get display date
  const getDisplayDate = () => {
    if (typeof eventData.date === 'object') {
      return eventData.date.display || eventData.date.iso || '';
    }
    return typeof eventData.date === 'string' ? eventData.date : '';
  };

  return (
    <div className="mt-6 space-y-6 bg-sage-50 p-4 rounded-md border border-sage-100">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg">Extracted Event Data</h3>
        <p className="text-sm text-muted-foreground">
          Review and edit the extracted information before publishing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={eventData.title || ''}
              onChange={(e) => onEdit('title', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={eventData.description || ''}
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
                value={getIsoDateValue()}
                onChange={(e) => {
                  // Update both the ISO date and display date
                  const dateObj = new Date(e.target.value);
                  const displayDate = dateObj.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });
                  
                  onEdit('date', JSON.stringify({
                    iso: e.target.value ? new Date(e.target.value).toISOString() : '',
                    display: e.target.value ? displayDate : ''
                  }));
                }}
              />
              {getDisplayDate() && (
                <p className="text-xs text-muted-foreground mt-1">{getDisplayDate()}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={eventData.time || ''}
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
              value={eventData.location?.name || ''}
              onChange={(e) => onEdit('location.name', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location-city">City</Label>
              <Input
                id="location-city"
                value={eventData.location?.city || ''}
                onChange={(e) => onEdit('location.city', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="location-state">State</Label>
              <Input
                id="location-state"
                value={eventData.location?.state || ''}
                onChange={(e) => onEdit('location.state', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={eventData.price || 0}
                onChange={(e) => onEdit('price', e.target.value)}
              />
              {eventData.priceDisplay && (
                <p className="text-xs text-muted-foreground mt-1">{eventData.priceDisplay}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={eventData.capacity || ''}
                onChange={(e) => onEdit('capacity', e.target.value)}
              />
            </div>
          </div>

          {eventData.image && (
            <div className="mt-3">
              <Label>Event Image</Label>
              <div className="h-24 rounded-md overflow-hidden bg-gray-100 mt-1">
                <img 
                  src={eventData.image} 
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
        <Button onClick={onUseData} className="w-full md:w-auto" disabled={isPublishing}>
          {isPublishing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            "Publish Event"
          )}
        </Button>
      </div>
    </div>
  );
};
