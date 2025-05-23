
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { extractEventDataFromHtml } from "./extractors.ts";
import { corsHeaders } from "./utils.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || !url.includes("insightla.org/event/")) {
      return new Response(
        JSON.stringify({ error: "Invalid URL. Must be an InsightLA event URL" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log("Attempting to fetch URL:", url);
    
    // Add more robust fetch with retries
    let response;
    let retries = 0;
    const maxRetries = 3;
    
    while (retries < maxRetries) {
      try {
        response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          redirect: 'follow',
        });
        
        if (response.ok) break;
        
        console.log(`Retry ${retries + 1}/${maxRetries}: Failed with status ${response.status}`);
        retries++;
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
      } catch (fetchError) {
        console.error(`Fetch attempt ${retries + 1} failed:`, fetchError);
        retries++;
        if (retries >= maxRetries) throw fetchError;
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
      }
    }
    
    if (!response || !response.ok) {
      return new Response(
        JSON.stringify({ 
          error: `Failed to fetch URL after ${maxRetries} attempts: ${response?.status} ${response?.statusText}`,
          url: url 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 502 }
      );
    }

    const html = await response.text();
    console.log("HTML length:", html.length);
    
    if (html.length < 100) {
      return new Response(
        JSON.stringify({ 
          error: "Received incomplete or empty HTML response",
          htmlLength: html.length,
          htmlPreview: html.substring(0, 100)
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 502 }
      );
    }
    
    // Extract event data from HTML
    const eventData = await extractEventDataFromHtml(html, url);

    console.log("Extracted event data:", JSON.stringify(eventData));
    
    return new Response(
      JSON.stringify(eventData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Unknown error occurred",
        stack: error.stack
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
