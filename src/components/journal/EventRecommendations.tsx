
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import RetreatRecommendationCard from "./RetreatRecommendationCard";

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
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <Spinner className="mx-auto mb-4 h-8 w-8 text-brand-primary" />
          <p className="text-sage-700 font-medium">Finding wellness options near you</p>
          <p className="text-sage-600 text-sm mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mb-4">
          <MapPin className="h-8 w-8 text-sage-500" />
        </div>
        {error ? (
          <div className="space-y-3 max-w-md">
            <h3 className="text-lg font-medium text-sage-800">Unable to find events</h3>
            <p className="text-sage-600 text-sm">{error}</p>
            <Button variant="outline" onClick={onRetry} className="mt-2">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-3 max-w-md">
            <h3 className="text-lg font-medium text-sage-800">No recommendations yet</h3>
            <p className="text-sage-600 text-sm">
              Write in your journal to receive personalized wellness recommendations based on your needs.
            </p>
            <Button onClick={onRetry} className="mt-2">
              Start Journaling
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-sage-900">
            {recommendations[0].url
              ? `Wellness Events Near ${userLocation}`
              : 'Retreat Recommendations'}
          </h3>
          <p className="text-sm text-sage-600">
            Based on your wellness journal
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <RetreatRecommendationCard
            key={recommendation.retreatId}
            recommendation={recommendation}
            index={index}
            onNavigate={onNavigateToRetreat}
          />
        ))}
      </div>
    </div>
  );
};

export default EventRecommendations;
