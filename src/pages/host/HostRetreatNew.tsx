
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HostHeader from "@/components/HostHeader";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";
import RetreatBuilder from "@/components/retreat-builder/RetreatBuilder";

const HostRetreatNew = () => {
  const navigate = useNavigate();
  const [creationMode, setCreationMode] = useState<"builder" | "traditional">("builder");
  
  // Traditional form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTraditionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would save the retreat to the database
      toast.success("Retreat created successfully!");
      navigate("/host/retreats");
    } catch (error) {
      console.error("Error creating retreat:", error);
      toast.error("Failed to create retreat");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBuilderSave = async (retreatData: any) => {
    setIsSubmitting(true);
    
    try {
      console.log("Saving modular retreat:", retreatData);
      // In a real app, this would save the retreat and its modules to the database
      toast.success("Modular retreat created successfully!");
      navigate("/host/retreats");
    } catch (error) {
      console.error("Error creating modular retreat:", error);
      toast.error("Failed to create retreat");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/host/retreats");
  };

  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      <HostHeader />
      <div className="flex-1 container px-4 md:px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Retreat</h1>
          <p className="text-muted-foreground">Choose how you'd like to create your retreat</p>
        </div>

        <Tabs value={creationMode} onValueChange={(value) => setCreationMode(value as "builder" | "traditional")} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Modular Builder (Recommended)
            </TabsTrigger>
            <TabsTrigger value="traditional" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Traditional Form
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">✨ Build Your Retreat with Wellness Modules</h3>
              <p className="text-sm text-blue-700">
                Create a structured retreat by selecting from our library of wellness modules. 
                Perfect for building comprehensive experiences with yoga, meditation, breathwork, and more.
              </p>
            </div>
            
            <RetreatBuilder onSave={handleBuilderSave} onCancel={handleCancel} />
          </TabsContent>
          
          <TabsContent value="traditional">
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-medium text-amber-900 mb-2">📝 Traditional Retreat Form</h3>
              <p className="text-sm text-amber-700">
                Create a retreat using the classic form approach. Good for simple retreats or when you prefer full creative control.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Retreat Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="retreatForm" onSubmit={handleTraditionalSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter retreat title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your retreat"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <DatePicker date={date} setDate={setDate} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="99.00"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="20"
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  form="retreatForm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Retreat"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HostRetreatNew;
