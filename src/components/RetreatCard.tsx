import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Star, Heart, Scale } from "lucide-react";
import { Retreat } from "@/lib/data";
import SanghosIcon from "./SanghosIcon";
import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import { useRetreatContext } from "@/contexts/RetreatContext";

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
  viewMode?: "grid" | "list" | "map";
  userLocation?: UserLocation | null;
}

const RetreatCard: React.FC<RetreatCardProps> = ({ 
  retreat, 
  index, 
  comingSoon = false,
  viewMode = "grid",
  userLocation = null
}) => {
  const isList = viewMode === "list";
  const { 
    isFavorite, 
    addToFavorites, 
    removeFromFavorites,
    addToComparison,
    removeFromComparison,
    isInComparison,
    comparison
  } = useRetreatContext();

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (retreat.bookingUrl) {
      window.open(retreat.bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getDifficultyBadge = () => {
    // Mock difficulty based on price range
    if (retreat.price <= 100) return { label: "Beginner", color: "bg-green-100 text-green-700" };
    if (retreat.price <= 300) return { label: "Intermediate", color: "bg-yellow-100 text-yellow-700" };
    return { label: "Advanced", color: "bg-red-100 text-red-700" };
  };

  const difficulty = getDifficultyBadge();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(retreat.id)) {
      removeFromFavorites(retreat.id);
    } else {
      addToFavorites(retreat.id);
    }
  };

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInComparison(retreat.id)) {
      removeFromComparison(retreat.id);
    } else if (comparison.length < 3) {
      addToComparison(retreat);
    }
  };

  const isComparisonFull = comparison.length >= 3 && !isInComparison(retreat.id);

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
        "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-sage-100/50 group",
        isList ? "flex flex-col md:flex-row w-full" : "flex flex-col h-full"
      )}>
        <div className={cn(
          "relative overflow-hidden",
          isList ? "md:w-2/5 h-60 md:h-auto" : "h-52"
        )}>
          <OptimizedImage
            src={retreat.image}
            alt={retreat.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            aspectRatio="custom" 
            objectFit="cover"
          />
          
          {/* Action buttons overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              className={cn(
                "h-8 w-8 p-0 rounded-full backdrop-blur-sm transition-colors",
                isFavorite(retreat.id) 
                  ? "bg-red-500 text-white hover:bg-red-600" 
                  : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
              )}
            >
              <Heart className={cn("h-4 w-4", isFavorite(retreat.id) && "fill-current")} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleComparisonClick}
              disabled={isComparisonFull}
              className={cn(
                "h-8 w-8 p-0 rounded-full backdrop-blur-sm transition-colors",
                isInComparison(retreat.id)
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white/90 text-gray-600 hover:bg-white hover:text-blue-500",
                isComparisonFull && "opacity-50 cursor-not-allowed"
              )}
            >
              <Scale className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {comingSoon && (
              <Badge className="bg-blue-500 text-white font-medium shadow-md">
                Coming Soon
              </Badge>
            )}
            <Badge className={`${difficulty.color} font-medium shadow-md`}>
              {difficulty.label}
            </Badge>
          </div>

          {/* Price badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-sage-800 font-semibold shadow-md backdrop-blur-sm">
              {formatPrice(retreat.price)}
            </Badge>
          </div>
          
          {/* Bottom badges */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            {retreat.isSanghos && (
              <div className="flex items-center bg-white/90 backdrop-blur-sm text-sage-600 rounded-full px-3 py-1 text-xs font-medium shadow-md">
                <SanghosIcon className="h-3.5 w-3.5 mr-1" />
                <span>Sanghos</span>
              </div>
            )}
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-sage-700 backdrop-blur-sm shadow-md">
              <Clock className="h-3 w-3 mr-1" />
              {retreat.duration}
            </Badge>
          </div>
        </div>
        
        <div className={cn(
          "flex flex-col p-5",
          isList ? "md:w-3/5" : "",
          "flex-grow justify-between"
        )}>
          <div className="space-y-3 mb-auto">
            {/* Date and instructor */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-sage-500" />
                <span className="text-sm font-medium text-sage-600">
                  {formatShortDate(retreat.date)}
                </span>
              </div>
              {retreat.instructor && (
                <span className="text-xs text-muted-foreground">
                  with {retreat.instructor.name}
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-sage-700 transition-colors">
              {retreat.title}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-2">
              {retreat.description}
            </p>

            {/* Categories */}
            <div className="flex flex-wrap gap-1">
              {retreat.category.slice(0, 2).map((cat) => (
                <Badge key={cat} variant="outline" className="text-xs bg-sage-50 text-sage-600 border-sage-200">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap text-sm text-gray-500 gap-y-2 mb-4">
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
            
            <div className="flex gap-2">
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
                  className="bg-sage-600 hover:bg-sage-700 text-white px-6 transition-colors"
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
