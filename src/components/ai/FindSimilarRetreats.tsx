import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MapPin, Calendar, DollarSign, Clock, ArrowRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIRetreatFinderService } from '@/services/aiRetreatFinder';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface FindSimilarRetreatsProps {
  currentRetreat: any;
  userLocation?: string;
}

const FindSimilarRetreats = ({ currentRetreat, userLocation }: FindSimilarRetreatsProps) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const aiService = AIRetreatFinderService.getInstance();

  const findSimilarRetreats = async () => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Create preferences based on current retreat
      const preferences = {
        interests: currentRetreat.category || [],
        location: `${currentRetreat.location?.city || ''}, ${currentRetreat.location?.state || ''}`,
        duration: currentRetreat.duration || '',
        priceRange: currentRetreat.price ? `Around $${currentRetreat.price}` : '',
        experience: 'similar to current retreat',
        excludeRetreatId: currentRetreat.id // Exclude current retreat from results
      };

      const results = await aiService.findSimilarRetreats(preferences, userLocation);
      setRecommendations(results.slice(0, 3)); // Show top 3 similar retreats
      
      if (results.length === 0) {
        toast.info('No similar retreats found. Try the AI chat for more options.');
      }
    } catch (error) {
      console.error('Error finding similar retreats:', error);
      toast.error('Failed to find similar retreats. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetreatClick = (retreatId: string) => {
    navigate(`/retreat/${retreatId}`);
  };

  const handleOpenAIChat = () => {
    // Store current retreat context for AI chat
    const context = {
      currentRetreat: currentRetreat.title,
      categories: currentRetreat.category,
      location: `${currentRetreat.location?.city}, ${currentRetreat.location?.state}`,
      duration: currentRetreat.duration,
      price: currentRetreat.price
    };
    
    sessionStorage.setItem('aiRetreatFinderContext', JSON.stringify(context));
    navigate('/ai-retreat-finder');
  };

  useEffect(() => {
    // Auto-find similar retreats when component mounts
    findSimilarRetreats();
  }, [currentRetreat.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-brand-primary/20 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-peach/5 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-brand-dark">
                  Similar Retreats
                </CardTitle>
                <p className="text-sm text-sage-600 mt-1">
                  AI-powered recommendations based on this retreat
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={findSimilarRetreats}
                variant="outline"
                size="sm"
                disabled={isLoading}
                className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={handleOpenAIChat}
                variant="outline"
                size="sm"
                className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Chat
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-sage-600">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Finding similar retreats...</span>
                </div>
              </motion.div>
            ) : recommendations.length > 0 ? (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="divide-y divide-sage-100"
              >
                {recommendations.map((retreat, index) => (
                  <motion.div
                    key={retreat.retreatId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-sage-50/50 transition-colors cursor-pointer group"
                    onClick={() => handleRetreatClick(retreat.retreatId)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                        {retreat.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs bg-brand-primary/10 text-brand-primary">
                          {Math.round(retreat.matchScore)}% match
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-sage-400 group-hover:text-brand-primary transition-colors" />
                      </div>
                    </div>
                    
                    <p className="text-sm text-sage-600 mb-4 line-clamp-2">
                      {retreat.reason}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs text-sage-600">
                      {retreat.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{retreat.location}</span>
                        </div>
                      )}
                      {retreat.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{retreat.date}</span>
                        </div>
                      )}
                      {retreat.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{retreat.duration}</span>
                        </div>
                      )}
                      {retreat.price && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          <span>${retreat.price}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : hasSearched ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 text-center"
              >
                <div className="text-sage-600 mb-4">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 text-sage-400" />
                  <p className="text-sm">No similar retreats found in our current database.</p>
                </div>
                <Button
                  onClick={handleOpenAIChat}
                  variant="outline"
                  className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Chat with AI for More Options
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FindSimilarRetreats;