
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
  source?: string;
  bookingUrl?: string;
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

      // Enhance recommendations with additional data if available
      if (data.recommendations) {
        data.recommendations = await this.enhanceRecommendations(data.recommendations);
      }

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
      
      const recommendations = data.recommendations || [];
      return await this.enhanceRecommendations(recommendations);
    } catch (error) {
      console.error('Error finding similar retreats:', error);
      return [];
    }
  }

  // New method to enhance recommendations with additional metadata
  private async enhanceRecommendations(recommendations: RetreatRecommendation[]): Promise<RetreatRecommendation[]> {
    return recommendations.map(rec => {
      // Add booking URLs and images based on source
      if (rec.source === 'InsightLA') {
        rec.image = rec.image || this.getDefaultImageForCategory(rec.category);
        rec.bookingUrl = rec.url || 'https://insightla.org';
      } else {
        // For Sanghos retreats, generate appropriate URLs
        rec.bookingUrl = rec.url || `/retreat/${rec.retreatId}`;
        rec.image = rec.image || this.getDefaultImageForCategory(rec.category);
      }
      
      return rec;
    });
  }

  private getDefaultImageForCategory(category?: string[]): string {
    if (!category || category.length === 0) return '/lovable-uploads/17bc5976-d935-434d-807f-a14574abd422.png';
    
    const primaryCategory = category[0].toLowerCase();
    
    if (primaryCategory.includes('meditation') || primaryCategory.includes('mindfulness')) {
      return '/lovable-uploads/17bc5976-d935-434d-807f-a14574abd422.png';
    } else if (primaryCategory.includes('yoga') || primaryCategory.includes('movement')) {
      return '/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png';
    } else if (primaryCategory.includes('sound') || primaryCategory.includes('healing')) {
      return '/lovable-uploads/fa3f6f2b-dad3-4ff9-a13f-a7753609b9f1.png';
    } else {
      return '/lovable-uploads/f0037ad0-9984-49e7-8f7f-cdb9a489329b.png';
    }
  }
}
