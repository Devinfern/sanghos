
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { journalEntry } = await req.json();
    
    if (!journalEntry || journalEntry.trim().length === 0) {
      throw new Error("Journal entry is required");
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    // Get retreats from the database to use for recommendations
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a wellness coach specializing in analyzing journal entries to recommend wellness retreats.
            
            You'll be given retreat data from our database and asked to match the user's journal entry to the most suitable retreats. 
            
            Retreat data:
            1. Weekend Mindfulness Immersion (ret-1): Focus on meditation, mindfulness, yoga for stress reduction and finding peace.
            2. Sound Healing Journey (ret-2): Using sound therapy and breathwork for relaxation and stress release.
            3. Forest Qigong Retreat (ret-3): Nature connection, gentle movement, mindful awareness in forest settings.
            4. Mountain Yoga Escape (ret-4): Yoga sessions, meditation, balance and inner peace in mountain settings.
            
            Analyze the emotional state, wellness needs, and interests in the journal entry. Then recommend 1-3 retreats that would best address their needs.`
          },
          {
            role: 'user',
            content: `Journal entry: "${journalEntry}"
            
            Based on this journal entry, recommend the most suitable retreats (up to 3) from our database. For each retreat, provide:
            1. The retreat ID
            2. A match score (0.0-1.0) indicating how well it matches their needs
            3. A brief, personalized explanation of why this retreat would benefit them
            
            Format your response as valid JSON like this example:
            {
              "recommendations": [
                {
                  "retreatId": "ret-1",
                  "matchScore": 0.85,
                  "reason": "This retreat's focus on mindfulness would help address your anxiety and burnout."
                }
              ]
            }`
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    
    // Parse the JSON response from the LLM
    const content = data.choices[0].message.content;
    
    // Sometimes the API returns markdown-formatted JSON, so we need to extract just the JSON part
    const jsonMatch = content.match(/```json\n([\s\S]*)\n```/) || content.match(/```\n([\s\S]*)\n```/);
    
    let recommendationsData;
    if (jsonMatch && jsonMatch[1]) {
      recommendationsData = JSON.parse(jsonMatch[1].trim());
    } else {
      // If no markdown formatting, try to parse the entire response as JSON
      recommendationsData = JSON.parse(content);
    }

    return new Response(JSON.stringify(recommendationsData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in analyze-journal function:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message || "Failed to analyze journal entry" 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
