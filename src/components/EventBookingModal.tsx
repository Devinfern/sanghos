
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import BookingForm from "./BookingForm";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventBookingModalProps {
  event: Event;
  buttonLabel?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function EventBookingModal({
  event,
  buttonLabel = "Book Now",
  buttonVariant = "default",
  buttonSize = "default",
  className
}: EventBookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccessfulBooking = () => {
    setIsOpen(false);
  };

  // Check if event is sold out - safely access remaining property
  const isSoldOut = typeof event.remaining === 'number' && event.remaining <= 0;
  
  // Check if this is a partner event with an external booking URL
  const isPartnerEvent = event.bookingUrl && event.source !== "sanghos";

  if (isPartnerEvent) {
    return (
      <Button
        variant={buttonVariant}
        size={buttonSize}
        className={cn("transition-all duration-300", className)}
        disabled={isSoldOut}
        onClick={() => window.open(event.bookingUrl, '_blank')}
      >
        {isSoldOut ? "Sold Out" : buttonLabel} <ExternalLink className="ml-1 h-3 w-3" />
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={cn("transition-all duration-300", className)}
          disabled={isSoldOut}
        >
          {isSoldOut ? "Sold Out" : buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl border-sage-200/30 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Book Event</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-6 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
            <div className="flex items-center text-sage-700">
              <Calendar className="h-4 w-4 mr-2 text-sage-500" />
              <p className="text-sm">
                {new Date(event.startDate).toLocaleDateString()} at {new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
            <div className="flex items-center text-sage-700">
              <MapPin className="h-4 w-4 mr-2 text-sage-500" />
              <p className="text-sm">
                {event.location.name}{event.location.city ? `, ${event.location.city}` : ''}
              </p>
            </div>
            <div className="mt-3 p-3 bg-sage-50/70 rounded-lg">
              <span className="font-medium text-gray-800">Price: </span>
              <span className="text-lg font-semibold text-sage-700">${typeof event.price === 'number' ? event.price.toFixed(2) : event.price}</span>
              <span className="text-sm text-muted-foreground"> per person</span>
              
              {typeof event.remaining === 'number' && (
                <p className="text-sm mt-1">
                  <span className={event.remaining < 5 ? "text-amber-600 font-medium" : "text-sage-600"}>
                    {event.remaining} {event.remaining === 1 ? "spot" : "spots"} remaining
                  </span>
                </p>
              )}
            </div>
          </div>
          <BookingForm event={event} onSuccess={handleSuccessfulBooking} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
