
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Pencil, Trash2, Calendar, Users, DollarSign, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Retreat, instructors } from "@/lib/data";
import { RetreatFormData } from "@/types/community";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface EventManagerProps {
  initialTab?: string;
}

export default function EventManager({ initialTab = "retreats" }: EventManagerProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRetreat, setEditingRetreat] = useState<RetreatFormData | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { isAdmin } = useAdminStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      toast.error("You don't have permission to access this page");
      navigate("/");
      return;
    }
    
    fetchRetreats();
  }, [isAdmin, navigate]);

  const fetchRetreats = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would fetch from Supabase
      // For now, use the sample data from lib/data
      const { retreats: existingRetreats } = await import("@/lib/data");
      setRetreats(existingRetreats);
    } catch (error) {
      console.error("Error fetching retreats:", error);
      toast.error("Failed to load retreats");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRetreat = (retreat: Retreat) => {
    const formattedRetreat: RetreatFormData = {
      id: retreat.id,
      title: retreat.title,
      description: retreat.description,
      image: retreat.image,
      additionalImages: retreat.additionalImages,
      location: retreat.location,
      instructorId: retreat.instructor.id,
      date: retreat.date,
      time: retreat.time,
      duration: retreat.duration,
      price: retreat.price,
      capacity: retreat.capacity,
      category: retreat.category,
      amenities: retreat.amenities,
      featured: retreat.featured,
      isSanghos: retreat.isSanghos
    };
    
    setEditingRetreat(formattedRetreat);
  };

  const handleCreateRetreat = () => {
    // Set up a new empty retreat form
    setEditingRetreat({
      title: "",
      description: "",
      image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f", // Default image
      location: {
        name: "",
        address: "",
        city: "",
        state: "",
        description: ""
      },
      instructorId: instructors[0].id,
      date: format(new Date(), "yyyy-MM-dd"),
      time: "10:00 AM - 4:00 PM",
      duration: "1 day",
      price: 99,
      capacity: 20,
      category: ["Wellness"],
      featured: false,
      isSanghos: true
    });
  };

  const handleSaveRetreat = async () => {
    if (!editingRetreat) return;
    
    // Validate form
    const errors: Record<string, string> = {};
    if (!editingRetreat.title) errors.title = "Title is required";
    if (!editingRetreat.description) errors.description = "Description is required";
    if (!editingRetreat.location.name) errors.locationName = "Location name is required";
    if (!editingRetreat.date) errors.date = "Date is required";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // In a real app, this would update Supabase
      toast.success(editingRetreat.id ? "Retreat updated!" : "New retreat created!");
      setEditingRetreat(null);
      fetchRetreats(); // Refresh the list
    } catch (error) {
      console.error("Error saving retreat:", error);
      toast.error("Failed to save retreat");
    }
  };

  const handleDeleteRetreat = async (retreatId: string) => {
    if (!confirm("Are you sure you want to delete this retreat?")) return;
    
    try {
      // In a real app, this would call Supabase
      toast.success("Retreat deleted!");
      fetchRetreats(); // Refresh the list
    } catch (error) {
      console.error("Error deleting retreat:", error);
      toast.error("Failed to delete retreat");
    }
  };

  const handleCancelEdit = () => {
    setEditingRetreat(null);
    setFormErrors({});
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Event Management</CardTitle>
        <CardDescription>Create and manage retreats and events</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="retreats">Retreats</TabsTrigger>
            <TabsTrigger value="events">Community Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="retreats" className="space-y-4">
            {!editingRetreat ? (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">All Retreats</h3>
                  <Button onClick={handleCreateRetreat}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Retreat
                  </Button>
                </div>
                
                {isLoading ? (
                  <div className="text-center py-8">Loading retreats...</div>
                ) : (
                  <div className="space-y-4">
                    {retreats.map((retreat) => (
                      <Card key={retreat.id} className="overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/4 h-40 md:h-auto">
                            <img 
                              src={retreat.image} 
                              alt={retreat.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 md:w-3/4 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl font-medium">{retreat.title}</h3>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(retreat.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {retreat.capacity} capacity
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  ${retreat.price}
                                </div>
                                {retreat.featured && (
                                  <div className="bg-brand-subtle/20 text-brand-primary px-2 py-0.5 rounded-full">
                                    Featured
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {retreat.category.map((cat) => (
                                  <div 
                                    key={cat} 
                                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                                  >
                                    {cat}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button variant="outline" size="sm" onClick={() => handleEditRetreat(retreat)}>
                                <Pencil className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeleteRetreat(retreat.id)}>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    {editingRetreat.id ? "Edit Retreat" : "Create New Retreat"}
                  </h3>
                  <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title" 
                        value={editingRetreat.title}
                        onChange={(e) => setEditingRetreat({...editingRetreat, title: e.target.value})}
                        className={formErrors.title ? "border-red-500" : ""}
                      />
                      {formErrors.title && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input 
                        id="image" 
                        value={editingRetreat.image}
                        onChange={(e) => setEditingRetreat({...editingRetreat, image: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={editingRetreat.description}
                      onChange={(e) => setEditingRetreat({...editingRetreat, description: e.target.value})}
                      rows={4}
                      className={formErrors.description ? "border-red-500" : ""}
                    />
                    {formErrors.description && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="locationName">Location Name</Label>
                      <Input 
                        id="locationName" 
                        value={editingRetreat.location.name}
                        onChange={(e) => setEditingRetreat({
                          ...editingRetreat, 
                          location: {...editingRetreat.location, name: e.target.value}
                        })}
                        className={formErrors.locationName ? "border-red-500" : ""}
                      />
                      {formErrors.locationName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.locationName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="locationAddress">Address</Label>
                      <Input 
                        id="locationAddress" 
                        value={editingRetreat.location.address}
                        onChange={(e) => setEditingRetreat({
                          ...editingRetreat, 
                          location: {...editingRetreat.location, address: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        value={editingRetreat.location.city}
                        onChange={(e) => setEditingRetreat({
                          ...editingRetreat, 
                          location: {...editingRetreat.location, city: e.target.value}
                        })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        value={editingRetreat.location.state}
                        onChange={(e) => setEditingRetreat({
                          ...editingRetreat, 
                          location: {...editingRetreat.location, state: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instructor">Instructor</Label>
                      <Select 
                        value={editingRetreat.instructorId}
                        onValueChange={(value) => setEditingRetreat({...editingRetreat, instructorId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an instructor" />
                        </SelectTrigger>
                        <SelectContent>
                          {instructors.map((instructor) => (
                            <SelectItem key={instructor.id} value={instructor.id}>
                              {instructor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input 
                        id="date" 
                        type="date"
                        value={editingRetreat.date}
                        onChange={(e) => setEditingRetreat({...editingRetreat, date: e.target.value})}
                        className={formErrors.date ? "border-red-500" : ""}
                      />
                      {formErrors.date && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time" 
                        value={editingRetreat.time}
                        onChange={(e) => setEditingRetreat({...editingRetreat, time: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input 
                        id="duration" 
                        value={editingRetreat.duration}
                        onChange={(e) => setEditingRetreat({...editingRetreat, duration: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        type="number"
                        value={editingRetreat.price}
                        onChange={(e) => setEditingRetreat({
                          ...editingRetreat, 
                          price: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input 
                        id="capacity" 
                        type="number"
                        value={editingRetreat.capacity}
                        onChange={(e) => setEditingRetreat({
                          ...editingRetreat, 
                          capacity: parseInt(e.target.value) || 0
                        })}
                      />
                    </div>
                    
                    <div>
                      <Label>Categories</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["Yoga", "Meditation", "Wellness", "Hiking", "Nutrition", "Workshop"].map((cat) => (
                          <div key={cat} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`category-${cat}`} 
                              checked={editingRetreat.category.includes(cat)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setEditingRetreat({
                                    ...editingRetreat, 
                                    category: [...editingRetreat.category, cat]
                                  });
                                } else {
                                  setEditingRetreat({
                                    ...editingRetreat, 
                                    category: editingRetreat.category.filter(c => c !== cat)
                                  });
                                }
                              }}
                            />
                            <Label htmlFor={`category-${cat}`}>{cat}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="featured" 
                      checked={editingRetreat.featured}
                      onCheckedChange={(checked) => 
                        setEditingRetreat({...editingRetreat, featured: !!checked})
                      }
                    />
                    <Label htmlFor="featured">Featured Retreat</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isSanghos" 
                      checked={editingRetreat.isSanghos}
                      onCheckedChange={(checked) => 
                        setEditingRetreat({...editingRetreat, isSanghos: !!checked})
                      }
                    />
                    <Label htmlFor="isSanghos">Sanghos Organized Retreat</Label>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveRetreat}>
                      {editingRetreat.id ? "Update Retreat" : "Create Retreat"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="events">
            <div className="flex justify-center items-center p-8">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Community Events Management</h3>
                <p className="text-muted-foreground mb-4">
                  Manage community events in the Events tab of the Community CMS
                </p>
                <Button onClick={() => navigate("/community/cms")}>
                  Go to Community CMS
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
