
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface RetreatHeroProps {
  onCategorySelect?: (category: string) => void;
  onTabChange?: (tab: string) => void;
  retreatCounts?: {
    all: number;
    sanghos: number;
    thirdparty: number;
  };
  activeTab?: string;
}

const RetreatHero = ({
  onCategorySelect,
  onTabChange,
  retreatCounts = {
    all: 0,
    sanghos: 0,
    thirdparty: 0
  },
  activeTab = "all"
}: RetreatHeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect when component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-sage-50 to-sage-100 pt-16 pb-12 md:pt-20 md:pb-14">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-sage-200/20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-sage-200/30 translate-x-1/4 translate-y-1/4"></div>
      
      {/* Animated sparkles */}
      <div className={`absolute top-20 right-20 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Sparkles className="h-6 w-6 text-primary/40 animate-pulse" />
      </div>
      <div className={`absolute bottom-20 left-20 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Sparkles className="h-5 w-5 text-primary/40 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-900 mb-4">
              Find Your Perfect <span className="text-primary">Daylong Retreat</span>
            </h1>
            
            <p className="text-lg text-sage-700 mb-6 max-w-2xl mx-auto">
              Discover curated retreats designed to help you reconnect with yourself, 
              find balance, and cultivate mindfulness in stunning locations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetreatHero;
