import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedRetreats from "@/components/FeaturedRetreats";
import Footer from "@/components/Footer";
import { instructors } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SanghosStory from "@/components/SanghosStory";
import HowItWorks from "@/components/HowItWorks";
import JoinCommunity from "@/components/JoinCommunity";
import AIWellnessSection from "@/components/AIWellnessSection";
import { FeatureRetreatFinder } from "@/components/ui/feature-retreat-finder";
import HomeCategories from "@/components/HomeCategories";
import FeaturedRetreatsGrid from "@/components/FeaturedRetreatsGrid";
import EventList from "@/components/EventList";
import { Event, EventCategory } from "@/types/event";
import DateFilter, { DateFilterOption } from "@/components/DateFilter";
import { useState, useMemo, useEffect } from "react";
import { isThisWeek, isToday, isTomorrow, isSameDay, startOfDay, getDay } from "date-fns";
import { supabase } from "@/lib/supabase";

const featuredEvents: Event[] = [
  {
    id: "ev-1",
    title: "Outdoor Sunrise Yoga",
    shortDescription: "Start your day with a nourishing outdoor yoga session in the park.",
    description: "Experience a refreshing sunrise yoga flow led by a certified instructor, suitable for all levels. Bring your own mat and water bottle. In case of rain, the class will be rescheduled.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "yoga",
    startDate: new Date("2025-04-18T07:00:00"),
    endDate: new Date("2025-04-18T08:00:00"),
    location: {
      locationType: "venue",
      name: "Lakeside Park",
      address: "123 Lakeview Ave",
      city: "Springfield",
      state: "CA",
      zip: "90102"
    },
    bookingUrl: "https://www.sunriseyoga.com/book",
    price: 18,
    source: "Sunrise Yoga",
    organizer: {
      name: "Sophia Lee",
      website: "https://www.sunriseyoga.com"
    }
  },
  {
    id: "ev-2",
    title: "Guided Mindfulness Meditation",
    shortDescription: "A calming online session to help you cultivate mindfulness.",
    description: "This virtual meditation event is guided live via Zoom and suitable for beginners and regular practitioners alike. Expect gentle instructions and space for Q&A.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "meditation",
    startDate: new Date("2025-04-19T18:00:00"),
    endDate: new Date("2025-04-19T18:45:00"),
    location: {
      locationType: "online",
      name: "Online"
    },
    bookingUrl: "https://www.mindfulcommunity.com/meditate",
    price: "Free",
    source: "Mindful Community",
    organizer: {
      name: "Mindful Community",
      website: "https://www.mindfulcommunity.com"
    }
  },
  {
    id: "ev-3",
    title: "Nutrition Workshop: Plant-Based Basics",
    shortDescription: "Learn how to nourish yourself with easy plant-based meals.",
    description: "This hands-on workshop introduces the benefits and practicalities of plant-based eating. Enjoy samples, recipes, and expert Q&A. All are welcome!",
    imageUrl: "https://images.unsplash.com/photo-1481931098730-318b6f776db0",
    category: "nutrition",
    startDate: new Date("2025-04-22T17:30:00"),
    endDate: new Date("2025-04-22T19:15:00"),
    location: {
      locationType: "venue",
      name: "Healthy Eats Kitchen",
      address: "789 Wellness Lane",
      city: "Hillcrest",
      state: "CA",
      zip: "90215"
    },
    bookingUrl: "https://www.healthyeats.com/workshop",
    price: 35,
    source: "Healthy Eats",
    organizer: {
      name: "Chef Rosa Morales",
      website: ""
    }
  }
];

const defaultEvents: Event[] = [
  {
    id: "ev-1",
    title: "Outdoor Sunrise Yoga",
    shortDescription: "Start your day with a nourishing outdoor yoga session in the park.",
    description: "Experience a refreshing sunrise yoga flow led by a certified instructor, suitable for all levels. Bring your own mat and water bottle. In case of rain, the class will be rescheduled.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "yoga",
    startDate: new Date("2025-04-18T07:00:00"),
    endDate: new Date("2025-04-18T08:00:00"),
    location: {
      locationType: "venue",
      name: "Lakeside Park",
      address: "123 Lakeview Ave",
      city: "Springfield",
      state: "CA",
      zip: "90102"
    },
    bookingUrl: "https://www.sunriseyoga.com/book",
    price: 18,
    source: "Sunrise Yoga",
    organizer: {
      name: "Sophia Lee",
      website: "https://www.sunriseyoga.com"
    }
  },
  {
    id: "ev-2",
    title: "Guided Mindfulness Meditation",
    shortDescription: "A calming online session to help you cultivate mindfulness.",
    description: "This virtual meditation event is guided live via Zoom and suitable for beginners and regular practitioners alike. Expect gentle instructions and space for Q&A.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "meditation",
    startDate: new Date("2025-04-19T18:00:00"),
    endDate: new Date("2025-04-19T18:45:00"),
    location: {
      locationType: "online",
      name: "Online"
    },
    bookingUrl: "https://www.mindfulcommunity.com/meditate",
    price: "Free",
    source: "Mindful Community",
    organizer: {
      name: "Mindful Community",
      website: "https://www.mindfulcommunity.com"
    }
  },
  {
    id: "ev-3",
    title: "Nutrition Workshop: Plant-Based Basics",
    shortDescription: "Learn how to nourish yourself with easy plant-based meals.",
    description: "This hands-on workshop introduces the benefits and practicalities of plant-based eating. Enjoy samples, recipes, and expert Q&A. All are welcome!",
    imageUrl: "https://images.unsplash.com/photo-1481931098730-318b6f776db0",
    category: "nutrition",
    startDate: new Date("2025-04-22T17:30:00"),
    endDate: new Date("2025-04-22T19:15:00"),
    location: {
      locationType: "venue",
      name: "Healthy Eats Kitchen",
      address: "789 Wellness Lane",
      city: "Hillcrest",
      state: "CA",
      zip: "90215"
    },
    bookingUrl: "https://www.healthyeats.com/workshop",
    price: 35,
    source: "Healthy Eats",
    organizer: {
      name: "Chef Rosa Morales",
      website: ""
    }
  }
];

const Index = () => {
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilterOption>('all');
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function isDateInThisWeekend(date: Date) {
    const day = getDay(date); // 0 is Sunday, 6 is Saturday
    return day === 0 || day === 6; // Weekend is Saturday (6) or Sunday (0)
  }

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

  const filteredEvents = useMemo(() => {
    if (selectedDateFilter === "all") return featuredEvents;

    const today = startOfDay(new Date());
    switch (selectedDateFilter) {
      case "today":
        return featuredEvents.filter(event =>
          isSameDay(event.startDate, today)
        );
      case "tomorrow":
        const tomorrow = startOfDay(new Date(today.getTime() + 24 * 60 * 60 * 1000));
        return featuredEvents.filter(event =>
          isSameDay(event.startDate, tomorrow)
        );
      case "this-week":
        return featuredEvents.filter(event =>
          isThisWeek(event.startDate, { weekStartsOn: 1 })
        );
      case "this-weekend":
        return featuredEvents.filter(event =>
          isDateInThisWeekend(event.startDate)
        );
      case "custom":
        if (customDate) {
          return featuredEvents.filter(event =>
            isSameDay(event.startDate, startOfDay(customDate))
          );
        }
        return featuredEvents;
      default:
        return featuredEvents;
    }
  }, [selectedDateFilter, customDate, featuredEvents]);

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

      {/* Featured Events Section */}
      <section className="py-16 bg-sage-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Featured Events
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A selection of curated wellness events for you to explore and book.
            </p>
          </div>
          {/* Date filter bar */}
          <div className="flex justify-center mb-8">
            <DateFilter
              selectedOption={selectedDateFilter}
              customDate={customDate}
              onSelectOption={setSelectedDateFilter}
              onSelectCustomDate={setCustomDate}
            />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Spinner className="h-8 w-8 text-sage-600" />
              <span className="ml-3 text-sage-700">Loading events...</span>
            </div>
          ) : (
            <EventList events={filteredEvents} />
          )}
        </div>
      </section>

      <HomeCategories />
      <FeatureRetreatFinder />
      <HowItWorks />
      <JoinCommunity />
      <Footer />
    </>
  );
};

export default Index;
