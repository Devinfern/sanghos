
import React, { useState } from "react";
import { Event } from "@/types/event";
import { getCategoryLabel, getCategoryColor } from "@/data/mockEvents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Heart, Share, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const isSameDay = (date1: Date, date2: Date) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  const categoryClass = getCategoryColor(event.category);

  return (
    <>
      <Card className="overflow-hidden card-hover h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3">
            <span className={`category-badge ${categoryClass}`}>
              {getCategoryLabel(event.category)}
            </span>
          </div>
        </div>
        <CardContent className="pt-5 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-1.5 rounded-full transition-colors ${
                  isSaved ? "bg-red-50 text-red-500" : "bg-muted text-muted-foreground"
                }`}
                aria-label={isSaved ? "Remove from saved" : "Save event"}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              </button>
              <button
                className="p-1.5 rounded-full bg-muted text-muted-foreground"
                aria-label="Share event"
              >
                <Share className="h-4 w-4" />
              </button>
            </div>
          </div>
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{event.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{event.shortDescription}</p>

          <div className="flex flex-col space-y-2 mb-3">
            <div className="flex items-center text-sm text-muted-foreground gap-1.5">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>
                {formatTime(event.startDate)} - {formatTime(event.endDate)}
                {!isSameDay(event.startDate, event.endDate) && <> • Multiple days</>}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1.5">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {event.location.locationType === "online"
                  ? "Online Event"
                  : `${event.location.name}${event.location.city ? ", " + event.location.city : ""}`}
              </span>
            </div>
          </div>

          <div className="flex items-center text-sm font-semibold">
            {event.price === "Free" ? (
              <span className="text-green-700">Free</span>
            ) : (
              <span>${event.price}</span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">via {event.source}</span>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-2 flex-shrink-0">
          <div className="w-full grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full border-purple-400 text-purple-600 hover:bg-purple-50"
              onClick={() => setIsModalOpen(true)}
            >
              Details
            </Button>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
              <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Event Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="rounded-lg overflow-hidden mb-6">
                <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover" />
              </div>
              <h3 className="text-lg font-semibold mb-2">About This Event</h3>
              <p className="text-muted-foreground mb-6">{event.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Organizer</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                    {event.organizer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{event.organizer.name}</p>
                    {event.organizer.website && (
                      <a
                        href={event.organizer.website}
                        className="text-sm text-purple-700 hover:underline flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-4">
                <div className={`category-badge ${categoryClass} mb-4`}>
                  {getCategoryLabel(event.category)}
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Date & Time</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.startDate)}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Clock className="h-4 w-4" />
                      {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Location</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {event.location.locationType === "online" ? "Online Event" : event.location.name}
                    </p>
                    {event.location.locationType !== "online" && (
                      <p className="text-sm text-muted-foreground ml-5 mt-1">
                        {event.location.address}
                        <br />
                        {event.location.city}, {event.location.state} {event.location.zip}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Price</h4>
                    <p className="text-xl font-semibold">
                      {event.price === "Free" ? "Free" : `$${event.price}`}
                    </p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-3" asChild>
                <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </Button>
              <Button
                variant="outline"
                className={`w-full ${isSaved ? "border-red-500 text-red-500 hover:bg-red-50" : "border-purple-400 text-purple-600 hover:bg-purple-50"}`}
                onClick={() => setIsSaved(!isSaved)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save Event"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventCard;
