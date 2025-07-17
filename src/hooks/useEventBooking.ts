
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Event } from '@/types/event';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attendees: number;
  specialRequests?: string;
}

export function useEventBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingProgress, setBookingProgress] = useState(0);
  const { user } = useAuth();
  
  const bookingSteps = [
    'Event Details',
    'Personal Info', 
    'Payment',
    'Confirmation'
  ];

  const initiateBooking = async (
    event: Event, 
    formData: BookingFormData, 
    onSuccess: (sessionUrl: string) => void
  ) => {
    if (!event) {
      toast.error("Event information is missing");
      return;
    }

    setIsLoading(true);

    try {
      // Calculate total amount based on attendees
      const totalAmount = typeof event.price === 'number' 
        ? event.price * formData.attendees
        : parseFloat(event.price as string) * formData.attendees;

      console.log("Creating booking for event:", event.id, "Total amount:", totalAmount);

      // Create a booking record in the Supabase table - use type assertion temporarily
      const { data: bookingData, error: bookingError } = await (supabase as any)
        .from("event_bookings")
        .insert({
          event_id: event.id,
          user_id: user?.id || null,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          attendees: formData.attendees,
          special_requests: formData.specialRequests || null,
          status: 'pending',
          total_amount: totalAmount
        })
        .select('id')
        .single();

      if (bookingError) {
        throw new Error(`Error creating booking: ${bookingError.message}`);
      }

      // Create checkout session with Stripe
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          eventId: event.id,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          amount: totalAmount,
          description: `Booking for ${event.title}`,
          attendees: formData.attendees,
          bookingId: bookingData.id
        },
      });

      if (error) {
        throw new Error(`Error creating checkout session: ${error.message}`);
      }

      if (!data?.url) {
        throw new Error("No checkout URL received from the server");
      }

      // Call success callback with checkout URL
      onSuccess(data.url);
      toast.success("Redirecting to checkout...");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process booking");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setBookingStep(prev => {
      const newStep = prev + 1;
      setBookingProgress((newStep / bookingSteps.length) * 100);
      return newStep;
    });
  };
  
  const prevStep = () => {
    setBookingStep(prev => {
      const newStep = Math.max(1, prev - 1);
      setBookingProgress((newStep / bookingSteps.length) * 100);
      return newStep;
    });
  };
  
  const resetSteps = () => {
    setBookingStep(1);
    setBookingProgress(0);
  };

  return {
    initiateBooking,
    isLoading,
    bookingStep,
    bookingProgress,
    bookingSteps,
    nextStep,
    prevStep,
    resetSteps
  };
}
