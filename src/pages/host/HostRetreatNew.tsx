
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HostHeader from "@/components/HostHeader";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const HostRetreatNew = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      <HostHeader />
      <div className="flex-1 container px-4 md:px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Retreat</h1>
          <p className="text-muted-foreground">Fill in the details for your new retreat</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Retreat Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="retreatForm" onSubmit={handleSubmit} className="space-y-6">
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
              onClick={() => navigate("/host/retreats")}
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
      </div>
    </div>
  );
};

export default HostRetreatNew;
