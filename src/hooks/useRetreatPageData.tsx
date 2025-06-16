import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { fetchSanghosRetreats } from '@/lib/data';
import { fetchInsightLAEvents } from '@/lib/insightEvents';
import { getUserLocation, sortByDistance, type UserLocation } from '@/lib/utils/distanceUtils';

export type ViewMode = 'grid' | 'list' | 'map';
export type { UserLocation };

export const useRetreatPageData = () => {
  // Data state
  const [allRetreats, setAllRetreats] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [insightLALoadingError, setInsightLALoadingError] = useState(false);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("all");

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  // Preview state
  const [previewRetreat, setPreviewRetreat] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadAllEvents = async () => {
      try {
        console.log("Retreats page: Loading events from all sources...");
        
        const sanghoRetreats = await fetchSanghosRetreats();
        console.log(`Retreats page: Loaded ${sanghoRetreats.length} Sanghos retreats`);
        
        let insightLARetreats = [];
        try {
          insightLARetreats = await fetchInsightLAEvents();
          console.log(`Retreats page: Loaded ${insightLARetreats.length} InsightLA retreats`);
        } catch (insightError) {
          console.error("Retreats page: Failed to load InsightLA retreats", insightError);
          setInsightLALoadingError(true);
        }
        
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

  // Computed values
  const allCategories = Array.from(
    new Set(allRetreats.flatMap((retreat) => retreat.category))
  ).sort();

  const sanghoRetreats = allRetreats.filter(retreat => retreat.isSanghos);
  const thirdPartyRetreats = allRetreats.filter(retreat => !retreat.isSanghos);

  const retreatCounts = {
    all: allRetreats.length,
    sanghos: sanghoRetreats.length,
    thirdparty: thirdPartyRetreats.length
  };

  // Enhanced filtering logic
  const filteredAndSortedRetreats = useMemo(() => {
    let filtered = allRetreats.filter(retreat => {
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

  // Event handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
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
      setSortBy('distance');
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

  const handleRetreatPreview = (retreat) => {
    setPreviewRetreat(retreat);
    setIsPreviewOpen(true);
  };

  const getCardViewMode = (viewMode: ViewMode): 'grid' | 'list' => {
    return viewMode === 'map' ? 'grid' : viewMode;
  };

  return {
    // Data
    allRetreats,
    isLoaded,
    isLoadingEvents,
    insightLALoadingError,
    filteredAndSortedRetreats,
    paginatedRetreats,
    allCategories,
    retreatCounts,
    totalPages,
    
    // Filter state
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedPriceRange,
    startDate,
    endDate,
    activeTab,
    
    // View state
    viewMode,
    sortBy,
    currentPage,
    itemsPerPage,
    userLocation,
    
    // Preview state
    previewRetreat,
    isPreviewOpen,
    
    // Setters
    setSearchQuery,
    setSelectedCategory,
    setSelectedLocation,
    setSelectedPriceRange,
    setStartDate,
    setEndDate,
    setViewMode,
    setSortBy,
    setCurrentPage,
    setItemsPerPage,
    setIsPreviewOpen,
    
    // Handlers
    handleSearch,
    handleCategorySelect,
    handleTabChange,
    handleGetUserLocation,
    resetFilters,
    handleRetreatPreview,
    getCardViewMode
  };
};
