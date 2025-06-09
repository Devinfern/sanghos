
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, DollarSign, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BookingIntegrationProps {
  retreat: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    price: number;
    participants: number;
    maxParticipants: number;
  };
  userJoined: boolean;
  onJoinRetreat: () => void;
}

const BookingIntegration = ({ retreat, userJoined, onJoinRetreat }: BookingIntegrationProps) => {
  const [bookingStatus, setBookingStatus] = useState<"idle" | "processing" | "confirmed">("idle");
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const spotsRemaining = retreat.maxParticipants - retreat.participants;
  const isFullyBooked = spotsRemaining <= 0;
  const isAlmostFull = spotsRemaining <= 3 && !isFullyBooked;

  const handleBookRetreat = () => {
    setBookingStatus("processing");
    // Simulate booking process
    setTimeout(() => {
      setBookingStatus("confirmed");
      onJoinRetreat();
    }, 2000);
  };

  return (
    <Card className="border-2 border-brand-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-primary" />
          Retreat Booking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Retreat Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(retreat.startDate)} - {formatDate(retreat.endDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{retreat.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">${retreat.price}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{retreat.participants} / {retreat.maxParticipants} participants</span>
            {isAlmostFull && !isFullyBooked && (
              <Badge variant="destructive" className="text-xs">
                Almost Full
              </Badge>
            )}
            {isFullyBooked && (
              <Badge variant="outline" className="text-xs">
                Fully Booked
              </Badge>
            )}
          </div>
        </div>

        {/* Booking Status */}
        {userJoined ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">You're registered for this retreat!</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              You'll receive confirmation and preparation details via email.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {bookingStatus === "processing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 text-blue-700">
                  <Clock className="h-5 w-5 animate-spin" />
                  <span className="font-medium">Processing your booking...</span>
                </div>
              </motion.div>
            )}

            {bookingStatus === "confirmed" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Booking confirmed!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Welcome to the retreat community! Check your email for details.
                </p>
              </motion.div>
            )}

            <Button
              onClick={handleBookRetreat}
              disabled={isFullyBooked || bookingStatus !== "idle"}
              className="w-full bg-brand-primary hover:bg-brand-primary/90"
              size="lg"
            >
              {isFullyBooked 
                ? "Fully Booked" 
                : bookingStatus === "processing" 
                  ? "Processing..." 
                  : `Book Retreat - $${retreat.price}`
              }
            </Button>

            {!isFullyBooked && (
              <p className="text-xs text-muted-foreground text-center">
                {spotsRemaining} {spotsRemaining === 1 ? 'spot' : 'spots'} remaining
              </p>
            )}
          </div>
        )}

        {/* Waitlist Option */}
        {isFullyBooked && !userJoined && (
          <div className="border-t pt-4">
            <Button variant="outline" className="w-full">
              Join Waitlist
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              We'll notify you if a spot becomes available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingIntegration;
