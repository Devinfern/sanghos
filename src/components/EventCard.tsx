
import React, { useState } from "react";
import { Event } from "@/types/event";
import { getCategoryLabel, getCategoryColor } from "@/utils/categoryUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Heart, Share, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// SAGE COLOR SYSTEM
// sage-500 = #64806a, sage-200 = #cedacf, sage-50 = #f4f7f4, sage-400 = #839e87

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
      <Card className="overflow-hidden card-hover h-full flex flex-col border-sage-200 bg-white shadow-none">
        <div className="relative h-48 overflow-hidden bg-sage-50">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3">
            <span className={`category-badge ${categoryClass}`}>
              {getCategoryLabel(event.category)}
            </span>
          </div>
        </div>
        <CardContent className="pt-5 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center text-sm text-sage-700 gap-1">
              <Calendar className="h-4 w-4 text-sage-500" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-1.5 rounded-full transition-colors ${
                  isSaved ? "bg-rose-50 text-rose-600" : "bg-sage-50 text-sage-500"
                }`}
                aria-label={isSaved ? "Remove from saved" : "Save event"}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              </button>
              <button
                className="p-1.5 rounded-full bg-sage-50 text-sage-400 transition-colors"
                aria-label="Share event"
              >
                <Share className="h-4 w-4" />
              </button>
            </div>
          </div>
          <h3 className="text-lg font-semibold line-clamp-2 mb-2 text-sage-800">{event.title}</h3>
          <p className="text-sage-700 text-sm line-clamp-2 mb-3">{event.shortDescription}</p>

          <div className="flex flex-col space-y-2 mb-3">
            <div className="flex items-center text-sm text-sage-700 gap-1.5">
              <Clock className="h-4 w-4 flex-shrink-0 text-sage-500" />
              <span>
                {formatTime(event.startDate)} - {formatTime(event.endDate)}
                {!isSameDay(event.startDate, event.endDate) && <> • Multiple days</>}
              </span>
            </div>
            <div className="flex items-center text-sm text-sage-700 gap-1.5">
              <MapPin className="h-4 w-4 flex-shrink-0 text-sage-500" />
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
              <span className="text-sage-800">${event.price}</span>
            )}
            <span className="text-xs text-sage-400 ml-auto">via {event.source}</span>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-2 flex-shrink-0">
          <div className="w-full grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full border-sage-400 text-sage-700 hover:bg-sage-50 hover:text-sage-900 rounded-full transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              Details
            </Button>
            <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white rounded-full transition-all" asChild>
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
              <div className="rounded-lg overflow-hidden mb-6 h-64 bg-sage-50">
                <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-sage-800">About This Event</h3>
              <p className="text-sage-700 mb-6">{event.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-sage-800">Organizer</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 font-semibold">
                    {event.organizer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sage-800">{event.organizer.name}</p>
                    {event.organizer.website && (
                      <a
                        href={event.organizer.website}
                        className="text-sm text-sage-700 hover:underline flex items-center gap-1"
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

            <div className="bg-sage-50 rounded-lg p-4 border border-sage-200">
              <div className="mb-4">
                <div className={`category-badge ${categoryClass} mb-4`}>
                  {getCategoryLabel(event.category)}
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-sage-700">Date & Time</h4>
                    <p className="text-sm text-sage-700 flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-sage-500" />
                      {formatDate(event.startDate)}
                    </p>
                    <p className="text-sm text-sage-700 flex items-center gap-1.5 mt-1">
                      <Clock className="h-4 w-4 text-sage-500" />
                      {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-sage-700">Location</h4>
                    <p className="text-sm text-sage-700 flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-sage-500" />
                      {event.location.locationType === "online" ? "Online Event" : event.location.name}
                    </p>
                    {event.location.locationType !== "online" && (
                      <p className="text-sm text-sage-700 ml-5 mt-1">
                        {event.location.address}
                        <br />
                        {event.location.city}, {event.location.state} {event.location.zip}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-sage-700">Price</h4>
                    <p className="text-xl font-semibold text-sage-800">
                      {event.price === "Free" ? "Free" : `$${event.price}`}
                    </p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-sage-500 hover:bg-sage-600 mb-3 text-white rounded-full transition-all" asChild>
                <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </Button>
              <Button
                variant="outline"
                className={`w-full ${isSaved ? "border-rose-500 text-rose-600 hover:bg-rose-50" : "border-sage-400 text-sage-700 hover:bg-sage-50"} rounded-full transition-all`}
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
