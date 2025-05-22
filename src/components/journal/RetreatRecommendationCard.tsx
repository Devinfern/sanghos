
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/components/OptimizedImage";

interface RetreatRecommendation {
  retreatId: string;
  title: string;
  matchScore: number;
  reason: string;
  location?: string;
  date?: string;
  time?: string;
  description?: string;
  url?: string;
  image?: string;
  category?: string[];
}

interface RetreatRecommendationCardProps {
  recommendation: RetreatRecommendation;
  index: number;
  onNavigate: (retreatId: string) => void;
}

const RetreatRecommendationCard = ({ recommendation, index, onNavigate }: RetreatRecommendationCardProps) => {
  const { retreatId, title, matchScore, reason, location, date, time, description, url, image } = recommendation;

  // Determine gradient color based on match score
  const getScoreGradient = (score: number) => {
    if (score >= 0.85) return "from-emerald-500 to-emerald-400";
    if (score >= 0.75) return "from-green-500 to-emerald-400";
    if (score >= 0.65) return "from-lime-500 to-green-400";
    if (score >= 0.5) return "from-amber-500 to-yellow-400";
    return "from-orange-500 to-amber-400";
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-sage-200/30 hover:border-sage-200/60 transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          {image && (
            <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
              <div className="w-full h-full overflow-hidden">
                {image && (
                  <OptimizedImage
                    src={image}
                    alt={title}
                    className="w-full h-full"
                    aspectRatio="custom" 
                    objectFit="cover"
                    loadingClassName="bg-muted animate-pulse"
                  />
                )}
              </div>
            </div>
          )}
          
          <div className={cn("p-5 space-y-4", image ? "md:w-3/4" : "w-full")}>
            <div className="flex justify-between items-start gap-3">
              <div>
                {date && (
                  <div className="flex items-center text-sm font-medium text-sage-600 mb-2">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-sage-500" />
                    {date}
                  </div>
                )}
                <h3 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h3>
              </div>
              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getScoreGradient(matchScore)} text-white font-medium text-sm shrink-0`}>
                {Math.round(matchScore * 100)}% match
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-gray-700">{reason}</p>
              
              {description && (
                <p className="text-gray-600 text-sm line-clamp-2 mt-1">{description}</p>
              )}
            </div>
            
            {(location || time) && (
              <div className="flex flex-wrap gap-4 bg-sage-50/70 p-3 rounded-lg">
                {location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-gray-400" />
                    <span className="text-sm">{location}</span>
                  </div>
                )}
                {time && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-gray-400" />
                    <span className="text-sm">{time}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                onClick={() => onNavigate(retreatId)}
                className="border-sage-200 text-sage-700 hover:bg-sage-50 hover:text-sage-900 group"
              >
                <span className="flex items-center gap-2">
                  {url ? (
                    <>
                      View Event
                      <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  ) : (
                    <>
                      View Retreat
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RetreatRecommendationCard;
