
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
// Import Firecrawl from a URL instead of using npm package syntax
import { FirecrawlApp } from "https://esm.sh/@mendable/firecrawl-js"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY')
    
    if (!apiKey) {
      throw new Error('Firecrawl API key not configured')
    }

    console.log(`Starting crawl for URL: ${url}`)
    const firecrawl = new FirecrawlApp({ apiKey })
    const response = await firecrawl.crawlUrl(url, {
      limit: 1,
      scrapeOptions: {
        formats: ['markdown', 'html'],
      }
    })

    if (!response.success) {
      console.error('Crawl failed:', response)
      throw new Error('Failed to crawl URL')
    }

    const rawData = response.data[0]?.content?.markdown || ''
    const eventData = extractEventData(rawData, url)
    console.log('Extracted event data:', eventData)

    return new Response(
      JSON.stringify(eventData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    )
  } catch (error) {
    console.error('Error in extract-event-data:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      },
    )
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

  // Enhanced time extraction with various formats
  const timePattern = /(?:\d{1,2}:\d{2}\s*(?:am|pm|AM|PM)|(?:\d{1,2})\s*(?:am|pm|AM|PM))/g
  const timeMatches = text.match(timePattern)
  if (timeMatches) {
    eventData.time = timeMatches[0]
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
    /([\w\s&]+(?:Center|Theatre|Theater|Hall|Studio|Space|Venue))/i
  ]

  for (const pattern of venuePatterns) {
    const match = text.match(pattern)
    if (match) {
      eventData.location.name = match[1].trim()
      break
    }
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
    /limited to (\d+)/i
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
