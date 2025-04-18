
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
// Import Firecrawl from a URL instead of using npm package syntax
import { FirecrawlApp } from "https://esm.sh/@mendable/firecrawl-js"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log("Received request to extract-event-data function");
    
    let requestData;
    try {
      requestData = await req.json();
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }
    
    const { url } = requestData;
    
    if (!url || typeof url !== 'string') {
      console.error("Invalid or missing URL:", url);
      return new Response(
        JSON.stringify({ error: 'Valid URL is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }
    
    console.log(`Starting crawl for URL: ${url}`);
    
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('Firecrawl API key not configured');
      return new Response(
        JSON.stringify({ error: 'API configuration error: Missing FIRECRAWL_API_KEY' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log("Initializing Firecrawl with API key");
    const firecrawl = new FirecrawlApp({ apiKey });
    
    console.log("Sending crawl request to Firecrawl API");
    const response = await firecrawl.crawlUrl(url, {
      limit: 1,
      scrapeOptions: {
        formats: ['markdown', 'html'],
      }
    });

    console.log("Firecrawl response received:", JSON.stringify(response));

    if (!response.success) {
      console.error('Crawl failed:', response);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to crawl URL', 
          details: response 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    const rawData = response.data && response.data[0] && response.data[0].content && response.data[0].content.markdown;
    if (!rawData) {
      console.error('No content found in Firecrawl response:', response);
      return new Response(
        JSON.stringify({ error: 'No content found at the provided URL' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404 
        }
      );
    }
    
    const eventData = extractEventData(rawData, url);
    console.log('Extracted event data:', eventData);

    return new Response(
      JSON.stringify(eventData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    );
  } catch (error) {
    console.error('Error in extract-event-data:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        stack: error.stack,
        type: error.name 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      },
    );
  }
})

// Enhanced event data extraction with better pattern matching
function extractEventData(text: string, sourceUrl: string) {
  const eventData = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: {
      name: '',
      address: '',
      city: '',
      state: ''
    },
    price: 0,
    category: [] as string[],
    instructorName: '',
    image: '',
    capacity: 0,
    remaining: 0,
    sourceUrl
  }

  // Extract title - look for prominent text patterns
  const titlePatterns = [
    /^#\s*(.+)$/m,  // Markdown h1
    /<h1[^>]*>([^<]+)<\/h1>/i,  // HTML h1
    /^(.{20,100}?)(?:\n|$)/m  // First substantial line
  ]

  for (const pattern of titlePatterns) {
    const match = text.match(pattern)
    if (match) {
      eventData.title = match[1].trim()
      break
    }
  }

  // Extract description - look for substantial paragraphs
  const descPatterns = [
    /\n\n([^#\n].{100,500}?)(?:\n\n|$)/m,  // Markdown paragraph
    /<p[^>]*>([^<]{100,500})<\/p>/i  // HTML paragraph
  ]

  for (const pattern of descPatterns) {
    const match = text.match(pattern)
    if (match) {
      eventData.description = match[1].trim()
      break
    }
  }
  
  // If no description was found with the patterns above, take the first substantial paragraph
  if (!eventData.description) {
    const fallbackDescPattern = /\n\n([^#\n].{30,}?)(?:\n\n|$)/m;
    const match = text.match(fallbackDescPattern);
    if (match) {
      eventData.description = match[1].trim();
    }
  }

  // Enhanced date extraction with multiple formats
  const datePatterns = [
    /(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/gi,
    /\d{4}-\d{2}-\d{2}/g,
    /\d{1,2}\/\d{1,2}\/\d{4}/g,
    /(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*,\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s+\d{4}/gi
  ]

  for (const pattern of datePatterns) {
    const match = text.match(pattern)
    if (match) {
      const dateStr = match[0]
      try {
        const date = new Date(dateStr)
        if (!isNaN(date.getTime())) {
          eventData.date = date.toISOString().split('T')[0]
          break
        }
      } catch (e) {
        console.warn('Failed to parse date:', dateStr)
      }
    }
  }
  
  // If no valid date was found, default to today's date
  if (!eventData.date) {
    eventData.date = new Date().toISOString().split('T')[0];
  }

  // Enhanced time extraction with various formats
  const timePattern = /(?:\d{1,2}:\d{2}\s*(?:am|pm|AM|PM)|(?:\d{1,2})\s*(?:am|pm|AM|PM))/g
  const timeMatches = text.match(timePattern)
  if (timeMatches) {
    eventData.time = timeMatches[0]
  } else {
    eventData.time = "12:00 PM"; // Default time if none is found
  }

  // Enhanced location extraction
  const cityStatePattern = /([A-Z][a-z\s]+),\s*([A-Z]{2})/g
  const cityStateMatch = cityStatePattern.exec(text)
  if (cityStateMatch) {
    eventData.location.city = cityStateMatch[1].trim()
    eventData.location.state = cityStateMatch[2]
  }

  // Extract venue name
  const venuePatterns = [
    /(?:at|@)\s+([\w\s&]+(?:Center|Theatre|Theater|Hall|Studio|Space|Venue))/i,
    /([\w\s&]+(?:Center|Theatre|Theater|Hall|Studio|Space|Venue))/i,
    /(?:Location|Venue|Place):\s*([\w\s&]+)/i
  ]

  for (const pattern of venuePatterns) {
    const match = text.match(pattern)
    if (match) {
      eventData.location.name = match[1].trim()
      break
    }
  }
  
  // If no venue name was found, use a default
  if (!eventData.location.name) {
    eventData.location.name = "Event Venue";
  }

  // Enhanced price extraction
  const pricePatterns = [
    /\$(\d+(?:\.\d{2})?)/g,
    /(?:price|cost|fee):\s*\$(\d+(?:\.\d{2})?)/i,
    /(\d+(?:\.\d{2})?)\s*(?:dollars|USD)/i
  ]

  for (const pattern of pricePatterns) {
    const match = text.match(pattern)
    if (match) {
      const price = parseFloat(match[1])
      if (!isNaN(price)) {
        eventData.price = price
        break
      }
    }
  }

  // Extract capacity and remaining spots
  const capacityPatterns = [
    /(?:capacity|limit|max):\s*(\d+)/i,
    /limited to (\d+)/i,
    /(?:up to|maximum of) (\d+) (?:people|participants|attendees)/i
  ]

  for (const pattern of capacityPatterns) {
    const match = text.match(pattern)
    if (match) {
      eventData.capacity = parseInt(match[1])
      // Default remaining to capacity if not specified
      eventData.remaining = eventData.capacity
      break
    }
  }
  
  // If no capacity was found, use a reasonable default
  if (!eventData.capacity) {
    eventData.capacity = 20;
    eventData.remaining = 20;
  }

  // Extract instructor name
  const instructorPatterns = [
    /(?:instructor|teacher|guide|led by|with):\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/i,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\s+(?:will|is)\s+(?:teach|lead|guide)/i
  ]

  for (const pattern of instructorPatterns) {
    const match = text.match(pattern)
    if (match) {
      eventData.instructorName = match[1].trim()
      break
    }
  }

  // Extract categories based on keywords
  const categoryKeywords = {
    'Meditation': ['meditation', 'mindfulness', 'zen', 'breathwork'],
    'Yoga': ['yoga', 'asana', 'vinyasa', 'hatha'],
    'Sound Healing': ['sound', 'gong', 'singing bowl', 'sound bath'],
    'Wellness': ['wellness', 'health', 'healing', 'holistic'],
    'Retreat': ['retreat', 'getaway', 'immersion', 'workshop']
  }

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()))) {
      eventData.category.push(category)
    }
  }
  
  // If no categories were found, default to Wellness
  if (eventData.category.length === 0) {
    eventData.category.push("Wellness");
  }

  // Extract image URL
  const imagePatterns = [
    /!\[.*?\]\((https?:\/\/[^)]+\.(jpg|jpeg|png|gif))\)/i,  // Markdown image
    /<img[^>]+src=["'](https?:\/\/[^"']+\.(jpg|jpeg|png|gif))["']/i  // HTML image
  ]

  for (const pattern of imagePatterns) {
    const match = text.match(pattern)
    if (match) {
      eventData.image = match[1]
      break
    }
  }

  return eventData
}
