
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
import { retreats } from "@/lib/data";
import { partnerEvents, eventToRetreatFormat } from "@/data/mockEvents";
import { ensureValidCategory } from "@/mockEvents";

const Retreats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    // Check if real retreats have been loaded (more than just the placeholder)
    const checkRetreatLoaded = () => {
      if (retreats.length > 1 || (retreats.length === 1 && retreats[0].id !== "insight-la-1")) {
        setIsLoadingEvents(false);
      } else {
        setTimeout(checkRetreatLoaded, 500);
      }
    };
    
    checkRetreatLoaded();
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Fallback timeout to stop loading state after 5 seconds
      setTimeout(() => {
        setIsLoadingEvents(false);
      }, 5000);
    }, 100);

    return () => clearTimeout(timer);
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

  // Ensure partner events have proper type conversions before transforming to retreat format
  const typeSafePartnerEvents = partnerEvents.map(event => ({
    ...event,
    category: ensureValidCategory(event.category),
    location: {
      ...event.location,
      locationType: event.location.locationType === "venue" ? "venue" : "online"
    }
  }));

  // Convert partner events to retreat format for consistent display
  const partnerRetreats = typeSafePartnerEvents.map(event => eventToRetreatFormat(event));

  // Combine the original retreats with partner retreats
  const allRetreats = [...retreats, ...partnerRetreats];

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
      
      <main className="pt-20 bg-sage-50/30 min-h-screen flex flex-col">
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
            <RetreatLoadingState />
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
            <NoRetreatsFound resetFilters={resetFilters} />
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Retreats;
