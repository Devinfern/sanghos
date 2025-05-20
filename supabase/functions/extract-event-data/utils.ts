
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

// CORS headers for cross-origin requests
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Parse HTML into a DOM document
export function parseHtml(html: string): Document | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  
  if (!doc) {
    throw new Error("Failed to parse HTML");
  }
  
  return doc;
}

// Extract date information from URL path
export function extractDateFromUrl(url: string): { iso: string, display: string } | null {
  const urlPathMatch = url.match(/\/(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2})\/?$/);
  if (urlPathMatch) {
    const dateStr = urlPathMatch[1]; // e.g. "2025-04-24"
    const timeStr = urlPathMatch[2].replace('-', ':'); // e.g. "06:30"
    
    const dateTimeStr = `${dateStr}T${timeStr}:00`;
    try {
      const dateObj = new Date(dateTimeStr);
      if (!isNaN(dateObj.getTime())) {
        return {
          iso: dateObj.toISOString(),
          display: dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        };
      }
    } catch (error) {
      console.error("Error parsing date from URL:", error);
    }
  }
  return null;
}

// Create a future date for fallback
export function createFutureDate(): { iso: string, display: string } {
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 3); // 3 months in the future
  
  return {
    iso: futureDate.toISOString(),
    display: futureDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
}
