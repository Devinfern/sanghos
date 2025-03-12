
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { Retreat, formatCurrency, getRemainingText } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import OptimizedImage from "./OptimizedImage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmailSignupForm from "./EmailSignupForm";

interface RetreatCardProps {
  retreat: Retreat;
  index?: number;
  comingSoon?: boolean;
}

const RetreatCard = ({ retreat, index = 0, comingSoon = true }: RetreatCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Animation delay based on index
  const getAnimationDelay = () => {
    return `${100 + index * 100}ms`;
  };

  // If coming soon, we'll use a Dialog instead of a Link
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (comingSoon) {
      return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <div className="cursor-pointer">{children}</div>
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
    
    return <Link to={`/retreat/${retreat.id}`}>{children}</Link>;
  };

  return (
    <CardWrapper>
      <div
        className={cn(
          "retreat-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative",
          "opacity-0 animate-fade-up"
        )}
        style={{ animationDelay: getAnimationDelay() }}
      >
        {/* Blurred overlay for coming soon */}
        {comingSoon && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="bg-primary/90 text-white px-4 py-2 rounded-full flex items-center mb-3">
              <Clock className="h-4 w-4 mr-2" />
              <span className="font-medium">Coming Soon</span>
            </div>
            <p className="text-sm text-center px-4">
              Sign up to be notified when this retreat becomes available
            </p>
          </div>
        )}

        <OptimizedImage
          src={retreat.image}
          alt={retreat.title}
          aspectRatio="video"
          className={cn("rounded-t-xl", comingSoon && "filter blur-[2px]")}
          onLoad={() => setImageLoaded(true)}
        />
        
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
              <CheckCircle className="mr-1 h-3 w-3" /> Sanghos
            </Badge>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 text-sage-500 mr-1" />
            <span className="text-sm text-muted-foreground">
              {retreat.location.city}, {retreat.location.state}
            </span>
          </div>

          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
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
                className="w-8 h-8 rounded-full"
                priority={true}
              />
              <span className="text-sm">{retreat.instructor.name}</span>
            </div>
            <p className="font-semibold">{formatCurrency(retreat.price)}</p>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default RetreatCard;
