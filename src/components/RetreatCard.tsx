
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Retreat } from "@/lib/data";
import SanghosIcon from "./SanghosIcon";
import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

// Location interface for the userLocation prop
interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

interface RetreatCardProps {
  retreat: Retreat;
  index: number;
  comingSoon?: boolean;
  viewMode?: "grid" | "list" | "map"; // Add viewMode prop
  userLocation?: UserLocation | null; // Add userLocation prop
}

const RetreatCard: React.FC<RetreatCardProps> = ({ 
  retreat, 
  index, 
  comingSoon = false,
  viewMode = "grid", // Default to grid
  userLocation = null // Default to null
}) => {
  // Determine if this is a list view or grid view
  const isList = viewMode === "list";

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (retreat.bookingUrl) {
      window.open(retreat.bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "h-full",
        isList ? "flex flex-col md:flex-row" : ""
      )}
    >
      <div className={cn(
        "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-sage-100/50",
        isList ? "flex flex-col md:flex-row w-full" : "flex flex-col h-full"
      )}>
        <div className={cn(
          "relative overflow-hidden",
          isList ? "md:w-2/5 h-60 md:h-auto" : "h-52"
        )}>
          <OptimizedImage
            src={retreat.image}
            alt={retreat.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            aspectRatio="custom" 
            objectFit="cover"
          />
          
          {comingSoon && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-blue-500 text-white font-medium">Coming Soon</Badge>
            </div>
          )}
          
          {retreat.isSanghos && (
            <div className="absolute bottom-3 right-3">
              <div className="flex items-center bg-white/90 backdrop-blur-sm text-sage-600 rounded-full px-3 py-1 text-xs font-medium">
                <SanghosIcon className="h-3.5 w-3.5 mr-1" />
                <span>Sanghos</span>
              </div>
            </div>
          )}
        </div>
        
        <div className={cn(
          "flex flex-col p-5",
          isList ? "md:w-3/5" : "",
          "flex-grow justify-between"
        )}>
          <div className="space-y-3 mb-auto">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1.5 text-sage-500" />
              <span className="text-sm font-medium text-sage-600">
                {formatShortDate(retreat.date)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {retreat.title}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-2">
              {retreat.description}
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap text-sm text-gray-500 gap-y-2">
              <div className="flex items-center w-full sm:w-auto sm:mr-4">
                <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-sage-500" />
                <span className="truncate">{retreat.location.city}, {retreat.location.state}</span>
              </div>
              
              <div className="flex items-center w-full sm:w-auto">
                <Users className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-sage-500" />
                <span className={retreat.remaining < 5 ? "text-amber-600 font-medium" : ""}>
                  {retreat.remaining} spots left
                </span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Link to={`/retreat/${retreat.id}`} className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full bg-white hover:bg-sage-50 border-sage-200 text-sage-700 hover:text-sage-800 transition-colors"
                >
                  View Details
                </Button>
              </Link>
              
              {retreat.bookingUrl && (
                <Button 
                  onClick={handleBookingClick}
                  className="bg-sage-600 hover:bg-sage-700 text-white px-6"
                >
                  Book Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RetreatCard;
