
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    preferences?: string[];
    location?: string;
    budget?: string;
    dates?: string;
  };
}

export interface ConversationState {
  messages: ConversationMessage[];
  userPreferences: {
    interests: string[];
    budget: string;
    location: string;
    duration: string;
    groupSize: string;
    experience: string;
  };
  isAnalyzing: boolean;
  conversationId: string | null;
}

export const useConversation = () => {
  const [conversation, setConversation] = useState<ConversationState>({
    messages: [],
    userPreferences: {
      interests: [],
      budget: '',
      location: '',
      duration: '',
      groupSize: '',
      experience: ''
    },
    isAnalyzing: false,
    conversationId: null
  });

  const addMessage = useCallback((message: Omit<ConversationMessage, 'id' | 'timestamp'>) => {
    const newMessage: ConversationMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    return newMessage;
  }, []);

  const updatePreferences = useCallback((preferences: Partial<ConversationState['userPreferences']>) => {
    setConversation(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, ...preferences }
    }));
  }, []);

  const setAnalyzing = useCallback((isAnalyzing: boolean) => {
    setConversation(prev => ({ ...prev, isAnalyzing }));
  }, []);

  const resetConversation = useCallback(() => {
    setConversation({
      messages: [],
      userPreferences: {
        interests: [],
        budget: '',
        location: '',
        duration: '',
        groupSize: '',
        experience: ''
      },
      isAnalyzing: false,
      conversationId: null
    });
  }, []);

  const generateConversationSummary = useCallback(() => {
    const userMessages = conversation.messages.filter(m => m.role === 'user');
    const preferences = conversation.userPreferences;
    
    return {
      messageCount: conversation.messages.length,
      userInputs: userMessages.map(m => m.content).join(' '),
      preferences,
      lastInteraction: conversation.messages[conversation.messages.length - 1]?.timestamp
    };
  }, [conversation]);

  return {
    conversation,
    addMessage,
    updatePreferences,
    setAnalyzing,
    resetConversation,
    generateConversationSummary
  };
};
