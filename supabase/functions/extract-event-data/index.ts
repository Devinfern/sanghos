
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

    console.log('Crawl successful, processing data')

    // Extract relevant event information from the crawled data
    const rawData = response.data[0]?.content?.markdown || ''
    
    // Parse the event data using heuristics
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

// Function to extract event information from raw text
function extractEventData(text: string, sourceUrl: string) {
  // Initialize event data with defaults
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
    category: [],
    instructorName: '',
    image: '',
    sourceUrl
  }

  // Extract title - usually first line of significant length
  const lines = text.split('\n')
  for (const line of lines) {
    const trimmedLine = line.trim()
    if (trimmedLine.length > 15 && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('!')) {
      eventData.title = trimmedLine
      break
    }
  }

  // Extract description - look for paragraphs
  const paragraphs = text.match(/(?:\n|^)([^\n#].{20,}?)(?:\n|$)/g)
  if (paragraphs && paragraphs.length > 0) {
    eventData.description = paragraphs[0].trim()
  }

  // Extract date - look for date patterns
  const datePatterns = [
    /(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/gi,
    /\d{1,2}\/\d{1,2}\/\d{4}/g,
    /\d{4}-\d{2}-\d{2}/g
  ]

  for (const pattern of datePatterns) {
    const match = text.match(pattern)
    if (match) {
      const dateStr = match[0]
      try {
        // Attempt to format date as YYYY-MM-DD
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

  // Extract time
  const timePattern = /(?:\d{1,2}:\d{2}\s*(?:am|pm|AM|PM)|(?:\d{1,2})\s*(?:am|pm|AM|PM))/g
  const timeMatches = text.match(timePattern)
  if (timeMatches && timeMatches.length > 0) {
    eventData.time = timeMatches[0]
  }

  // Extract location
  const cityStatePattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s+([A-Z]{2})\b/g
  const cityStateMatches = text.match(cityStatePattern)
  if (cityStateMatches && cityStateMatches.length > 0) {
    const [city, state] = cityStateMatches[0].split(',').map(s => s.trim())
    eventData.location.city = city
    eventData.location.state = state
  }

  // Extract location name - look for venue keywords
  const venueKeywords = ['center', 'venue', 'hall', 'space', 'studio', 'retreat']
  const lines2 = text.split('\n')
  for (const line of lines2) {
    if (venueKeywords.some(keyword => line.toLowerCase().includes(keyword))) {
      eventData.location.name = line.trim()
      break
    }
  }

  // Extract price - look for dollar amounts
  const pricePattern = /\$(\d+(?:\.\d{2})?)/g
  const priceMatches = text.match(pricePattern)
  if (priceMatches && priceMatches.length > 0) {
    const priceText = priceMatches[0].replace('$', '')
    eventData.price = parseFloat(priceText)
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

  // Try to find an image URL in the original text
  const imagePattern = /!\[.*?\]\((https?:\/\/[^)]+)\)/g
  const imageMatches = text.match(imagePattern)
  if (imageMatches && imageMatches.length > 0) {
    const imageUrl = imageMatches[0].match(/\((https?:\/\/[^)]+)\)/)?.[1]
    if (imageUrl) {
      eventData.image = imageUrl
    }
  }

  return eventData
}
