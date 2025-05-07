
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Form schema
const retreatFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Must be a valid URL"),
  location_name: z.string().min(3, "Location name is required"),
  location_address: z.string().optional(),
  location_city: z.string().min(1, "City is required"),
  location_state: z.string().min(1, "State is required"),
  location_description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  capacity: z.coerce.number().int().positive("Capacity must be a positive number"),
  remaining: z.coerce.number().int().min(0, "Remaining spots must be 0 or greater"),
  category: z.array(z.string()).nonempty("Select at least one category"),
  featured: z.boolean().default(false),
  is_sanghos: z.boolean().default(true)
});

type RetreatFormValues = z.infer<typeof retreatFormSchema>;

interface RetreatFormProps {
  retreatData?: any;
  onComplete: () => void;
}

const RETREAT_CATEGORIES = [
  "Yoga", 
  "Meditation", 
  "Wellness", 
  "Hiking", 
  "Nutrition", 
  "Workshop", 
  "Spiritual",
  "Fitness",
  "Mindfulness"
];

const RetreatForm = ({ retreatData, onComplete }: RetreatFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!retreatData;
  
  // Initialize the form
  const form = useForm<RetreatFormValues>({
    resolver: zodResolver(retreatFormSchema),
    defaultValues: retreatData ? {
      ...retreatData,
      price: parseFloat(retreatData.price || 0),
      capacity: parseInt(retreatData.capacity || 20),
      remaining: parseInt(retreatData.remaining || 20),
      category: retreatData.category || []
    } : {
      title: "",
      description: "",
      image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f",
      location_name: "",
      location_address: "",
      location_city: "",
      location_state: "",
      location_description: "",
      date: new Date().toISOString().split('T')[0],
      time: "10:00 AM - 4:00 PM",
      duration: "1 day",
      price: 99,
      capacity: 20,
      remaining: 20,
      category: ["Wellness"],
      featured: false,
      is_sanghos: true
    }
  });

  // Form submission handler
  const onSubmit = async (values: RetreatFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      if (!sessionData.session) {
        toast.error("You must be logged in to create or edit retreats");
        return;
      }
      
      const userId = sessionData.session.user.id;
      
      // Format data for Supabase
      const retreatData = {
        ...values,
        user_id: userId
      };

      let result;
      
      if (isEditing) {
        const { data, error } = await supabase
          .from('retreats')
          .update(retreatData)
          .eq('id', retreatData.id);
          
        result = { data, error };
        
        if (error) throw error;
        toast.success("Retreat updated successfully!");
      } else {
        const { data, error } = await supabase
          .from('retreats')
          .insert(retreatData)
          .select();
          
        result = { data, error };
        
        if (error) throw error;
        toast.success("Retreat created successfully!");
      }
      
      onComplete();
    } catch (error: any) {
      console.error("Error saving retreat:", error);
      toast.error(error.message || "Failed to save retreat");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Retreat" : "Create New Retreat"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Wellness Weekend Retreat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your retreat in detail"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Sacred Grove Retreat Center" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Mountain Way" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Sedona" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location_state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="AZ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input placeholder="10:00 AM - 4:00 PM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="3 days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="remaining"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remaining Spots</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {RETREAT_CATEGORIES.map((category) => (
                      <FormField
                        key={category}
                        control={form.control}
                        name="category"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, category])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== category
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {category}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Retreat</FormLabel>
                      <FormDescription>
                        Featured retreats are highlighted on the homepage
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_sanghos"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Sanghos Organized</FormLabel>
                      <FormDescription>
                        Is this retreat organized by Sanghos?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onComplete}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isEditing
                    ? "Saving..."
                    : "Creating..."
                  : isEditing
                    ? "Save Retreat"
                    : "Create Retreat"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RetreatForm;
