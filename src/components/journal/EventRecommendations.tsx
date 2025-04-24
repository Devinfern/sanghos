
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { MapPin, Calendar, Clock, ExternalLink, ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

interface EventRecommendationsProps {
  isLoading: boolean;
  recommendations: RetreatRecommendation[];
  userLocation: string;
  error: string | null;
  onRetry: () => void;
  onNavigateToRetreat: (retreatId: string) => void;
}

const EventRecommendations = ({
  isLoading,
  recommendations,
  userLocation,
  error,
  onRetry,
  onNavigateToRetreat
}: EventRecommendationsProps) => {
  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <Spinner className="mx-auto mb-4 h-8 w-8 text-sage-600" />
          <p className="text-sage-600">Finding events near you...</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        {error ? (
          <div className="space-y-3">
            <Search className="h-12 w-12 mx-auto text-sage-400" />
            <p className="text-sage-700 font-medium">Unable to find events</p>
            <p className="text-sage-600 max-w-md mx-auto text-sm">{error}</p>
            <Button variant="outline" onClick={onRetry} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : (
          <p className="text-sage-600">
            No matching events found yet. Write in your journal to get recommendations.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-sage-900">
          {recommendations[0].url
            ? 'Wellness Events Near ' + userLocation
            : 'Retreat Recommendations'}
        </h3>
      </div>
      
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.retreatId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="border border-sage-200/20 hover:border-sage-300/30 transition-all duration-300 hover:shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {rec.image && (
                <div className="md:w-1/4 h-40 md:h-auto">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86";
                    }}
                  />
                </div>
              )}
              
              <CardContent className={cn("pt-6 space-y-4", rec.image ? "md:w-3/4" : "w-full")}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg text-sage-900">{rec.title}</h4>
                  <div className="bg-sage-100/50 text-sage-700 text-sm py-1 px-3 rounded-full">
                    {Math.round(rec.matchScore * 100)}% match
                  </div>
                </div>
                
                <p className="text-sage-600">{rec.reason}</p>
                
                {rec.description && (
                  <p className="text-sage-700 text-sm line-clamp-2">{rec.description}</p>
                )}
                
                {(rec.location || rec.date || rec.time) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-sage-50/50 p-3 rounded-lg">
                    {rec.location && (
                      <div className="flex items-center text-sage-700">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{rec.location}</span>
                      </div>
                    )}
                    {rec.date && (
                      <div className="flex items-center text-sage-700">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{rec.date}</span>
                      </div>
                    )}
                    {rec.time && (
                      <div className="flex items-center text-sage-700">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{rec.time}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => rec.url ? window.open(rec.url, "_blank") : onNavigateToRetreat(rec.retreatId)}
                    className="border-sage-300 text-sage-700 hover:bg-sage-50 hover:text-sage-800"
                  >
                    {rec.url ? (
                      <>
                        View Event
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        View Retreat
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default EventRecommendations;
