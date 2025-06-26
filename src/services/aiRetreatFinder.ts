
import { supabase } from '@/integrations/supabase/client';
import { ConversationMessage } from '@/hooks/useConversation';

export interface RetreatRecommendation {
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
  price?: number;
  duration?: string;
}

export interface AIResponse {
  message: string;
  recommendations: RetreatRecommendation[];
  followUpQuestions: string[];
  extractedPreferences: {
    interests?: string[];
    budget?: string;
    location?: string;
    duration?: string;
    groupSize?: string;
    experience?: string;
  };
}

export class AIRetreatFinderService {
  private static instance: AIRetreatFinderService;
  
  static getInstance(): AIRetreatFinderService {
    if (!AIRetreatFinderService.instance) {
      AIRetreatFinderService.instance = new AIRetreatFinderService();
    }
    return AIRetreatFinderService.instance;
  }

  async analyzeConversation(
    messages: ConversationMessage[], 
    userLocation?: string
  ): Promise<AIResponse> {
    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('ai-retreat-finder', {
        body: {
          messages: conversationHistory,
          userLocation: userLocation || 'San Francisco, CA',
          requestType: 'conversation'
        }
      });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error analyzing conversation:', error);
      throw new Error('Failed to analyze conversation with AI');
    }
  }

  async generateFollowUpQuestions(
    messages: ConversationMessage[],
    currentPreferences: any
  ): Promise<string[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-retreat-finder', {
        body: {
          messages: messages.map(msg => ({ role: msg.role, content: msg.content })),
          preferences: currentPreferences,
          requestType: 'followup'
        }
      });

      if (error) throw error;
      return data.questions || [];
    } catch (error) {
      console.error('Error generating follow-up questions:', error);
      return [];
    }
  }

  async findSimilarRetreats(
    preferences: any,
    location?: string
  ): Promise<RetreatRecommendation[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-retreat-finder', {
        body: {
          preferences,
          userLocation: location,
          requestType: 'search'
        }
      });

      if (error) throw error;
      return data.recommendations || [];
    } catch (error) {
      console.error('Error finding similar retreats:', error);
      return [];
    }
  }
}
