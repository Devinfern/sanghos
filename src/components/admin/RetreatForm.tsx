import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface RetreatFormProps {
  retreatData?: any;
  onComplete: () => void;
}

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please enter a valid image URL"),
  location_name: z.string().min(2, "Location name is required"),
  location_address: z.string().optional(),
  location_city: z.string().min(1, "City is required"),
  location_state: z.string().min(1, "State is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().min(0, "Price must be a positive number"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  remaining: z.number().min(0, "Remaining spots must be a positive number"),
  category: z.array(z.string()).min(1, "Select at least one category"),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const RetreatForm = ({ retreatData, onComplete }: RetreatFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories] = useState([
    "meditation", "yoga", "wellness", "nature", "spiritual"
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      location_name: "",
      location_address: "",
      location_city: "",
      location_state: "",
      date: "",
      time: "",
      duration: "",
      price: 0,
      capacity: 10,
      remaining: 10,
      category: [],
      featured: false,
    },
  });

  useEffect(() => {
    if (retreatData) {
      form.reset({
        title: retreatData.title || "",
        description: retreatData.description || "",
        image: retreatData.image || "",
        location_name: retreatData.location_name || "",
        location_address: retreatData.location_address || "",
        location_city: retreatData.location_city || "",
        location_state: retreatData.location_state || "",
        date: retreatData.date || "",
        time: retreatData.time || "",
        duration: retreatData.duration || "",
        price: retreatData.price || 0,
        capacity: retreatData.capacity || 10,
        remaining: retreatData.remaining || 10,
        category: retreatData.category || [],
        featured: retreatData.featured || false,
      });
    }
  }, [retreatData, form]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast.error("You must be logged in to create or edit retreats");
        return;
      }

      const userId = session.session.user.id;
      const retreatData = {
        ...values,
        user_id: userId,
      };

      if (retreatData && retreatData.id) {
        // Update existing retreat
        const { data, error } = await supabase
          .from('retreats')
          .update(retreatData)
          .eq('id', retreatData.id);
        
        if (error) throw error;
        toast.success("Retreat updated successfully");
      } else {
        // Create new retreat
        const { data, error } = await supabase
          .from('retreats')
          .insert([retreatData]);
        
        if (error) throw error;
        toast.success("Retreat created successfully");
      }
      
      onComplete();
    } catch (error) {
      console.error("Error saving retreat:", error);
      toast.error("Failed to save retreat");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{retreatData ? "Edit Retreat" : "Create New Retreat"}</CardTitle>
        <CardDescription>
          {retreatData 
            ? "Update the retreat information below" 
            : "Fill in the details to create a new retreat"}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retreat Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter retreat title" {...field} />
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
                      <Input placeholder="Enter image URL" {...field} />
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
                      placeholder="Describe the retreat experience" 
                      className="min-h-[120px]" 
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
                      <Input placeholder="e.g. Mountain Zen Center" {...field} />
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
                    <FormLabel>Address (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
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
                      <Input placeholder="City" {...field} />
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
                      <Input placeholder="State" {...field} />
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
                      <Input placeholder="e.g. June 15, 2025" {...field} />
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
                      <Input placeholder="e.g. 2:00 PM" {...field} />
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
                      <Input placeholder="e.g. 3 days" {...field} />
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
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field} 
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
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
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="10" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value, 10))}
                      />
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
                    <FormLabel>Spots Remaining</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="10" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        type="button"
                        variant={field.value.includes(category) ? "default" : "outline"}
                        onClick={() => {
                          const newCategories = field.value.includes(category)
                            ? field.value.filter(c => c !== category)
                            : [...field.value, category];
                          field.onChange(newCategories);
                        }}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Featured Retreat</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Featured retreats will be highlighted on the homepage
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => onComplete()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : retreatData ? "Update Retreat" : "Create Retreat"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RetreatForm;
