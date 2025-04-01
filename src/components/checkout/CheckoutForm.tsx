
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Check, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddOn } from "@/pages/CheckoutPage";
import { toast } from "@/components/ui/use-toast";
import { formatCurrency, formatDate } from "@/lib/data";

// Define the form schema with Zod
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  dietaryRestrictions: z.string().optional(),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  emergencyContactName: z.string().min(2, { message: "Emergency contact name is required" }),
  emergencyContactPhone: z.string().min(10, { message: "Valid emergency contact phone is required" }),
  cardNumber: z.string().min(16, { message: "Valid card number is required" }),
  expiryDate: z.string().min(5, { message: "Valid expiry date is required" }),
  cvc: z.string().min(3, { message: "Valid CVC is required" }),
  nameOnCard: z.string().min(2, { message: "Name on card is required" }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  retreat: any; // Use your actual retreat type here
  addOns: AddOn[];
  onAddOnToggle: (id: string) => void;
}

const CheckoutForm = ({ retreat, addOns, onAddOnToggle }: CheckoutFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dietaryRestrictions: "",
      experienceLevel: "beginner",
      emergencyContactName: "",
      emergencyContactPhone: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      nameOnCard: "",
      agreeToTerms: false,
    },
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Booking confirmed!",
        description: "Your payment was successful and your spot has been reserved.",
      });
      navigate(`/booking-confirmation/${retreat.id}`);
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Retreat Summary Section */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Retreat Summary</h2>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden">
                <img 
                  src={retreat.image} 
                  alt={retreat.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{retreat.title}</h3>
                <p className="text-muted-foreground">{formatDate(retreat.date)}</p>
                <p className="text-muted-foreground">{retreat.time}</p>
                <p className="text-muted-foreground">
                  {retreat.location.name}, {retreat.location.city}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participant Information Section */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Participant Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level <span className="text-red-500">*</span></FormLabel>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-4">
              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Restrictions/Preferences</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please list any dietary restrictions or preferences (e.g., vegetarian, gluten-free, allergies)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="emergencyContactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emergencyContactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add-ons Section */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Optional Add-ons</h2>
            
            <div className="space-y-4">
              {addOns.map((addon) => (
                <div 
                  key={addon.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    addon.selected ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="flex items-start">
                    <Checkbox 
                      id={addon.id}
                      checked={addon.selected}
                      onCheckedChange={() => onAddOnToggle(addon.id)}
                      className="mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <label 
                        htmlFor={addon.id}
                        className="font-medium cursor-pointer flex justify-between"
                      >
                        <span>{addon.name}</span>
                        <span>{formatCurrency(addon.price)}</span>
                      </label>
                      <p className="text-muted-foreground text-sm mt-1">{addon.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Information Section */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          {...field}
                          className="pl-10" 
                        />
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nameOnCard"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-3">
                      <FormLabel>Name on Card <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  <span>Secure encryption</span>
                </div>
                <div className="flex gap-2">
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="Amex" className="h-8" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline">Event Waiver</a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <div className="mt-4 bg-sage-50 p-3 rounded-md border border-sage-100 flex items-start">
              <Info className="h-5 w-5 text-sage-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-sage-700">
                By completing this booking, you acknowledge that you have read and understood our cancellation policy, waiver terms, and any COVID-19 related safety protocols.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          type="submit" 
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Confirm Booking & Pay"}
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
