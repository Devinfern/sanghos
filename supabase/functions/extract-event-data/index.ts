
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
    const response = await fetch(url);
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch URL: ${response.status} ${response.statusText}` }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const html = await response.text();
    console.log("HTML length:", html.length);
    
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
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
