import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetreatCard from "@/components/RetreatCard";
import RetreatHero from "@/components/retreats/RetreatHero";
import RetreatFilters from "@/components/retreats/RetreatFilters";
import RetreatResultsHeader from "@/components/retreats/RetreatResults";
import RetreatLoadingState from "@/components/retreats/RetreatLoadingState";
import NoRetreatsFound from "@/components/retreats/NoRetreatsFound";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { fetchSanghosRetreats } from "@/lib/data";
import { fetchInsightLAEvents } from "@/lib/insightEvents";

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

  const retreatsKeywords = [
    "wellness retreats",
    "mindfulness retreats",
    "yoga retreats", 
    "meditation retreats",
    "breathwork retreats",
    "day retreats",
    "wellness experiences",
    "spiritual retreats",
    "private retreat spaces",
    "retreat bookings"
  ];

  return (
    <>
      <SEOHead
        title="Wellness Retreats & Mindfulness Experiences"
        description="Browse our curated collection of wellness retreats including yoga, meditation, breathwork, and mindfulness experiences in beautiful private settings."
        keywords={retreatsKeywords}
        canonicalUrl="https://sanghos.com/retreats"
        ogType="website"
      />

      <Header />
      
      <main className="pt-20 bg-sage-50/30 min-h-screen flex flex-col">
        <div className="container px-4 md:px-6 pt-4">
          <Breadcrumbs />
        </div>
        
        <RetreatHero 
          onSearch={handleSearch} 
          onCategorySelect={handleCategorySelect}
          onTabChange={handleTabChange}
          retreatCounts={retreatCounts}
          activeTab={activeTab}
        />
        
        <div className="container px-4 md:px-6 py-10 flex-grow">
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
