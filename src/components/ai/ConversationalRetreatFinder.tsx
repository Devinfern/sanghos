
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { Send, Sparkles, MapPin, RefreshCw, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversation } from '@/hooks/useConversation';
import { AIRetreatFinderService } from '@/services/aiRetreatFinder';
import { toast } from 'sonner';

interface ConversationalRetreatFinderProps {
  userLocation?: string;
  onRetreatSelect?: (retreatId: string) => void;
}

const ConversationalRetreatFinder = ({ 
  userLocation = 'San Francisco, CA',
  onRetreatSelect 
}: ConversationalRetreatFinderProps) => {
  const [currentInput, setCurrentInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    conversation,
    addMessage,
    updatePreferences,
    setAnalyzing,
    resetConversation
  } = useConversation();

  const aiService = AIRetreatFinderService.getInstance();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  useEffect(() => {
    // Start with a welcome message
    if (conversation.messages.length === 0) {
      addMessage({
        role: 'assistant',
        content: "Hi! I'm your AI retreat finder. I'll help you discover the perfect wellness retreat based on your needs and preferences. What kind of wellness experience are you looking for?"
      });
    }
  }, [addMessage, conversation.messages.length]);

  const handleSendMessage = async () => {
    if (!currentInput.trim() || conversation.isAnalyzing) return;

    // Add user message
    addMessage({
      role: 'user',
      content: currentInput.trim()
    });

    const userMessage = currentInput.trim();
    setCurrentInput('');
    setAnalyzing(true);

    try {
      const response = await aiService.analyzeConversation(
        [...conversation.messages, { 
          id: '', 
          role: 'user', 
          content: userMessage, 
          timestamp: new Date() 
        }],
        userLocation
      );

      // Add AI response
      addMessage({
        role: 'assistant',
        content: response.message
      });

      // Update preferences
      if (response.extractedPreferences) {
        updatePreferences(response.extractedPreferences);
      }

      // Update recommendations and follow-up questions
      setRecommendations(response.recommendations || []);
      setFollowUpQuestions(response.followUpQuestions || []);

    } catch (error) {
      console.error('Error in conversation:', error);
      toast.error('Sorry, I encountered an issue. Please try again.');
      
      addMessage({
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Could you please try rephrasing your question?"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    setCurrentInput(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full border-none shadow-lg bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-peach/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-semibold text-brand-dark">AI Retreat Finder</h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetConversation}
            className="text-brand-primary hover:bg-brand-primary/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Search
          </Button>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {conversation.messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-brand-primary text-white ml-4' 
                    : 'bg-sage-100 text-sage-800 mr-4'
                }`}>
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && (
                      <MessageCircle className="w-4 h-4 mt-0.5 text-brand-primary" />
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {conversation.isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-sage-100 text-sage-800 p-3 rounded-lg mr-4 flex items-center gap-2">
                <Spinner className="w-4 h-4" />
                <span className="text-sm">Finding perfect retreats for you...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Follow-up Questions */}
        {followUpQuestions.length > 0 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-sage-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {followUpQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-brand-primary/10 text-xs"
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-sage-100 bg-sage-50/50">
          <div className="flex gap-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me about your ideal wellness retreat..."
              disabled={conversation.isAnalyzing}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!currentInput.trim() || conversation.isAnalyzing}
              className="bg-brand-primary hover:bg-brand-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {userLocation && (
            <div className="flex items-center gap-1 mt-2 text-xs text-sage-600">
              <MapPin className="w-3 h-3" />
              <span>Searching near {userLocation}</span>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="p-4 border-t border-sage-100">
            <h3 className="text-sm font-semibold text-sage-800 mb-3">Recommended Retreats</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recommendations.map((rec: any, index) => (
                <motion.div
                  key={rec.retreatId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-white rounded-lg border border-sage-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onRetreatSelect?.(rec.retreatId)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sage-800 text-sm">{rec.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {Math.round(rec.matchScore * 100)}% match
                    </Badge>
                  </div>
                  <p className="text-xs text-sage-600 mb-2">{rec.reason}</p>
                  {rec.location && (
                    <div className="flex items-center gap-1 text-xs text-sage-500">
                      <MapPin className="w-3 h-3" />
                      <span>{rec.location}</span>
                      {rec.date && <span>• {rec.date}</span>}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConversationalRetreatFinder;
