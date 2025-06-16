import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetreatCard from "@/components/RetreatCard";
import RetreatHero from "@/components/retreats/RetreatHero";
import AdvancedRetreatFilters from "@/components/retreats/AdvancedRetreatFilters";
import RetreatResultsHeader from "@/components/retreats/RetreatResults";
import RetreatLoadingState from "@/components/retreats/RetreatLoadingState";
import RetreatCardSkeleton from "@/components/retreats/RetreatCardSkeleton";
import NoRetreatsFound from "@/components/retreats/NoRetreatsFound";
import RetreatBreadcrumb from "@/components/retreats/RetreatBreadcrumb";
import RecentlyViewedSection from "@/components/retreats/RecentlyViewedSection";
import ComparisonBar from "@/components/retreats/ComparisonBar";
import { fetchSanghosRetreats } from "@/lib/data";
import { fetchInsightLAEvents } from "@/lib/insightEvents";
import FeaturedRetreatCenters from "@/components/FeaturedRetreatCenters";
import { RetreatProvider } from "@/contexts/RetreatContext";

const Retreats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
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
    setSelectedLocation("All");
    setSelectedPriceRange("All");
    setStartDate(undefined);
    setEndDate(undefined);
    setSortBy('date');
  };

  const allCategories = Array.from(
    new Set(allRetreats.flatMap((retreat) => retreat.category))
  ).sort();

  // Enhanced filtering logic
  const filteredAndSortedRetreats = useMemo(() => {
    let filtered = allRetreats.filter(retreat => {
      // Basic filters
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

      // Location filter
      const matchesLocation = selectedLocation === "All" || 
        retreat.location.state.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        (selectedLocation === "Online" && retreat.location.city.toLowerCase().includes("online"));

      // Price filter
      const matchesPriceRange = (() => {
        if (selectedPriceRange === "All") return true;
        const price = retreat.price || 0;
        switch (selectedPriceRange) {
          case "$0-$100": return price <= 100;
          case "$100-$300": return price > 100 && price <= 300;
          case "$300-$500": return price > 300 && price <= 500;
          case "$500+": return price > 500;
          default: return true;
        }
      })();

      // Date filters
      const retreatDate = new Date(retreat.date);
      const matchesStartDate = !startDate || retreatDate >= startDate;
      const matchesEndDate = !endDate || retreatDate <= endDate;

      return matchesSearch && matchesCategory && matchesTab && 
             matchesLocation && matchesPriceRange && matchesStartDate && matchesEndDate;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'popularity':
          return (b.capacity - b.remaining) - (a.capacity - a.remaining);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allRetreats, searchQuery, selectedCategory, activeTab, selectedLocation, 
      selectedPriceRange, startDate, endDate, sortBy]);

  const sanghoRetreats = allRetreats.filter(retreat => retreat.isSanghos);
  const thirdPartyRetreats = allRetreats.filter(retreat => !retreat.isSanghos);

  const retreatCounts = {
    all: allRetreats.length,
    sanghos: sanghoRetreats.length,
    thirdparty: thirdPartyRetreats.length
  };

  return (
    <RetreatProvider>
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
          {/* Breadcrumb Navigation */}
          <RetreatBreadcrumb 
            activeTab={activeTab}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />

          {/* Recently Viewed Section */}
          <RecentlyViewedSection />

          {/* Advanced Filters section */}
          <AdvancedRetreatFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
            allCategories={allCategories}
            resetFilters={resetFilters}
          />

          {/* Results header */}
          <RetreatResultsHeader 
            filteredCount={filteredAndSortedRetreats.length} 
            activeTab={activeTab}
            isLoadingEvents={isLoadingEvents}
          />

          {/* Content section */}
          {isLoadingEvents ? (
            <div className={cn(
              "gap-6 mb-10",
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "flex flex-col space-y-4"
            )}>
              {Array.from({ length: 6 }).map((_, index) => (
                <RetreatCardSkeleton key={index} viewMode={viewMode} />
              ))}
            </div>
          ) : filteredAndSortedRetreats.length > 0 ? (
            <div 
              className={cn(
                "gap-6 mb-10 transition-opacity duration-700",
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "flex flex-col space-y-4",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              {filteredAndSortedRetreats.map((retreat, index) => (
                <RetreatCard 
                  key={retreat.id} 
                  retreat={retreat} 
                  index={index}
                  comingSoon={retreat.isSanghos}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <NoRetreatsFound resetFilters={resetFilters} loadingError={insightLALoadingError} />
          )}
        </div>
        <FeaturedRetreatCenters />
        
        {/* Comparison Bar */}
        <ComparisonBar />
      </main>
      
      <Footer />
    </RetreatProvider>
  );
};

export default Retreats;
