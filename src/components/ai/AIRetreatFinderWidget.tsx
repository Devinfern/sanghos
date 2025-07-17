import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface AIRetreatFinderWidgetProps {
  variant?: 'compact' | 'featured' | 'inline';
  onExpand?: () => void;
}

const AIRetreatFinderWidget = ({ 
  variant = 'compact',
  onExpand
}: AIRetreatFinderWidgetProps) => {
  const [quickQuery, setQuickQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleQuickSearch = () => {
    if (!quickQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    
    // Store the query and navigate to the AI finder page
    sessionStorage.setItem('aiRetreatFinderQuery', quickQuery);
    navigate('/ai-retreat-finder');
  };

  const handleExpand = () => {
    if (onExpand) {
      onExpand();
    } else {
      setIsExpanded(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickSearch();
    }
  };

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto"
      >
        <Card className="border-none shadow-xl bg-gradient-to-r from-brand-primary/5 to-brand-peach/5 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-peach rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-brand-dark">
              Find Your Perfect Retreat with AI
            </CardTitle>
            <p className="text-sage-600 text-lg">
              Tell us what you're looking for and let our AI recommend personalized retreat experiences
            </p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="I'm looking for a meditation retreat to help with stress..."
                className="flex-1 h-12 text-base"
              />
              <Button 
                onClick={handleQuickSearch}
                className="h-12 px-8 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chat
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-sage-600 mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Mindfulness retreat near me',
                  'Weekend yoga retreat',
                  'Beginner meditation',
                  'Stress relief retreat'
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuickQuery(suggestion);
                      sessionStorage.setItem('aiRetreatFinderQuery', suggestion);
                      navigate('/ai-retreat-finder');
                    }}
                    className="text-xs hover:bg-brand-primary/10 hover:border-brand-primary/20"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Card className="border-l-4 border-l-brand-primary bg-gradient-to-r from-brand-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-brand-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-brand-dark mb-2">
                  Get AI-Powered Recommendations
                </h3>
                <p className="text-sage-600 text-sm mb-4">
                  Let our AI help you find similar retreats or discover new experiences based on your preferences.
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleExpand}
                    variant="outline"
                    size="sm"
                    className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with AI
                  </Button>
                  <Button 
                    onClick={() => navigate('/ai-retreat-finder')}
                    variant="ghost"
                    size="sm"
                    className="text-brand-primary hover:bg-brand-primary/10"
                  >
                    Open Full Chat
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Compact variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="border-brand-primary/20 hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-medium text-brand-dark">AI Retreat Finder</h3>
                <p className="text-sm text-sage-600">Get personalized recommendations</p>
              </div>
            </div>
            <Button 
              onClick={handleExpand}
              size="sm"
              className="bg-brand-primary hover:bg-brand-primary/90 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIRetreatFinderWidget;