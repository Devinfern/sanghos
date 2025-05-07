
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

interface RetreatFormProps {
  isEdit?: boolean;
}

const RetreatForm: React.FC<RetreatFormProps> = ({ isEdit = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { retreatId } = useParams();
  
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(isEdit);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [remaining, setRemaining] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  
  // Category options
  const categoryOptions = ["yoga", "meditation", "wellness", "fitness", "nature", "spiritual", "adventure", "creative"];
  
  // Amenity options
  const amenityOptions = ["wifi", "parking", "food", "tea", "mats", "props", "shower", "pool", "hot tub", "sauna"];
  
  // Fetch retreat data if editing
  useEffect(() => {
    const fetchRetreatData = async () => {
      if (isEdit && retreatId) {
        try {
          const { data, error } = await supabase
            .from("retreats")
            .select("*")
            .eq("id", retreatId)
            .single();
          
          if (error) throw error;
          
          if (data) {
            setTitle(data.title);
            setDescription(data.description);
            setImage(data.image);
            setLocationName(data.location_name);
            setLocationAddress(data.location_address || "");
            setLocationCity(data.location_city);
            setLocationState(data.location_state);
            setDate(data.date);
            setTime(data.time);
            setDuration(data.duration);
            setPrice(data.price.toString());
            setCapacity(data.capacity.toString());
            setRemaining(data.remaining.toString());
            setCategories(data.category || []);
            setAmenities(data.amenities || []);
            setFeatured(data.featured || false);
          }
        } catch (error) {
          console.error("Error fetching retreat data:", error);
          toast.error("Failed to load retreat data");
        } finally {
          setFormLoading(false);
        }
      } else {
        setFormLoading(false);
      }
    };
    
    fetchRetreatData();
  }, [isEdit, retreatId]);
  
  const handleCategoryToggle = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };
  
  const handleAmenityToggle = (amenity: string) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(amenity)
        ? prevAmenities.filter((a) => a !== amenity)
        : [...prevAmenities, amenity]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create or edit retreats");
      return;
    }
    
    if (!title || !description || !image || !locationName || !locationCity || 
        !locationState || !date || !time || !duration || !price || !capacity || 
        !remaining || categories.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const retreatData = {
        user_id: user.id,
        title,
        description,
        image,
        location_name: locationName,
        location_address: locationAddress,
        location_city: locationCity,
        location_state: locationState,
        date,
        time,
        duration,
        price: parseFloat(price),
        capacity: parseInt(capacity),
        remaining: parseInt(remaining),
        category: categories,
        amenities,
        featured,
      };
      
      let result;
      
      if (isEdit && retreatId) {
        result = await supabase
          .from("retreats")
          .update(retreatData)
          .eq("id", retreatId);
      } else {
        result = await supabase
          .from("retreats")
          .insert([retreatData]);
      }
      
      const { error } = result;
      
      if (error) throw error;
      
      toast.success(`Retreat ${isEdit ? "updated" : "created"} successfully!`);
      navigate("/retreat-management");
    } catch (error) {
      console.error("Error saving retreat:", error);
      toast.error(`Failed to ${isEdit ? "update" : "create"} retreat`);
    } finally {
      setLoading(false);
    }
  };
  
  if (formLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        <span className="ml-2">Loading retreat data...</span>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter retreat title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your retreat"
                  rows={6}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image URL"
                  required
                />
                {image && (
                  <div className="mt-2 relative w-full h-40">
                    <img
                      src={image}
                      alt="Retreat preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="location_name">Location Name *</Label>
                <Input
                  id="location_name"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Enter location name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="location_address">Address</Label>
                <Input
                  id="location_address"
                  value={locationAddress}
                  onChange={(e) => setLocationAddress(e.target.value)}
                  placeholder="Enter street address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location_city">City *</Label>
                  <Input
                    id="location_city"
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                    placeholder="Enter city"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="location_state">State *</Label>
                  <Input
                    id="location_state"
                    value={locationState}
                    onChange={(e) => setLocationState(e.target.value)}
                    placeholder="Enter state"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g., 9:00 AM"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 3 hours"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Enter max capacity"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="remaining">Spots Remaining *</Label>
                  <Input
                    id="remaining"
                    type="number"
                    min="0"
                    max={capacity}
                    value={remaining}
                    onChange={(e) => setRemaining(e.target.value)}
                    placeholder="Enter remaining spots"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={featured}
                  onCheckedChange={(checked) => setFeatured(!!checked)}
                />
                <label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Feature this retreat?
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Categories & Amenities</h2>
            <div className="space-y-4">
              <div>
                <Label className="block mb-2">Categories *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {categoryOptions.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={categories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="block mb-2">Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${amenity}`}
                        checked={amenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <label
                        htmlFor={`amenity-${amenity}`}
                        className="text-sm font-medium leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/retreat-management")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Update Retreat" : "Create Retreat"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RetreatForm;
