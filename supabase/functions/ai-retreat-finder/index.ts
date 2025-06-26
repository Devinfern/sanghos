
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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

    let systemPrompt = '';
    let userPrompt = '';

    if (requestType === 'conversation') {
      systemPrompt = `You are an expert AI retreat finder assistant for Sanghos, a wellness retreat platform. You help users discover personalized retreat experiences through natural conversation.

Your capabilities:
- Understand user wellness needs, preferences, and constraints
- Recommend retreats from our database and partner networks
- Ask clarifying questions to better understand user requirements
- Extract structured preferences from natural conversation
- Provide personalized match scores and explanations

Retreat Database:
1. Weekend Mindfulness Immersion (ret-1): Meditation, mindfulness, stress reduction
2. Sound Healing Journey (ret-2): Sound therapy, breathwork, relaxation
3. Forest Qigong Retreat (ret-3): Nature connection, gentle movement, forest settings
4. Mountain Yoga Escape (ret-4): Yoga, meditation, mountain settings

Conversation Style:
- Warm, knowledgeable, and helpful
- Ask 1-2 follow-up questions per response
- Focus on understanding: budget, location preferences, duration, group size, experience level
- Suggest specific retreats when you have enough information

Location context: User is near ${userLocation}

Response format: JSON with message, recommendations array, followUpQuestions array, and extractedPreferences object.`;

      const conversationContext = messages.map((msg: any) => 
        `${msg.role}: ${msg.content}`
      ).join('\n');

      userPrompt = `Conversation so far:\n${conversationContext}\n\nProvide a helpful response with retreat recommendations if appropriate, follow-up questions, and extracted preferences.`;
    } else if (requestType === 'followup') {
      systemPrompt = `Generate 2-3 relevant follow-up questions to better understand the user's retreat preferences. Focus on aspects not yet covered in the conversation.`;
      userPrompt = `Based on this conversation and current preferences, what questions should I ask next?\nConversation: ${JSON.stringify(messages)}\nPreferences: ${JSON.stringify(preferences)}`;
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
