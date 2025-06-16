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
import RetreatMapView from "@/components/retreats/RetreatMapView";
import RetreatQuickPreview from "@/components/retreats/RetreatQuickPreview";
import RetreatPagination from "@/components/retreats/RetreatPagination";
import RetreatSearchSuggestions from "@/components/retreats/RetreatSearchSuggestions";
import { fetchSanghosRetreats } from "@/lib/data";
import { fetchInsightLAEvents } from "@/lib/insightEvents";
import FeaturedRetreatCenters from "@/components/FeaturedRetreatCenters";
import { RetreatProvider } from "@/contexts/RetreatContext";
import { Button } from "@/components/ui/button";
import { Grid, List, MapIcon } from "lucide-react";
import { getUserLocation, sortByDistance, type UserLocation } from "@/lib/utils/distanceUtils";
import { toast } from "sonner";

type ViewMode = 'grid' | 'list' | 'map';

const Retreats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [allRetreats, setAllRetreats] = useState([]);
  const [insightLALoadingError, setInsightLALoadingError] = useState(false);
  
  // New state for Phase 4 features
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [previewRetreat, setPreviewRetreat] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
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
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveTab("all");
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleGetUserLocation = async () => {
    try {
      const location = await getUserLocation();
      setUserLocation(location);
      setSortBy('distance'); // Auto-sort by distance when location is detected
      toast.success('Location detected! Sorting by distance.');
    } catch (error) {
      console.error('Error getting user location:', error);
      toast.error('Could not detect your location');
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedLocation("All");
    setSelectedPriceRange("All");
    setStartDate(undefined);
    setEndDate(undefined);
    setSortBy('date');
    setCurrentPage(1);
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

      const matchesLocation = selectedLocation === "All" || 
        retreat.location.state.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        (selectedLocation === "Online" && retreat.location.city.toLowerCase().includes("online"));

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

      const retreatDate = new Date(retreat.date);
      const matchesStartDate = !startDate || retreatDate >= startDate;
      const matchesEndDate = !endDate || retreatDate <= endDate;

      return matchesSearch && matchesCategory && matchesTab && 
             matchesLocation && matchesPriceRange && matchesStartDate && matchesEndDate;
    });

    // Sorting logic with distance support
    if (sortBy === 'distance' && userLocation) {
      filtered = sortByDistance(filtered, userLocation);
    } else {
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
    }

    return filtered;
  }, [allRetreats, searchQuery, selectedCategory, activeTab, selectedLocation, 
      selectedPriceRange, startDate, endDate, sortBy, userLocation]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedRetreats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRetreats = filteredAndSortedRetreats.slice(startIndex, startIndex + itemsPerPage);

  const sanghoRetreats = allRetreats.filter(retreat => retreat.isSanghos);
  const thirdPartyRetreats = allRetreats.filter(retreat => !retreat.isSanghos);

  const retreatCounts = {
    all: allRetreats.length,
    sanghos: sanghoRetreats.length,
    thirdparty: thirdPartyRetreats.length
  };

  const handleRetreatPreview = (retreat) => {
    setPreviewRetreat(retreat);
    setIsPreviewOpen(true);
  };

  // Helper function to get the correct view mode for components that don't support map
  const getCardViewMode = (viewMode: ViewMode): 'grid' | 'list' => {
    return viewMode === 'map' ? 'grid' : viewMode;
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
          <RetreatBreadcrumb 
            activeTab={activeTab}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />

          <RecentlyViewedSection />

          {/* Enhanced search with suggestions */}
          <div className="mb-6">
            <RetreatSearchSuggestions
              value={searchQuery}
              onChange={handleSearch}
              retreats={allRetreats}
              className="max-w-2xl"
            />
          </div>

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
            viewMode={getCardViewMode(viewMode)}
            setViewMode={(mode) => setViewMode(mode as ViewMode)}
            sortBy={sortBy}
            setSortBy={setSortBy}
            allCategories={allCategories}
            resetFilters={resetFilters}
          />

          {/* Enhanced view mode controls */}
          <div className="flex items-center justify-between mb-6">
            <RetreatResultsHeader 
              filteredCount={filteredAndSortedRetreats.length} 
              activeTab={activeTab}
              isLoadingEvents={isLoadingEvents}
            />
            
            <div className="flex items-center gap-2">
              {!userLocation && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGetUserLocation}
                  className="text-sm"
                >
                  Detect Location
                </Button>
              )}
              
              <div className="flex border rounded-lg overflow-hidden">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "rounded-none border-0", 
                    viewMode === "grid" && "bg-sage-100"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "rounded-none border-0 border-l border-r", 
                    viewMode === "list" && "bg-sage-100"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "rounded-none border-0", 
                    viewMode === "map" && "bg-sage-100"
                  )}
                  onClick={() => setViewMode("map")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content section with map view support */}
          {isLoadingEvents ? (
            <div className={cn(
              "gap-6 mb-10",
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "flex flex-col space-y-4"
            )}>
              {Array.from({ length: 6 }).map((_, index) => (
                <RetreatCardSkeleton key={index} viewMode={getCardViewMode(viewMode)} />
              ))}
            </div>
          ) : viewMode === 'map' ? (
            <RetreatMapView
              retreats={filteredAndSortedRetreats}
              onRetreatSelect={handleRetreatPreview}
            />
          ) : filteredAndSortedRetreats.length > 0 ? (
            <>
              <div 
                className={cn(
                  "gap-6 mb-10 transition-opacity duration-700",
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                    : "flex flex-col space-y-4",
                  isLoaded ? "opacity-100" : "opacity-0"
                )}
              >
                {paginatedRetreats.map((retreat, index) => (
                  <div
                    key={retreat.id}
                    className="cursor-pointer"
                    onClick={() => handleRetreatPreview(retreat)}
                  >
                    <RetreatCard 
                      retreat={retreat} 
                      index={index}
                      comingSoon={retreat.isSanghos}
                      viewMode={getCardViewMode(viewMode)}
                      userLocation={userLocation}
                    />
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <RetreatPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAndSortedRetreats.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newItemsPerPage) => {
                  setItemsPerPage(newItemsPerPage);
                  setCurrentPage(1);
                }}
              />
            </>
          ) : (
            <NoRetreatsFound resetFilters={resetFilters} loadingError={insightLALoadingError} />
          )}
        </div>
        
        <FeaturedRetreatCenters />
        
        <ComparisonBar />
      </main>
      
      {/* Quick Preview Modal */}
      <RetreatQuickPreview
        retreat={previewRetreat}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
      
      <Footer />
    </RetreatProvider>
  );
};

export default Retreats;
