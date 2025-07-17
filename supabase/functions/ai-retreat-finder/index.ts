
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userLocation, requestType, preferences, query, previousPreferences, conversationContext } = await req.json();
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
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
      .gte('date', new Date().toISOString().split('T')[0]) // Only future retreats
      .order('date', { ascending: true });

    if (retreatsError) {
      console.error('Error fetching retreats:', retreatsError);
    }

    // Include partner retreat data (InsightLA)
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

    // Combine all retreats
    const allRetreats = [...(liveRetreats || []), ...partnerRetreats];
    
    // Enhanced retreat data formatting for AI with semantic context
    const retreatDatabase = allRetreats.map((retreat, index) => {
      const categories = Array.isArray(retreat.category) ? retreat.category.join(', ') : (retreat.category || 'Wellness');
      const locationStr = `${retreat.location_city}, ${retreat.location_state}`;
      const priceStr = retreat.price ? `$${retreat.price}` : 'Contact for pricing';
      const availabilityStr = retreat.remaining ? `${retreat.remaining} spots remaining` : 'Availability unknown';
      
      return `${index + 1}. ID: ${retreat.id}
Title: ${retreat.title}
Description: ${retreat.description}
Location: ${locationStr}
Date: ${retreat.date}
Time: ${retreat.time}
Duration: ${retreat.duration}
Price: ${priceStr}
Categories: ${categories}
Availability: ${availabilityStr}
Source: ${retreat.source || 'Sanghos'}`;
    }).join('\n\n');

    // Helper function to calculate distance score (simplified)
    const calculateLocationScore = (userLocation: string, retreatLocation: string) => {
      const userLower = userLocation.toLowerCase();
      const retreatLower = retreatLocation.toLowerCase();
      
      // Extract state/region for matching
      const userState = userLower.split(',').pop()?.trim();
      const retreatState = retreatLower.split(',').pop()?.trim();
      
      if (userState === retreatState) return 90; // Same state
      if (userLower.includes('ca') && retreatLower.includes('ca')) return 85;
      if (userLower.includes('ny') && retreatLower.includes('ny')) return 85;
      return 60; // Different regions
    };

    // Helper function to calculate price score
    const calculatePriceScore = (price: number, budgetRange?: string) => {
      if (!budgetRange) return 70; // Neutral if no budget specified
      
      const budget = budgetRange.toLowerCase();
      if (budget.includes('under 100') && price <= 100) return 95;
      if (budget.includes('100-300') && price >= 100 && price <= 300) return 95;
      if (budget.includes('300-500') && price >= 300 && price <= 500) return 95;
      if (budget.includes('over 500') && price > 500) return 95;
      
      // Penalty for being outside budget range
      if (budget.includes('under 100') && price > 100) return 30;
      if (budget.includes('100-300') && (price < 100 || price > 300)) return 40;
      
      return 60; // Default for unclear budget matching
    };

    let systemPrompt = '';
    let userPrompt = '';

    if (requestType === 'conversation') {
      systemPrompt = `You are an expert AI retreat finder assistant for Sanghos, a wellness retreat platform. You help users discover personalized retreat experiences through natural conversation.

ENHANCED AI CAPABILITIES:

1. MULTI-FACTOR SCORING ALGORITHM:
   - Location proximity: Higher scores for retreats near user location
   - Budget alignment: Score based on how well price matches stated budget
   - Category relevance: Match user interests to retreat categories
   - Experience level: Consider beginner vs advanced preferences
   - Availability: Prioritize retreats with open spots
   - Date proximity: Prefer retreats happening sooner (unless user specifies otherwise)

2. CONVERSATION CONTEXT TRACKING:
   - Remember all preferences mentioned throughout conversation
   - Build cumulative understanding of user needs
   - Reference previous conversation points naturally
   - Avoid asking questions about information already provided

3. INTENT RECOGNITION:
   - Browsing: User exploring options, provide variety and ask questions
   - Comparing: User has specific options, provide detailed comparisons
   - Ready to book: User has clear preferences, provide top recommendations
   - Urgent: User needs something soon, prioritize immediate availability

4. SEMANTIC UNDERSTANDING:
   - Understand synonyms (e.g., "quiet" = "peaceful", "budget-friendly" = "affordable")
   - Recognize implicit preferences (e.g., "stressed at work" suggests need for relaxation)
   - Connect related concepts (e.g., "meditation" relates to "mindfulness" and "stress relief")

Current Retreat Database:
${retreatDatabase}

ENHANCED CONVERSATION GUIDELINES:
- Warm, knowledgeable, and helpful tone
- Ask 1-2 strategic follow-up questions per response
- Focus on understanding: budget, location preferences, duration, group size, experience level, specific interests
- Suggest specific retreats when you have enough information about user preferences
- Always include match scores (1-100) with detailed reasoning
- Consider real-time availability and current pricing
- Detect user's intent (browsing, comparing, ready to book, urgent)
- Reference previous conversation context naturally
- Use semantic understanding to connect related concepts

Location context: User is near ${userLocation}

SCORING METHODOLOGY:
Base score of 50, then adjust:
- Location: +40 for same state, +30 for same region, +10 for reasonable distance
- Budget: +30 for perfect match, +20 for close match, -20 for over budget
- Category: +20 for exact match, +15 for related categories, +10 for general wellness
- Experience: +10 for matching experience level
- Availability: +10 for good availability, +5 for limited spots, -10 for waitlist only
- Date: +5 for optimal timing

Response format: JSON with message, recommendations array (with retreatId, title, matchScore, reason, location, date, time, description, price, duration, category), followUpQuestions array, extractedPreferences object, and userIntent string.`;

      const conversationContext = messages.map((msg: any) => 
        `${msg.role}: ${msg.content}`
      ).join('\n');

      userPrompt = `Conversation so far:\n${conversationContext}\n\nBased on the retreat database above and this conversation, provide a helpful response with specific retreat recommendations if you have enough information about the user's preferences. Include match scores and clear reasoning. If you need more information, ask relevant follow-up questions.`;
    } else if (requestType === 'followup') {
      systemPrompt = `Generate 2-3 relevant follow-up questions to better understand the user's retreat preferences. Focus on aspects not yet covered in the conversation like budget, location preferences, experience level, specific interests, or scheduling.`;
      userPrompt = `Based on this conversation and current preferences, what questions should I ask next?\nConversation: ${JSON.stringify(messages)}\nPreferences: ${JSON.stringify(preferences)}`;
    } else if (requestType === 'search') {
      // Handle direct search requests
      systemPrompt = `You are a retreat recommendation engine. Based on the user's preferences, recommend the most suitable retreats from the database with match scores and explanations.

Current Retreat Database:
${retreatDatabase}

Provide recommendations in JSON format with detailed match scores and reasoning.`;
      userPrompt = `User preferences: ${JSON.stringify(preferences)}\nUser location: ${userLocation}\n\nRecommend the best matching retreats with scores and explanations.`;
    } else if (requestType === 'semantic_search') {
      // Handle semantic search requests
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
      // Handle intent detection requests
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

    console.log('Sending request to OpenAI with model: gpt-4.1-2025-04-14');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
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
    console.log('OpenAI response received:', data);

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
      // Fallback for non-JSON responses
      result = {
        message: content,
        recommendations: [],
        followUpQuestions: ["What's your budget range?", "How long would you like the retreat to be?"],
        extractedPreferences: {}
      };
    }

    console.log('Sending result:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in ai-retreat-finder function:", error);
    
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
