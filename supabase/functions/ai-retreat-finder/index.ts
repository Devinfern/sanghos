
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
    const { messages, userLocation, requestType, preferences } = await req.json();
    
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
    
    // Format retreat data for AI
    const retreatDatabase = allRetreats.map((retreat, index) => {
      const categories = Array.isArray(retreat.category) ? retreat.category.join(', ') : (retreat.category || 'Wellness');
      const locationStr = `${retreat.location_city}, ${retreat.location_state}`;
      const priceStr = retreat.price ? `$${retreat.price}` : 'Contact for pricing';
      
      return `${index + 1}. ${retreat.title} (${retreat.id}): ${retreat.description}. Location: ${locationStr}. Date: ${retreat.date}. Duration: ${retreat.duration}. Price: ${priceStr}. Categories: ${categories}`;
    }).join('\n');

    let systemPrompt = '';
    let userPrompt = '';

    if (requestType === 'conversation') {
      systemPrompt = `You are an expert AI retreat finder assistant for Sanghos, a wellness retreat platform. You help users discover personalized retreat experiences through natural conversation.

Your capabilities:
- Understand user wellness needs, preferences, and constraints
- Recommend retreats from our database and partner networks (including InsightLA)
- Ask clarifying questions to better understand user requirements
- Extract structured preferences from natural conversation
- Provide personalized match scores (1-100) and explanations
- Consider location, budget, dates, interests, and experience level

Current Retreat Database:
${retreatDatabase}

Conversation Style:
- Warm, knowledgeable, and helpful
- Ask 1-2 follow-up questions per response
- Focus on understanding: budget, location preferences, duration, group size, experience level, specific interests
- Suggest specific retreats when you have enough information
- Always include match scores (1-100) and clear reasons for recommendations
- Consider real-time availability and current pricing

Location context: User is near ${userLocation}

Response format: JSON with message, recommendations array (with retreatId, title, matchScore, reason, location, date, time, description, price, duration, category), followUpQuestions array, and extractedPreferences object.`;

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
    }

    console.log('Sending request to OpenAI with model: gpt-4o-mini');
    
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
