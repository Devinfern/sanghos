import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { Send, Sparkles, MapPin, RefreshCw, MessageCircle, ArrowRight, BookOpen, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversation } from '@/hooks/useConversation';
import { AIRetreatFinderService } from '@/services/aiRetreatFinder';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import UserPreferenceManager from './UserPreferenceManager';

interface EnhancedConversationalFinderProps {
  userLocation?: string;
  initialQuery?: string;
  currentRetreatContext?: any;
  onRetreatSelect?: (retreatId: string) => void;
  variant?: 'fullscreen' | 'modal' | 'embedded';
}

const EnhancedConversationalFinder = ({ 
  userLocation = 'San Francisco, CA',
  initialQuery = '',
  currentRetreatContext,
  onRetreatSelect,
  variant = 'fullscreen'
}: EnhancedConversationalFinderProps) => {
  const [currentInput, setCurrentInput] = useState(initialQuery);
  const [recommendations, setRecommendations] = useState([]);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [userIntent, setUserIntent] = useState('browsing');
  const [conversationQuality, setConversationQuality] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
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
    // Initialize conversation with context if available
    if (conversation.messages.length === 0) {
      let welcomeMessage = "Hi! I'm your AI retreat finder. I'll help you discover the perfect wellness retreat based on your needs and preferences.";
      
      if (currentRetreatContext) {
        welcomeMessage += ` I see you're looking at "${currentRetreatContext.title}". I can help you find similar retreats or explore other options based on your interests.`;
      }
      
      welcomeMessage += " What kind of wellness experience are you looking for?";
      
      addMessage({
        role: 'assistant',
        content: welcomeMessage
      });
    }
  }, [addMessage, conversation.messages.length, currentRetreatContext]);

  useEffect(() => {
    // Auto-send initial query if provided
    if (initialQuery && conversation.messages.length <= 1) {
      setCurrentInput(initialQuery);
      setTimeout(() => {
        handleSendMessage(initialQuery);
      }, 500);
    }
  }, [initialQuery, conversation.messages.length]);

  const handleSendMessage = async (messageContent?: string) => {
    const message = messageContent || currentInput.trim();
    if (!message || conversation.isAnalyzing) return;

    // Add user message
    addMessage({
      role: 'user',
      content: message
    });

    if (!messageContent) {
      setCurrentInput('');
    }
    setAnalyzing(true);

    try {
      // Get stored user preferences
      const storedPreferences = localStorage.getItem('userPreferences_current');
      const previousPreferences = storedPreferences ? JSON.parse(storedPreferences) : {};

      // Enhanced conversation analysis with context
      const response = await aiService.analyzeConversationWithContext(
        [...conversation.messages, { 
          id: '', 
          role: 'user', 
          content: message, 
          timestamp: new Date() 
        }],
        previousPreferences,
        userLocation
      );

      // Add AI response
      addMessage({
        role: 'assistant',
        content: response.message
      });

      // Update state with enhanced data
      if (response.extractedPreferences) {
        updatePreferences(response.extractedPreferences);
        // Save to localStorage for persistence
        localStorage.setItem('userPreferences_current', JSON.stringify(response.extractedPreferences));
      }

      setRecommendations(response.recommendations || []);
      setFollowUpQuestions(response.followUpQuestions || []);
      setUserIntent(response.userIntent || 'browsing');
      setConversationQuality(response.conversationQuality || 0);

      // Auto-navigate if user shows booking intent and we have good recommendations
      if (response.userIntent === 'ready_to_book' && response.recommendations?.length > 0) {
        toast.success('Found great matches! These retreats are ready for booking.');
      }

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
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRetreatClick = (retreatId: string) => {
    if (onRetreatSelect) {
      onRetreatSelect(retreatId);
    } else {
      navigate(`/retreat/${retreatId}`);
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'ready_to_book': return 'bg-green-100 text-green-800';
      case 'comparing': return 'bg-blue-100 text-blue-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'planning_ahead': return 'bg-purple-100 text-purple-800';
      default: return 'bg-sage-100 text-sage-800';
    }
  };

  const containerClasses = variant === 'fullscreen' 
    ? 'w-full max-w-4xl mx-auto min-h-[80vh]' 
    : 'w-full';

  return (
    <div className={containerClasses}>
      <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-primary/10 to-brand-peach/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-brand-dark">AI Retreat Finder</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className={`text-xs ${getIntentColor(userIntent)}`}>
                    {userIntent.replace('_', ' ')}
                  </Badge>
                  {conversationQuality > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {conversationQuality}% match quality
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowPreferences(!showPreferences)}
                className="text-brand-primary hover:bg-brand-primary/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetConversation}
                className="text-brand-primary hover:bg-brand-primary/10"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* User Preferences Panel */}
          <AnimatePresence>
            {showPreferences && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b border-sage-100 overflow-hidden"
              >
                <div className="p-4">
                  <UserPreferenceManager
                    currentPreferences={conversation.userPreferences}
                    onPreferencesUpdate={updatePreferences}
                    variant="expanded"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages Area */}
          <div className={`overflow-y-auto p-4 space-y-4 ${variant === 'fullscreen' ? 'h-96 md:h-[500px]' : 'h-80'}`}>
            <AnimatePresence>
              {conversation.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] md:max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-brand-primary text-white ml-4' 
                      : 'bg-sage-100 text-sage-800 mr-4'
                  }`}>
                    <div className="flex items-start gap-2">
                      {message.role === 'assistant' && (
                        <MessageCircle className="w-4 h-4 mt-0.5 text-brand-primary flex-shrink-0" />
                      )}
                      <p className="text-sm leading-relaxed break-words">{message.content}</p>
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
                    className="cursor-pointer hover:bg-brand-primary/10 text-xs border-brand-primary/20 text-brand-primary transition-colors"
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
                onClick={() => handleSendMessage()}
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
            <div className="border-t border-sage-100">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-sage-800">
                    {userIntent === 'ready_to_book' ? 'Ready to Book' : 'Recommended Retreats'}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {recommendations.length} found
                  </Badge>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recommendations.map((rec: any, index) => (
                    <motion.div
                      key={rec.retreatId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white rounded-lg border border-sage-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
                      onClick={() => handleRetreatClick(rec.retreatId)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sage-800 text-sm group-hover:text-brand-primary transition-colors">
                          {rec.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs bg-brand-primary/10 text-brand-primary">
                            {Math.round(rec.matchScore)}% match
                          </Badge>
                          <ArrowRight className="w-4 h-4 text-sage-400 group-hover:text-brand-primary transition-colors" />
                        </div>
                      </div>
                      <p className="text-xs text-sage-600 mb-3 line-clamp-2">{rec.reason}</p>
                      <div className="flex items-center gap-4 text-xs text-sage-500">
                        {rec.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{rec.location}</span>
                          </div>
                        )}
                        {rec.date && <span>• {rec.date}</span>}
                        {rec.price && <span>• ${rec.price}</span>}
                      </div>
                      {userIntent === 'ready_to_book' && (
                        <div className="mt-3 pt-3 border-t border-sage-100">
                          <Button 
                            size="sm" 
                            className="w-full bg-brand-primary hover:bg-brand-primary/90"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/retreat/${rec.retreatId}`);
                            }}
                          >
                            <BookOpen className="w-4 h-4 mr-2" />
                            View & Book
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedConversationalFinder;