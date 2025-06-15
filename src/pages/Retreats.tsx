
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

import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';


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
        id: 'center-1',
        name: 'Serenity Grove',
        location: 'Topanga, California',
        specialties: ['Yoga', 'Meditation'],
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'A secluded sanctuary nestled in the mountains, perfect for deep meditation and reconnection.'
    },
    {
        id: 'center-2',
        name: 'Azure Spirit',
        location: 'Maui, Hawaii',
        specialties: ['Wellness', 'Ocean Therapy'],
        image: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'Heal and restore by the ocean with guided practices, meditation, and wellness workshops.'
    },
    {
        id: 'center-3',
        name: 'The Stone Temple',
        location: 'Sedona, Arizona',
        specialties: ['Spiritual', 'Vortex Healing'],
        image: 'https://images.unsplash.com/photo-1519834255828-9e0c573b32db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        description: 'Connect with the powerful energy of Sedona’s red rocks in our unique stone temple.'
    },
];

const FeaturedRetreatCenters = () => {
    return (
        <section className="py-20 bg-sand-50 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-sky/20 rounded-full filter blur-3xl opacity-50 animate-pulse-glow" />
                <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-brand-primary/10 rounded-full filter blur-3xl opacity-60 animate-float" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                        Featured Retreat Centers & Studios
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover world-class venues that host our transformative wellness experiences.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCenters.map((center, index) => (
                        <RetreatCenterCard key={center.id} center={center} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white group">
                        Become a Partner Center
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
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

        <FeaturedRetreatCenters />
        
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
      </main>
      
      <Footer />
    </>
  );
};

export default Retreats;
