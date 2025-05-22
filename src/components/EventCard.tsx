import React, { useState } from "react";
import { Event } from "@/types/event";
import { getCategoryLabel, getCategoryColor } from "@/utils/categoryUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Heart, Share, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md border-sage-100 bg-white">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${categoryClass}`}>
                {getCategoryLabel(event.category)}
              </span>
            </div>
          </div>
          
          <CardContent className="pt-5 flex-grow flex flex-col">
            <div className="mb-2 text-sm font-medium text-sage-600">
              {formatDate(event.startDate)}
            </div>
            
            <h3 className="text-lg font-semibold line-clamp-2 mb-2 text-gray-800">
              {event.title}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {event.shortDescription}
            </p>
            
            <div className="mt-auto pt-4 border-t border-gray-100">
              <div className="flex flex-wrap text-xs text-gray-500 gap-y-2">
                <div className="flex items-center w-full sm:w-auto sm:mr-4">
                  <Clock className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-gray-400" />
                  <span>
                    {formatTime(event.startDate)}
                    {!isSameDay(event.startDate, event.endDate) && <> • Multiple days</>}
                  </span>
                </div>
                
                <div className="flex items-center w-full sm:w-auto">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-gray-400" />
                  <span className="truncate">
                    {event.location.locationType === "online"
                      ? "Online Event"
                      : `${event.location.name}${event.location.city ? ", " + event.location.city : ""}`}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="px-5 pb-5 pt-0 flex-shrink-0 border-t border-transparent">
            <div className="w-full flex justify-between items-center">
              <div className="font-medium text-sm">
                {event.price === "Free" ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  <span className="text-sage-800">${event.price}</span>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="border-sage-200 text-sage-700 hover:bg-sage-50"
                onClick={() => setIsModalOpen(true)}
              >
                View Details
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

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
