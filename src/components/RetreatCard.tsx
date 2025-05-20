
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Clock, Heart, Share2, BookmarkPlus, ExternalLink } from "lucide-react";
import { Retreat, formatCurrency, getRemainingText } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import OptimizedImage from "./OptimizedImage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmailSignupForm from "./EmailSignupForm";
import SanghosIcon from "./SanghosIcon";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RetreatCardProps {
  retreat: Retreat;
  index?: number;
  comingSoon?: boolean;
  viewMode?: "grid" | "list";
  userLocation?: { lat: number; lng: number } | null;
}

const RetreatCard = ({ 
  retreat, 
  index = 0, 
  comingSoon = false,
  viewMode = "grid",
  userLocation = null
}: RetreatCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [distance, setDistance] = useState<string | null>(null);

  // Calculate animation delay based on index
  const getAnimationDelay = () => {
    return `${100 + index * 100}ms`;
  };

  // Handle like action
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLiked(!liked);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };

  // Handle save/bookmark action
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved events" : "Saved for later");
  };

  // Handle share action
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: retreat.title,
        text: `Check out this wellness event: ${retreat.title}`,
        url: window.location.origin + `/retreat/${retreat.id}`,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/retreat/${retreat.id}`);
      toast.success("Link copied to clipboard");
    }
  };

  // Calculate distance from user if location is available
  useEffect(() => {
    if (userLocation && retreat.location.coordinates) {
      // Simple distance calculation (could be replaced with a more accurate function)
      const distanceInMiles = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        retreat.location.coordinates.lat,
        retreat.location.coordinates.lng
      );
      setDistance(`${distanceInMiles.toFixed(1)} miles away`);
    }
  }, [userLocation, retreat.location.coordinates]);

  // Simple Haversine formula for distance calculation
  function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 3958.8; // Earth radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (comingSoon) {
      return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <div 
              className="cursor-pointer h-full" 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {children}
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Get notified when available</DialogTitle>
            </DialogHeader>
            <EmailSignupForm 
              retreatTitle={retreat.title} 
              onSuccess={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      );
    }
    
    return (
      <Link 
        to={`/retreat/${retreat.id}`} 
        className="h-full block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
    );
  };

  // Different layouts based on view mode
  if (viewMode === "list") {
    return (
      <CardWrapper>
        <Card
          className={cn(
            "h-full overflow-hidden flex flex-col md:flex-row border shadow-sm transition-all duration-300 relative",
            "opacity-0 animate-fade-up",
            isHovered && "border-sage-300 shadow-md translate-y-[-4px]"
          )}
          style={{ animationDelay: getAnimationDelay() }}
        >
          {comingSoon && (
            <div 
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
                className="bg-primary/90 text-white px-4 py-2 rounded-full flex items-center mb-3"
              >
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-medium">Coming Soon</span>
              </motion.div>
              <p className="text-sm text-center px-4">
                Sign up to be notified when this event becomes available
              </p>
            </div>
          )}
          
          <div className="md:w-1/3 h-48 md:h-auto relative">
            <OptimizedImage
              src={retreat.image}
              alt={retreat.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)"
              }}
              onLoad={() => setImageLoaded(true)}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            
            <div className="absolute bottom-0 w-full p-4 text-white">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-sm font-medium">
                  {retreat.location.city}, {retreat.location.state}
                </span>
              </div>
            </div>
            
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
              {retreat.featured && (
                <Badge
                  className="bg-primary/90 hover:bg-primary/90"
                  variant="default"
                >
                  Featured
                </Badge>
              )}
              {retreat.isSanghos && (
                <Badge 
                  className="bg-sage-500/90 hover:bg-sage-500/90 flex items-center"
                  variant="default"
                >
                  <SanghosIcon className="mr-1 h-4 w-4" opacity={0.85} /> Sanghos
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex-1 p-5 flex flex-col">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2 transition-colors duration-300">
              {retreat.title}
            </h3>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {retreat.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-sage-500 mr-1" />
                <span className="text-sm">
                  {new Date(retreat.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-sage-500 mr-1" />
                <span className="text-sm">
                  {getRemainingText(retreat.remaining)}
                </span>
              </div>
            </div>
            
            {distance && (
              <div className="mb-3">
                <Badge variant="outline" className="text-xs">
                  {distance}
                </Badge>
              </div>
            )}

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <OptimizedImage
                  src={retreat.instructor.image}
                  alt={retreat.instructor.name}
                  className="w-8 h-8 rounded-full border border-sage-100"
                  priority={true}
                />
                <span className="text-sm font-medium">{retreat.instructor.name}</span>
              </div>
              <p className="font-semibold text-primary">{formatCurrency(retreat.price)}</p>
            </div>
            
            <div className="mt-3 pt-3 border-t border-sage-100 flex justify-between items-center">
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full transition-all duration-300"
                        onClick={handleLike}
                      >
                        <Heart className={cn("h-4 w-4", liked && "fill-rose-500 text-rose-500")} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{liked ? 'Remove from favorites' : 'Add to favorites'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full transition-all duration-300"
                        onClick={handleSave}
                      >
                        <BookmarkPlus className={cn("h-4 w-4", isSaved && "fill-sage-500 text-sage-500")} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isSaved ? 'Remove from saved' : 'Save for later'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full transition-all duration-300"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share this event</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                View Details <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>
      </CardWrapper>
    );
  }

  // Default grid view
  return (
    <CardWrapper>
      <Card
        className={cn(
          "h-full overflow-hidden border shadow-sm transition-all duration-300 relative",
          "opacity-0 animate-fade-up",
          isHovered && "border-sage-300 shadow-md translate-y-[-4px]"
        )}
        style={{ animationDelay: getAnimationDelay() }}
      >
        {comingSoon && (
          <div 
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="bg-primary/90 text-white px-4 py-2 rounded-full flex items-center mb-3"
            >
              <Clock className="h-4 w-4 mr-2" />
              <span className="font-medium">Coming Soon</span>
            </motion.div>
            <p className="text-sm text-center px-4">
              We're launching soon! Sign up to be notified when bookings open
            </p>
          </div>
        )}

        <div className="relative aspect-video overflow-hidden">
          <OptimizedImage
            src={retreat.image}
            alt={retreat.title}
            className="object-cover w-full h-full transition-transform duration-500 ease-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)"
            }}
            onLoad={() => setImageLoaded(true)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
          
          <div className="absolute bottom-0 w-full p-4 text-white">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">
                {retreat.location.city}, {retreat.location.state}
              </span>
            </div>
            
            {distance && (
              <div className="mt-1">
                <Badge variant="outline" className="bg-black/30 text-white border-transparent text-xs">
                  {distance}
                </Badge>
              </div>
            )}
          </div>
          
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
            {retreat.featured && (
              <Badge
                className="bg-primary/90 hover:bg-primary/90"
                variant="default"
              >
                Featured
              </Badge>
            )}
            {retreat.isSanghos && (
              <Badge 
                className="bg-sage-500/90 hover:bg-sage-500/90 flex items-center"
                variant="default"
              >
                <SanghosIcon className="mr-1 h-4 w-4" opacity={0.85} /> Sanghos
              </Badge>
            )}
          </div>
          
          <div className="absolute top-3 left-3 flex gap-1 z-20">
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-8 w-8 rounded-full transition-all duration-300",
                liked ? "bg-rose-500/20" : "bg-white/80 hover:bg-white"
              )}
              onClick={handleLike}
            >
              <motion.div 
                animate={liked ? { scale: [1, 1.2, 1] } : {}} 
                transition={{ duration: 0.3 }}
              >
                <Heart className={cn("h-4 w-4", liked && "fill-rose-500 text-rose-500")} />
              </motion.div>
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-8 w-8 rounded-full transition-all duration-300",
                isSaved ? "bg-sage-500/20" : "bg-white/80 hover:bg-white"
              )}
              onClick={handleSave}
            >
              <motion.div 
                animate={isSaved ? { scale: [1, 1.2, 1] } : {}} 
                transition={{ duration: 0.3 }}
              >
                <BookmarkPlus className={cn("h-4 w-4", isSaved && "fill-sage-500 text-sage-500")} />
              </motion.div>
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full transition-all duration-300 bg-white/80 hover:bg-white"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 transition-colors duration-300">
            {retreat.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {retreat.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-sage-500 mr-1" />
              <span className="text-sm">
                {new Date(retreat.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-sage-500 mr-1" />
              <span className="text-sm">
                {getRemainingText(retreat.remaining)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <OptimizedImage
                src={retreat.instructor.image}
                alt={retreat.instructor.name}
                className="w-8 h-8 rounded-full border border-sage-100"
                priority={true}
              />
              <span className="text-sm font-medium">{retreat.instructor.name}</span>
            </div>
            <p className="font-semibold text-primary">{formatCurrency(retreat.price)}</p>
          </div>
          
          <div 
            className="mt-4 pt-3 border-t border-sage-100 opacity-0 transform translate-y-2 transition-all duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(8px)'
            }}
          >
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              View Details <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

export default RetreatCard;
