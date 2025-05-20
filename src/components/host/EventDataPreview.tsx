
import { Button } from "@/components/ui/button";
import { ExtractedEventData } from "@/lib/api/forum/events/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface EventDataPreviewProps {
  extractedData: ExtractedEventData;
  onEdit: (field: string, value: string) => void;
  onUseData: () => void;
}

const EventDataPreview = ({ extractedData, onEdit, onUseData }: EventDataPreviewProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Extracted Event Data</h3>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "View Data" : "Edit Data"}
          </Button>
          <Button 
            size="sm"
            onClick={onUseData}
          >
            Use This Data
          </Button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input 
              value={extractedData.title} 
              onChange={(e) => onEdit('title', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea 
              value={extractedData.description} 
              onChange={(e) => onEdit('description', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input 
                value={extractedData.date} 
                onChange={(e) => onEdit('date', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <Input 
                value={extractedData.time} 
                onChange={(e) => onEdit('time', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location Name</label>
              <Input 
                value={extractedData.location.name} 
                onChange={(e) => onEdit('location.name', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input 
                value={extractedData.location.address} 
                onChange={(e) => onEdit('location.address', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input 
                type="number"
                value={extractedData.price.toString()} 
                onChange={(e) => onEdit('price', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Instructor</label>
              <Input 
                value={extractedData.instructor} 
                onChange={(e) => onEdit('instructor', e.target.value)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <img 
                src={extractedData.image} 
                alt={extractedData.title}
                className="w-full h-32 object-cover rounded-md" 
              />
            </div>
            
            <div className="col-span-2">
              <h4 className="font-medium text-lg mb-1">{extractedData.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {extractedData.description}
              </p>
              <div className="text-sm">
                <p><span className="font-medium">Date:</span> {extractedData.date}</p>
                <p><span className="font-medium">Time:</span> {extractedData.time}</p>
                <p><span className="font-medium">Location:</span> {extractedData.location.name}</p>
                <p><span className="font-medium">Price:</span> ${extractedData.price}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDataPreview;
