
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";
import { Retreat, formatCurrency, getRemainingText } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import OptimizedImage from "./OptimizedImage";

interface RetreatCardProps {
  retreat: Retreat;
  index?: number;
}

const RetreatCard = ({ retreat, index = 0 }: RetreatCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animation delay based on index
  const getAnimationDelay = () => {
    return `${100 + index * 100}ms`;
  };

  return (
    <Link to={`/retreat/${retreat.id}`}>
      <div
        className={cn(
          "retreat-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
          "opacity-0 animate-fade-up"
        )}
        style={{ animationDelay: getAnimationDelay() }}
      >
        <OptimizedImage
          src={retreat.image}
          alt={retreat.title}
          aspectRatio="video"
          className="rounded-t-xl"
          onLoad={() => setImageLoaded(true)}
        />
        
        {retreat.featured && (
          <Badge
            className="absolute top-3 right-3 bg-primary/90 hover:bg-primary/90"
            variant="default"
          >
            Featured
          </Badge>
        )}

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
    </Link>
  );
};

export default RetreatCard;
