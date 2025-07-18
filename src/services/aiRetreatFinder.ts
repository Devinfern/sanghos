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
  isScraped?: boolean;
  instructor?: string;
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
    previousSearches?: string[];
    conversationContext?: string;
  };
  userIntent?: string;
  conversationQuality?: number;
  scrapingInfo?: {
    newRetreatsFound: number;
    sources: string[];
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
    // Use enhanced conversation analysis with empty previous preferences
    return this.analyzeConversationWithContext(messages, {}, userLocation);
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

  // Enhanced conversation analysis with intelligent scraping
  async analyzeConversationWithContext(
    messages: ConversationMessage[], 
    previousPreferences: any = {},
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
          requestType: 'conversation',
          previousPreferences,
          conversationContext: this.extractConversationContext(messages)
        }
      });

      if (error) throw error;

      // Enhance recommendations with additional data
      if (data.recommendations) {
        data.recommendations = await this.enhanceRecommendations(data.recommendations);
      }

      // Track conversation quality and scraping success
      data.conversationQuality = this.calculateConversationQuality(messages, data);

      // Log scraping success
      if (data.scrapingInfo?.newRetreatsFound > 0) {
        console.log(`🔍 Discovered ${data.scrapingInfo.newRetreatsFound} new retreats from: ${data.scrapingInfo.sources.join(', ')}`);
      }

      return data;
    } catch (error) {
      console.error('Error analyzing conversation with intelligent scraping:', error);
      throw new Error('Failed to analyze conversation with AI');
    }
  }

  // Semantic search with scraping fallback
  async semanticSearch(
    query: string,
    preferences: any = {},
    userLocation?: string
  ): Promise<RetreatRecommendation[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-retreat-finder', {
        body: {
          query,
          preferences,
          userLocation: userLocation || 'San Francisco, CA',
          requestType: 'semantic_search'
        }
      });

      if (error) throw error;
      
      const recommendations = data.recommendations || [];
      return await this.enhanceRecommendations(recommendations);
    } catch (error) {
      console.error('Error performing semantic search:', error);
      return [];
    }
  }

  // Intent detection for user messages
  async detectUserIntent(messages: ConversationMessage[]): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-retreat-finder', {
        body: {
          messages: messages.map(msg => ({ role: msg.role, content: msg.content })),
          requestType: 'intent_detection'
        }
      });

      if (error) throw error;
      return data.intent || 'browsing';
    } catch (error) {
      console.error('Error detecting user intent:', error);
      return 'browsing';
    }
  }

  // Extract conversation context for better understanding
  private extractConversationContext(messages: ConversationMessage[]): string {
    const recentMessages = messages.slice(-10);
    const userMessages = recentMessages.filter(msg => msg.role === 'user');
    
    const extractedTopics = userMessages.map(msg => {
      const content = msg.content.toLowerCase();
      const topics = [];
      
      if (content.includes('meditation') || content.includes('mindfulness')) topics.push('meditation');
      if (content.includes('yoga')) topics.push('yoga');
      if (content.includes('sound') || content.includes('healing')) topics.push('healing');
      if (content.includes('stress') || content.includes('anxiety')) topics.push('stress_relief');
      if (content.includes('beginner') || content.includes('new to')) topics.push('beginner_friendly');
      if (content.includes('advanced') || content.includes('experienced')) topics.push('advanced_level');
      if (content.includes('budget') || content.includes('affordable') || content.includes('cheap')) topics.push('budget_conscious');
      if (content.includes('premium') || content.includes('luxury')) topics.push('premium_experience');
      if (content.includes('soon') || content.includes('asap') || content.includes('this week')) topics.push('urgent');
      if (content.includes('planning') || content.includes('future') || content.includes('maybe')) topics.push('planning_ahead');
      
      return topics;
    }).flat();
    
    return Array.from(new Set(extractedTopics)).join(', ');
  }

  // Calculate conversation quality based on engagement
  private calculateConversationQuality(messages: ConversationMessage[], response: any): number {
    let quality = 50;
    
    if (messages.length > 5) quality += 20;
    if (messages.length > 10) quality += 10;
    
    if (response.extractedPreferences) {
      const prefCount = Object.keys(response.extractedPreferences).length;
      quality += prefCount * 5;
    }
    
    if (response.recommendations && response.recommendations.length > 0) {
      quality += 15;
      const avgMatchScore = response.recommendations.reduce((sum: number, rec: any) => sum + rec.matchScore, 0) / response.recommendations.length;
      if (avgMatchScore > 80) quality += 10;
    }

    // Bonus for successful scraping
    if (response.scrapingInfo?.newRetreatsFound > 0) {
      quality += 15;
    }
    
    return Math.min(100, quality);
  }

  // Enhanced method to enhance recommendations with additional metadata
  private async enhanceRecommendations(recommendations: RetreatRecommendation[]): Promise<RetreatRecommendation[]> {
    return recommendations.map(rec => {
      // Handle scraped retreats
      if (rec.isScraped) {
        rec.bookingUrl = rec.url || '#';
        rec.image = rec.image || this.getDefaultImageForCategory(rec.category);
      } else {
        // Handle existing retreats
        if (rec.source === 'InsightLA') {
          rec.image = rec.image || this.getDefaultImageForCategory(rec.category);
          rec.bookingUrl = rec.url || 'https://insightla.org';
        } else {
          rec.bookingUrl = rec.url || `/retreat/${rec.retreatId}`;
          rec.image = rec.image || this.getDefaultImageForCategory(rec.category);
        }
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
