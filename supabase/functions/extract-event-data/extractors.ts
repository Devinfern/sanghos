
import { parseHtml, extractDateFromUrl, createFutureDate } from "./utils.ts";
import { 
  extractTitle, 
  extractDescription,
  extractImage, 
  extractDateTime, 
  extractLocation, 
  extractInstructor, 
  extractPrice, 
  extractCapacity,
  extractCategories
} from "./fieldExtractors.ts";

export async function extractEventDataFromHtml(html: string, url: string) {
  const doc = parseHtml(html);
  
  if (!doc) {
    throw new Error("Failed to parse HTML");
  }
  
  // Extract all the fields
  const title = extractTitle(doc);
  const description = extractDescription(doc);
  const image = extractImage(doc);
  const dateInfo = extractDateTime(doc, url);
  const locationInfo = extractLocation(doc);
  const instructor = extractInstructor(doc);
  const { price, priceDisplay } = extractPrice(doc, description);
  const { capacity, remaining } = extractCapacity(doc, description);
  const category = extractCategories(doc, title, description);
  
  // Compose the enhanced extracted data
  return {
    title: title || "InsightLA Event",
    description: description || "A mindfulness event by InsightLA.",
    image,
    date: dateInfo,
    time: dateInfo.time || "Check event details for time",
    location: locationInfo,
    instructor,
    price,
    priceDisplay,
    capacity,
    remaining,
    category,
    bookingLink: url,
    source: "InsightLA"
  };
}
