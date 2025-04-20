
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Clock, Heart } from "lucide-react";
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

interface RetreatCardProps {
  retreat: Retreat;
  index?: number;
  comingSoon?: boolean;
}

const RetreatCard = ({ retreat, index = 0, comingSoon = false }: RetreatCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getAnimationDelay = () => {
    return `${100 + index * 100}ms`;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLiked(!liked);
  };

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
              <DialogTitle>Get notified when we launch</DialogTitle>
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

  return (
    <CardWrapper>
      <Card
        className={cn(
          "h-full overflow-hidden group border shadow-sm transition-all duration-300 relative",
          "opacity-0 animate-fade-up",
          isHovered && "shadow-md border-sage-300"
        )}
        style={{ animationDelay: getAnimationDelay() }}
      >
        {comingSoon && (
          <div 
            className={cn(
              "absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm transition-opacity duration-300",
              isHovered ? "opacity-90" : "opacity-95"
            )}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: isHovered ? 1.1 : 1 }}
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
            className={cn(
              "object-cover w-full h-full transition-all duration-500", 
              isHovered ? "scale-110" : "scale-100",
              comingSoon && "filter brightness-90"
            )}
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
          
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-3 left-3 z-20 h-8 w-8 rounded-full transition-all duration-300",
              liked ? "bg-rose-500/20" : "bg-white/80 hover:bg-white",
              isHovered && !liked && "scale-110"
            )}
            onClick={handleLike}
          >
            <motion.div 
              animate={liked ? { scale: [1, 1.3, 1] } : {}} 
              transition={{ duration: 0.3 }}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-rose-500 text-rose-500")} />
            </motion.div>
          </Button>
        </div>

        <CardContent className="p-5">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
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
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-3 border-t border-sage-100"
          >
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              View Details
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

export default RetreatCard;
