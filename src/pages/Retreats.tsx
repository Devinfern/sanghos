
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetreatCard from "@/components/RetreatCard";
import RetreatHero from "@/components/retreats/RetreatHero";
import RetreatFilters from "@/components/retreats/RetreatFilters";
import RetreatResultsHeader from "@/components/retreats/RetreatResults";
import RetreatLoadingState from "@/components/retreats/RetreatLoadingState";
import NoRetreatsFound from "@/components/retreats/NoRetreatsFound";
import { fetchSanghosRetreats } from "@/lib/data";
import { fetchInsightLAEvents } from "@/lib/insightEvents";
import { Link } from "react-router-dom";

import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


// --- New components for Featured Retreat Centers section ---

interface RetreatCenter {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  image: string;
  description: string;
}

interface RetreatCenterCardProps {
  center: RetreatCenter;
  index: number;
}

const RetreatCenterCard = ({ center, index }: RetreatCenterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full"
    >
      <Card className="group overflow-hidden border border-sand-200 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-xl bg-white h-full flex flex-col rounded-xl">
        <div className="relative overflow-hidden">
          <OptimizedImage
            src={center.image}
            alt={center.name}
            aspectRatio="video"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            {center.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="bg-white/90 text-brand-dark backdrop-blur-sm shadow-md">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
        <CardContent className="p-5 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-brand-dark mb-1 group-hover:text-brand-primary transition-colors">
              {center.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mr-2 text-brand-primary/80 flex-shrink-0" />
              <span>{center.location}</span>
            </div>
            <p className="text-sm text-slate-600 line-clamp-3 mb-4">
              {center.description}
            </p>
          </div>
          <div className="mt-auto pt-4 border-t border-sand-100">
            <Button variant="outline" className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
              <Star className="w-4 h-4 mr-2" />
              View Available Retreats
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const featuredCenters = [
    {
        id: 'esalen-institute',
        name: 'Esalen Institute',
        location: 'Big Sur, California',
        specialties: ['Human Potential', 'Meditation'],
        image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A legendary center for personal and social transformation, offering workshops on yoga, massage, and more.'
    },
    {
        id: 'kripalu-center',
        name: 'Kripalu Center for Yoga & Health',
        location: 'Stockbridge, Massachusetts',
        specialties: ['Yoga', 'Wellness'],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'The largest retreat center in North America, offering immersive experiences in yoga, health, and spiritual practice.'
    },
    {
        id: 'omega-institute',
        name: 'Omega Institute',
        location: 'Rhinebeck, New York',
        specialties: ['Holistic Studies', 'Workshops'],
        image: 'https://images.unsplash.com/photo-1506126613408-2e61add503fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A premier destination for holistic learning and retreats, with a wide range of workshops from leading teachers.'
    },
    {
        id: 'the-ranch-malibu',
        name: 'The Ranch Malibu',
        location: 'Malibu, California',
        specialties: ['Luxury Wellness', 'Fitness'],
        image: 'https://images.unsplash.com/photo-1575052814080-3841be292723?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'An exclusive and results-oriented luxury fitness and wellness retreat focused on hiking and plant-based cuisine.'
    },
    {
        id: 'corepower-yoga',
        name: 'CorePower Yoga',
        location: 'Denver, Colorado',
        specialties: ['Heated Yoga', 'Sculpt'],
        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A nationwide brand known for its intensely physical and dynamic heated yoga classes in a modern studio setting.'
    },
    {
        id: 'yogaworks',
        name: 'YogaWorks',
        location: 'Santa Monica, California',
        specialties: ['Vinyasa', 'Teacher Training'],
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'One of the most respected names in yoga, offering a blend of traditional and modern practices for all levels.'
    },
    {
        id: 'insightla',
        name: 'InsightLA',
        location: 'Los Angeles, California',
        specialties: ['Mindfulness', 'Vipassana'],
        image: 'https://images.unsplash.com/photo-1528716321680-815a4cdb8cbe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A leading meditation center in Los Angeles, providing a wide array of secular mindfulness and Buddhist classes.'
    },
    {
        id: 'spirit-rock',
        name: 'Spirit Rock',
        location: 'Woodacre, California',
        specialties: ['Insight Meditation', 'Retreats'],
        image: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A renowned meditation center dedicated to the teachings of the Buddha, located in the serene hills of Marin County.'
    },
    {
        id: 'alo-yoga',
        name: 'Alo Yoga Studio',
        location: 'Beverly Hills, California',
        specialties: ['Premium Yoga', 'Community'],
        image: 'https://images.unsplash.com/photo-1628125807998-2508f323fa3c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'The studio extension of the popular apparel brand, offering a high-end yoga experience in stunning spaces.'
    },
    {
        id: 'pure-yoga',
        name: 'Pure Yoga',
        location: 'New York, New York',
        specialties: ['Luxury Yoga', 'Varied Styles'],
        image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A luxury yoga studio offering a wide variety of yoga styles and classes taught by world-class instructors.'
    },
    {
        id: 'dharma-ocean',
        name: 'Dharma Ocean',
        location: 'San Rafael, California',
        specialties: ['Somatic Meditation', 'Dharma'],
        image: 'https://images.unsplash.com/photo-1597843799564-33827d6a13c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A global community practicing Somatic Meditation, a tradition that emphasizes the body as the path to awakening.'
    },
    {
        id: 'wanderlust',
        name: 'Wanderlust',
        location: 'Various Locations',
        specialties: ['Festivals', 'Global Retreats'],
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'Famous for its large-scale yoga festivals and global retreats that combine yoga, music, and nature.'
    },
];

const FeaturedRetreatCenters = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-brand-dark">
                        Featured Wellness Studios
                    </h2>
                    <Button variant="link" asChild className="text-brand-primary group hidden md:inline-flex">
                        <Link to="/become-host">
                           View All
                           <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {featuredCenters.map((center, index) => (
                            <CarouselItem key={center.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <RetreatCenterCard center={center} index={index} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="text-center mt-8 md:hidden">
                  <Button asChild variant="outline" size="lg">
                    <Link to="/become-host">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
            </div>
        </section>
    );
};


const Retreats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [allRetreats, setAllRetreats] = useState([]);
  const [insightLALoadingError, setInsightLALoadingError] = useState(false);
  
  useEffect(() => {
    const loadAllEvents = async () => {
      try {
        console.log("Retreats page: Loading events from all sources...");
        
        // Load Sanghos retreats
        const sanghoRetreats = await fetchSanghosRetreats();
        console.log(`Retreats page: Loaded ${sanghoRetreats.length} Sanghos retreats`);
        
        // Load InsightLA retreats
        let insightLARetreats = [];
        try {
          insightLARetreats = await fetchInsightLAEvents();
          console.log(`Retreats page: Loaded ${insightLARetreats.length} InsightLA retreats`);
        } catch (insightError) {
          console.error("Retreats page: Failed to load InsightLA retreats", insightError);
          setInsightLALoadingError(true);
        }
        
        // Combine all retreats
        const combinedRetreats = [...sanghoRetreats, ...insightLARetreats];
        console.log(`Retreats page: Loaded a total of ${combinedRetreats.length} retreats`);
        
        setAllRetreats(combinedRetreats);
        setIsLoaded(true);
        setIsLoadingEvents(false);
      } catch (error) {
        console.error("Retreats page: Error loading events", error);
        setIsLoaded(true);
        setIsLoadingEvents(false);
      }
    };
    
    loadAllEvents();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveTab("all");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const allCategories = Array.from(
    new Set(allRetreats.flatMap((retreat) => retreat.category))
  ).sort();

  const filteredRetreats = allRetreats.filter(retreat => {
    const matchesSearch = searchQuery === "" || 
      retreat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retreat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retreat.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      retreat.category.includes(selectedCategory);
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "sanghos" && retreat.isSanghos) ||
      (activeTab === "thirdparty" && !retreat.isSanghos);
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const sanghoRetreats = allRetreats.filter(retreat => retreat.isSanghos);
  const thirdPartyRetreats = allRetreats.filter(retreat => !retreat.isSanghos);

  const retreatCounts = {
    all: allRetreats.length,
    sanghos: sanghoRetreats.length,
    thirdparty: thirdPartyRetreats.length
  };

  const hasFilters = searchQuery !== "" || selectedCategory !== null;

  return (
    <>
      <Helmet>
        <title>Retreats | Sanghos</title>
        <meta 
          name="description" 
          content="Discover our mindfulness and wellness retreats to reconnect with yourself."
        />
      </Helmet>

      <Header />
      
      <main className="pt-20 bg-white min-h-screen flex flex-col">
        <RetreatHero 
          onSearch={handleSearch} 
          onCategorySelect={handleCategorySelect}
          onTabChange={handleTabChange}
          retreatCounts={retreatCounts}
          activeTab={activeTab}
        />
        
        <div className="container px-4 md:px-6 py-10 flex-grow bg-sage-50/30">
          {/* Filters section */}
          <RetreatFilters 
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
            resetFilters={resetFilters}
          />

          {/* Results header */}
          <RetreatResultsHeader 
            filteredCount={filteredRetreats.length} 
            activeTab={activeTab}
            isLoadingEvents={isLoadingEvents}
          />

          {/* Content section */}
          {isLoadingEvents ? (
            <RetreatLoadingState message={
              insightLALoadingError 
                ? "Loading retreats... (InsightLA retreats unavailable)" 
                : "Loading retreats..."
            } />
          ) : filteredRetreats.length > 0 ? (
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 transition-opacity duration-700",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              {filteredRetreats.map((retreat, index) => (
                <RetreatCard 
                  key={retreat.id} 
                  retreat={retreat} 
                  index={index}
                  comingSoon={retreat.isSanghos} // Only Sanghos retreats should show coming soon
                />
              ))}
            </div>
          ) : (
            <NoRetreatsFound resetFilters={resetFilters} loadingError={insightLALoadingError} />
          )}
        </div>
        <FeaturedRetreatCenters />
      </main>
      
      <Footer />
    </>
  );
};

export default Retreats;
