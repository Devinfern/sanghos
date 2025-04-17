
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { FirecrawlApp } from '@mendable/firecrawl-js'

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

    const firecrawl = new FirecrawlApp({ apiKey })
    const response = await firecrawl.crawlUrl(url, {
      limit: 1,
      scrapeOptions: {
        formats: ['markdown', 'html'],
      }
    })

    if (!response.success) {
      throw new Error('Failed to crawl URL')
    }

    // Extract relevant event information from the crawled data
    const eventData = {
      title: '', // Extract from crawled data
      description: '', // Extract from crawled data
      date: '', // Extract from crawled data
      location: '', // Extract from crawled data
      price: 0, // Extract from crawled data
      // Add other relevant fields
    }

    return new Response(
      JSON.stringify(eventData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      },
    )
  }
})
