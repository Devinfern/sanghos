
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import BookingForm from "./BookingForm";
import { ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";

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
        className={cn("group", className)}
        disabled={isSoldOut}
        onClick={() => window.open(event.bookingUrl, '_blank')}
      >
        {isSoldOut ? "Sold Out" : buttonLabel} 
        <ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={className}
          disabled={isSoldOut}
        >
          {isSoldOut ? "Sold Out" : buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Event</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-6 space-y-3">
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-sage-500" />
                {new Date(event.startDate).toLocaleDateString()} at {new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1.5 text-sage-500" />
                {event.location.name}{event.location.city ? `, ${event.location.city}` : ''}
              </div>
            </div>
            
            <div className="bg-sage-50 p-4 rounded-lg flex flex-wrap items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Price: </span>
                <span className="text-lg font-bold text-gray-800">${typeof event.price === 'number' ? event.price.toFixed(2) : event.price}</span>
                <span className="text-sm text-muted-foreground"> per person</span>
              </div>
              
              {typeof event.remaining === 'number' && (
                <Badge variant="outline" className={event.remaining < 5 ? "bg-amber-50 text-amber-700 border-amber-200" : ""}>
                  {event.remaining} {event.remaining === 1 ? "spot" : "spots"} remaining
                </Badge>
              )}
            </div>
          </div>
          
          <BookingForm event={event} onSuccess={handleSuccessfulBooking} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
