import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Firecrawl scraping service
class RetreatScraper {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async scrapeRetreats(query: string, location: string = ''): Promise<any[]> {
    const searchUrls = this.generateSearchUrls(query, location);
    const scrapedData = [];

    for (const url of searchUrls) {
      try {
        const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: url,
            pageOptions: {
              onlyMainContent: true,
              waitFor: 2000
            },
            extractorOptions: {
              mode: 'llm-extraction',
              extractionPrompt: `Extract retreat information from this page. Return a JSON array of retreats with:
                - title: retreat name
                - description: brief description (max 200 chars)
                - instructor: teacher/instructor name
                - location: full location (city, state/country)
                - price: starting price (number only)
                - date: start date (YYYY-MM-DD format)
                - duration: duration description
                - image: main image URL
                - category: array of categories/tags
                - url: original retreat URL
                Only include actual retreat listings, not navigation or promotional content.`
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.llm_extraction) {
            const retreats = this.parseScrapedData(data.data.llm_extraction);
            scrapedData.push(...retreats);
          }
        }
      } catch (error) {
        console.error(`Error scraping ${url}:`, error);
      }
    }

    return this.deduplicateAndValidate(scrapedData);
  }

  private generateSearchUrls(query: string, location: string): string[] {
    const encodedQuery = encodeURIComponent(query);
    const encodedLocation = encodeURIComponent(location);
    
    const baseUrls = [
      `https://bookretreat.com/search?q=${encodedQuery}&location=${encodedLocation}`,
      `https://retreat.guru/search?query=${encodedQuery}&location=${encodedLocation}`,
      `https://www.eventbrite.com/d/online/wellness-retreat/?q=${encodedQuery}`,
    ];

    return baseUrls.slice(0, 2); // Limit to 2 sources to avoid rate limits
  }

  private parseScrapedData(extractedData: any): any[] {
    try {
      const parsed = typeof extractedData === 'string' ? JSON.parse(extractedData) : extractedData;
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error('Error parsing scraped data:', error);
      return [];
    }
  }

  private deduplicateAndValidate(retreats: any[]): any[] {
    const seen = new Set();
    const validated = [];

    for (const retreat of retreats) {
      // Basic validation
      if (!retreat.title || !retreat.location || !retreat.price) continue;
      
      // Deduplicate by title + location
      const key = `${retreat.title.toLowerCase()}-${retreat.location.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);

      // Clean and validate data
      const cleanRetreat = {
        id: `scraped-${crypto.randomUUID()}`,
        title: retreat.title.trim(),
        description: retreat.description?.trim() || '',
        instructor: retreat.instructor?.trim() || 'TBD',
        location: retreat.location.trim(),
        price: this.parsePrice(retreat.price),
        date: this.parseDate(retreat.date),
        duration: retreat.duration?.trim() || 'TBD',
        image: retreat.image || this.getDefaultImage(retreat.category),
        category: Array.isArray(retreat.category) ? retreat.category : [retreat.category || 'Wellness'],
        url: retreat.url || '',
        source: 'scraped',
        isScraped: true
      };

      validated.push(cleanRetreat);
    }

    return validated.slice(0, 5); // Limit to 5 scraped results
  }

  private parsePrice(priceStr: any): number {
    if (typeof priceStr === 'number') return priceStr;
    const cleaned = String(priceStr).replace(/[^\d.]/g, '');
    return parseFloat(cleaned) || 0;
  }

  private parseDate(dateStr: any): string {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    try {
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }

  private getDefaultImage(categories: any): string {
    const category = Array.isArray(categories) ? categories[0] : categories;
    const categoryStr = String(category || '').toLowerCase();
    
    if (categoryStr.includes('yoga')) return '/lovable-uploads/9f0938ba-7408-4146-aa4f-fc5a780ef721.png';
    if (categoryStr.includes('meditation')) return '/lovable-uploads/17bc5976-d935-434d-807f-a14574abd422.png';
    if (categoryStr.includes('sound')) return '/lovable-uploads/fa3f6f2b-dad3-4ff9-a13f-a7753609b9f1.png';
    return '/lovable-uploads/f0037ad0-9984-49e7-8f7f-cdb9a489329b.png';
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userLocation, requestType, preferences, query, previousPreferences, conversationContext } = await req.json();
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch live retreat data
    const { data: liveRetreats, error: retreatsError } = await supabase
      .from('retreats')
      .select('*')
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (retreatsError) {
      console.error('Error fetching retreats:', retreatsError);
    }

    // Include partner retreat data
    const partnerRetreats = [
      {
        id: "nyimc-day-of-insight-july-2025",
        title: "Day of Insight – A Daylong Meditation Retreat",
        description: "A special in-person or online daylong silent meditation retreat for those who want to reconnect and deepen their practice",
        location_city: "New York",
        location_state: "NY",
        date: "2025-07-19",
        time: "10:00 AM ET",
        duration: "7 hours",
        price: 50,
        category: ["Meditation", "Silent Retreat", "Mindfulness"],
        source: "InsightLA"
      },
      {
        id: "ada-yoga-mindfulness-movement-august-2025",
        title: "Daylong Mindfulness + Movement Retreat",
        description: "A day dedicated to self-care, reflection, and rejuvenation including yoga practices and myofascial release",
        location_city: "Mill Valley",
        location_state: "CA",
        date: "2025-08-31",
        time: "9:00 AM PT",
        duration: "8.5 hours",
        price: 180,
        category: ["Yoga", "Mindfulness", "Movement"],
        source: "InsightLA"
      },
      {
        id: "insightla-creating-refuge-gender-expansive-july-2025",
        title: "Creating Refuge in Community: A Retreat for Gender-Expansive Communities",
        description: "A safe and affirming space for gender-expansive individuals to explore mindfulness and self-compassion",
        location_city: "Big Bear",
        location_state: "CA", 
        date: "2025-07-16",
        time: "Check-in Wednesday",
        duration: "4 nights (Wed-Sun)",
        price: 450,
        category: ["Community", "Gender-Expansive", "Mindfulness"],
        source: "InsightLA"
      }
    ];

    // Combine existing retreats
    let allRetreats = [...(liveRetreats || []), ...partnerRetreats];
    let scrapedRetreats = [];

    // Enhanced scraping logic for conversation requests
    if (requestType === 'conversation' && FIRECRAWL_API_KEY) {
      try {
        // Generate scraping query from conversation
        const scrapeQuery = generateScrapeQuery(messages, preferences);
        
        if (scrapeQuery && allRetreats.length < 5) {
          console.log('Initiating intelligent scraping for:', scrapeQuery);
          
          const scraper = new RetreatScraper(FIRECRAWL_API_KEY);
          scrapedRetreats = await scraper.scrapeRetreats(scrapeQuery, userLocation);
          
          console.log(`Scraped ${scrapedRetreats.length} new retreats`);
          
          // Add scraped retreats to the mix
          allRetreats = [...allRetreats, ...scrapedRetreats];
        }
      } catch (error) {
        console.error('Error during intelligent scraping:', error);
      }
    }

    // Enhanced retreat data formatting
    const retreatDatabase = allRetreats.map((retreat, index) => {
      const categories = Array.isArray(retreat.category) ? retreat.category.join(', ') : (retreat.category || 'Wellness');
      const locationStr = retreat.location || `${retreat.location_city}, ${retreat.location_state}`;
      const priceStr = retreat.price ? `$${retreat.price}` : 'Contact for pricing';
      const availabilityStr = retreat.remaining ? `${retreat.remaining} spots remaining` : 'Availability unknown';
      const sourceStr = retreat.source || 'Sanghos';
      const scrapedNote = retreat.isScraped ? ' (🔍 Newly discovered)' : '';
      
      return `${index + 1}. ID: ${retreat.id}
Title: ${retreat.title}${scrapedNote}
Description: ${retreat.description}
Instructor: ${retreat.instructor || 'TBD'}
Location: ${locationStr}
Date: ${retreat.date}
Time: ${retreat.time}
Duration: ${retreat.duration}
Price: ${priceStr}
Categories: ${categories}
Availability: ${availabilityStr}
Source: ${sourceStr}`;
    }).join('\n\n');

    // Helper function to generate scraping query
    function generateScrapeQuery(messages: any[], preferences: any): string {
      const recentMessages = messages.slice(-5);
      const userMessages = recentMessages.filter(msg => msg.role === 'user');
      
      if (userMessages.length === 0) return '';
      
      const lastMessage = userMessages[userMessages.length - 1].content.toLowerCase();
      
      // Extract retreat types and interests
      const interests = [];
      if (lastMessage.includes('yoga') || preferences?.interests?.includes('yoga')) interests.push('yoga');
      if (lastMessage.includes('meditation') || preferences?.interests?.includes('meditation')) interests.push('meditation');
      if (lastMessage.includes('wellness') || preferences?.interests?.includes('wellness')) interests.push('wellness');
      if (lastMessage.includes('mindfulness') || preferences?.interests?.includes('mindfulness')) interests.push('mindfulness');
      if (lastMessage.includes('sound') || preferences?.interests?.includes('sound')) interests.push('sound healing');
      if (lastMessage.includes('silent') || preferences?.interests?.includes('silent')) interests.push('silent retreat');
      
      // Default to wellness if no specific interests found
      if (interests.length === 0) interests.push('wellness retreat');
      
      return interests.join(' ');
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (requestType === 'conversation') {
      systemPrompt = `You are an expert AI retreat finder assistant for Sanghos, a wellness retreat platform. You help users discover personalized retreat experiences through natural conversation.

ENHANCED AI CAPABILITIES WITH INTELLIGENT SCRAPING:

1. MULTI-FACTOR SCORING ALGORITHM:
   - Location proximity: Higher scores for retreats near user location
   - Budget alignment: Score based on how well price matches stated budget
   - Category relevance: Match user interests to retreat categories
   - Experience level: Consider beginner vs advanced preferences
   - Availability: Prioritize retreats with open spots
   - Date proximity: Prefer retreats happening sooner (unless user specifies otherwise)
   - Freshness bonus: +10 points for newly discovered retreats (🔍 indicator)

2. INTELLIGENT SCRAPING INTEGRATION:
   - When database results are limited, automatically discover new retreats
   - Newly scraped retreats marked with 🔍 indicator
   - Blend scraped results seamlessly with existing database
   - Mention when new retreats were discovered: "I found some new retreats that match your interests!"

3. CONVERSATION CONTEXT TRACKING:
   - Remember all preferences mentioned throughout conversation
   - Build cumulative understanding of user needs
   - Reference previous conversation points naturally
   - Avoid asking questions about information already provided

4. ENHANCED DISCOVERY MESSAGING:
   - When scraped retreats are included: "Great news! I discovered some new retreats that match your interests perfectly."
   - Highlight unique finds: "I found this amazing [retreat type] retreat that wasn't in our database before."
   - Encourage exploration: "Would you like me to search for more retreats in different locations?"

Current Retreat Database (including newly discovered retreats):
${retreatDatabase}

ENHANCED CONVERSATION GUIDELINES:
- Warm, knowledgeable, and helpful tone
- Mention when you've discovered new retreats during the conversation
- Ask 1-2 strategic follow-up questions per response
- Focus on understanding: budget, location preferences, duration, group size, experience level, specific interests
- Always include match scores (1-100) with detailed reasoning
- Give newly discovered retreats a +10 freshness bonus in scoring
- Use the 🔍 indicator to highlight scraped retreats in your responses

Location context: User is near ${userLocation}

SCORING METHODOLOGY:
Base score of 50, then adjust:
- Location: +40 for same state, +30 for same region, +10 for reasonable distance
- Budget: +30 for perfect match, +20 for close match, -20 for over budget
- Category: +20 for exact match, +15 for related categories, +10 for general wellness
- Experience: +10 for matching experience level
- Availability: +10 for good availability, +5 for limited spots, -10 for waitlist only
- Date: +5 for optimal timing
- Freshness: +10 for newly discovered retreats (🔍 indicator)

Response format: JSON with message, recommendations array (with retreatId, title, matchScore, reason, location, date, time, description, price, duration, category, isScraped boolean), followUpQuestions array, extractedPreferences object, and userIntent string.`;

      const conversationContext = messages.map((msg: any) => 
        `${msg.role}: ${msg.content}`
      ).join('\n');

      userPrompt = `Conversation so far:\n${conversationContext}\n\nBased on the retreat database above and this conversation, provide a helpful response with specific retreat recommendations. ${scrapedRetreats.length > 0 ? `I've discovered ${scrapedRetreats.length} new retreats that match the conversation context - make sure to highlight these discoveries!` : ''} Include match scores and clear reasoning. If you need more information, ask relevant follow-up questions.`;
    } else if (requestType === 'followup') {
      systemPrompt = `Generate 2-3 relevant follow-up questions to better understand the user's retreat preferences. Focus on aspects not yet covered in the conversation like budget, location preferences, experience level, specific interests, or scheduling.`;
      userPrompt = `Based on this conversation and current preferences, what questions should I ask next?\nConversation: ${JSON.stringify(messages)}\nPreferences: ${JSON.stringify(preferences)}`;
    } else if (requestType === 'search') {
      systemPrompt = `You are a retreat recommendation engine. Based on the user's preferences, recommend the most suitable retreats from the database with match scores and explanations.

Current Retreat Database:
${retreatDatabase}

Provide recommendations in JSON format with detailed match scores and reasoning.`;
      userPrompt = `User preferences: ${JSON.stringify(preferences)}\nUser location: ${userLocation}\n\nRecommend the best matching retreats with scores and explanations.`;
    } else if (requestType === 'semantic_search') {
      systemPrompt = `You are a semantic search engine for wellness retreats. Understand the user's query and find the most relevant retreats based on meaning, not just keywords.

Current Retreat Database:
${retreatDatabase}

SEMANTIC UNDERSTANDING:
- Connect related concepts (meditation = mindfulness = stress relief)
- Understand implicit needs (work stress = need for relaxation)
- Match synonyms and related terms
- Consider context and intent

Provide recommendations in JSON format with semantic relevance scores and explanations.`;
      userPrompt = `Search query: "${query}"\nUser preferences: ${JSON.stringify(preferences)}\nUser location: ${userLocation}\n\nFind semantically relevant retreats with detailed explanations.`;
    } else if (requestType === 'intent_detection') {
      const conversationContext = messages.map((msg: any) => 
        `${msg.role}: ${msg.content}`
      ).join('\n');
      
      systemPrompt = `You are an intent detection system. Analyze the conversation to determine the user's intent.

POSSIBLE INTENTS:
- browsing: User is exploring options, asking general questions
- comparing: User has specific retreats in mind and wants to compare
- ready_to_book: User has clear preferences and is ready to make a decision
- urgent: User needs something soon and has time constraints
- planning_ahead: User is planning for future dates

Analyze the conversation and return JSON with "intent" field.`;
      userPrompt = `Conversation:\n${conversationContext}\n\nDetermine the user's intent based on their language patterns and questions.`;
    }

    console.log('Sending request to OpenAI with enhanced scraping context');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received with scraping integration');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response from OpenAI API');
    }

    let content = data.choices[0].message.content;

    // Try to parse as JSON, fallback to structured response
    let result;
    try {
      result = JSON.parse(content);
    } catch {
      result = {
        message: content,
        recommendations: [],
        followUpQuestions: ["What's your budget range?", "How long would you like the retreat to be?"],
        extractedPreferences: {}
      };
    }

    // Add scraping metadata to response
    if (scrapedRetreats.length > 0) {
      result.scrapingInfo = {
        newRetreatsFound: scrapedRetreats.length,
        sources: ['bookretreat.com', 'retreat.guru']
      };
    }

    console.log('Sending enhanced result with scraping data:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in enhanced ai-retreat-finder function:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message || "Failed to process AI request",
      message: "I'm sorry, I'm having trouble right now. Could you please try again?",
      recommendations: [],
      followUpQuestions: [],
      extractedPreferences: {}
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
