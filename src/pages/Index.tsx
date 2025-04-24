
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { supabase } from "@/integrations/supabase/client";
import SanghosStory from "@/components/SanghosStory";
import HomeCategories from "@/components/HomeCategories";
import { FeatureRetreatFinder } from "@/components/ui/feature-retreat-finder";
import HowItWorks from "@/components/HowItWorks";
import JoinCommunity from "@/components/JoinCommunity";
import Footer from "@/components/Footer";
import EventsSection from "@/components/sections/EventsSection";
import { defaultEvents } from "@/data/mockFeaturedEvents";
import { Event } from "@/types/event";

const Index = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("fetch-local-events", {
          body: {
            location: "San Francisco, CA",
            interests: ["yoga", "meditation", "wellness", "mindfulness"],
            startDatetime: new Date().toISOString(),
          },
        });
        
        if (error) {
          console.error("Error fetching events:", error);
          setFeaturedEvents(defaultEvents);
        } else if (data?.recommendations && data.recommendations.length > 0) {
          const transformedEvents: Event[] = data.recommendations.map((rec: any, index: number) => {
            const startDate = new Date();
            const endDate = new Date();
            endDate.setHours(endDate.getHours() + 2);
            
            if (rec.date && rec.time) {
              try {
                const dateTimeStr = `${rec.date} ${rec.time}`;
                const parsedDate = new Date(dateTimeStr);
                if (!isNaN(parsedDate.getTime())) {
                  startDate.setTime(parsedDate.getTime());
                  endDate.setTime(parsedDate.getTime() + (2 * 60 * 60 * 1000));
                }
              } catch (e) {
                console.warn("Error parsing event date/time:", e);
              }
            }
            
            return {
              id: rec.retreatId || `ev-api-${index}`,
              title: rec.title,
              shortDescription: rec.reason || "A wellness event near you",
              description: rec.description || "Join this event to improve your wellness journey.",
              imageUrl: rec.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
              category: rec.category?.[0] || "yoga",
              startDate,
              endDate,
              location: {
                locationType: rec.url ? "online" : "venue",
                name: rec.location || "Venue to be announced",
                address: rec.location || "",
                city: rec.location?.split(",")?.[0] || "",
                state: rec.location?.split(",")?.[1]?.trim() || "CA",
                zip: ""
              },
              bookingUrl: rec.url || "https://www.example.com",
              price: "Free",
              source: "Eventbrite",
              organizer: {
                name: "Event Organizer",
                website: rec.url
              }
            };
          });
          
          setFeaturedEvents(transformedEvents);
        } else {
          setFeaturedEvents(defaultEvents);
        }
      } catch (err) {
        console.error("Error in fetchEvents:", err);
        setFeaturedEvents(defaultEvents);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <>
      <Helmet>
        <title>Sanghos | Wellness Retreats in Private Homes</title>
        <meta
          name="description"
          content="Discover transformative daylong wellness retreats hosted by expert instructors in unique private spaces."
        />
      </Helmet>

      <Header />
      <Hero />
      <SanghosStory />
      <EventsSection events={featuredEvents} isLoading={isLoading} />
      <HomeCategories />
      <FeatureRetreatFinder />
      <HowItWorks />
      <JoinCommunity />
      <Footer />
    </>
  );
};

export default Index;
