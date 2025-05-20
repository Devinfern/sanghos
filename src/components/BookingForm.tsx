
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Event } from "@/types/event";
import { useEventBooking } from "@/hooks/useEventBooking";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface BookingFormProps {
  event: Event;
  onSuccess?: () => void;
}

export default function BookingForm({ event, onSuccess }: BookingFormProps) {
  const { user } = useAuth();
  const { initiateBooking, isLoading, bookingStep, nextStep, prevStep } = useEventBooking();
  
  const [formData, setFormData] = useState({
    firstName: user?.user_metadata?.firstName || "",
    lastName: user?.user_metadata?.lastName || "",
    email: user?.email || "",
    phone: "",
    attendees: 1,
    specialRequests: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAttendeeChange = (value: string) => {
    setFormData(prev => ({ ...prev, attendees: parseInt(value) }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error("Please enter your first name");
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error("Please enter your last name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await initiateBooking(event, formData, (checkoutUrl) => {
      // Open Stripe checkout in a new tab
      window.open(checkoutUrl, '_blank');
      if (onSuccess) onSuccess();
    });
  };

  const getMaxAttendees = () => {
    if (typeof event.capacity === 'number' && typeof event.remaining === 'number') {
      return Math.min(event.remaining, 5); // Limit to 5 or remaining capacity
    }
    return 5; // Default max if capacity/remaining not specified
  };

  const generateAttendeeOptions = () => {
    const maxAttendees = getMaxAttendees();
    const options = [];
    for (let i = 1; i <= maxAttendees; i++) {
      options.push(
        <SelectItem key={i} value={i.toString()}>
          {i} {i === 1 ? 'attendee' : 'attendees'}
        </SelectItem>
      );
    }
    return options;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {bookingStep === 1 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attendees">Number of Attendees</Label>
            <Select 
              value={formData.attendees.toString()} 
              onValueChange={handleAttendeeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of attendees" />
              </SelectTrigger>
              <SelectContent>
                {generateAttendeeOptions()}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests or Notes</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          
          <Button 
            type="button" 
            onClick={handleContinue}
            className="w-full"
            disabled={isLoading}
          >
            Continue to Review
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Review & Confirm</h3>
          
          <div className="bg-muted/30 p-4 rounded-lg space-y-4">
            <div>
              <h4 className="font-medium">Event Details</h4>
              <p className="text-sm">{event.title}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(event.startDate).toLocaleDateString()} at {new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
              <p className="text-sm text-muted-foreground">
                {event.location.name}, {event.location.city}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Attendee Information</h4>
              <p className="text-sm">{formData.firstName} {formData.lastName}</p>
              <p className="text-sm">{formData.email}</p>
              <p className="text-sm">{formData.phone}</p>
              <p className="text-sm">{formData.attendees} {formData.attendees === 1 ? 'attendee' : 'attendees'}</p>
            </div>
            
            {formData.specialRequests && (
              <div>
                <h4 className="font-medium">Special Requests</h4>
                <p className="text-sm">{formData.specialRequests}</p>
              </div>
            )}
            
            <div>
              <h4 className="font-medium">Total</h4>
              <p className="text-lg font-semibold">
                ${typeof event.price === 'number' ? 
                  (event.price * formData.attendees).toFixed(2) : 
                  (parseFloat(event.price as string) * formData.attendees).toFixed(2)
                }
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={isLoading}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
