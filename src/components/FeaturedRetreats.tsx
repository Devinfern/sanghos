
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Grid, List, MapIcon, ChevronDown, Search, Filter, Compass, Clock, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { retreats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import RetreatCard from "./RetreatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

type ViewMode = "grid" | "list" | "map";

// Location interface
interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

const FeaturedRetreats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchRadius, setSearchRadius] = useState(25); // Miles
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  // Extract unique categories
  const featuredRetreats = retreats.filter((retreat) => retreat.featured);
  const categories = Array.from(new Set(retreats.flatMap(retreat => retreat.category)));
  
  // Filter by category if one is selected
  const filteredRetreats = featuredRetreats.filter(retreat => {
    const matchesCategory = activeCategory 
      ? retreat.category.includes(activeCategory)
      : true;
    
    const matchesSearch = searchQuery
      ? retreat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        retreat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        retreat.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
      
    // If we have user location and retreat has coordinates, filter by distance
    if (userLocation && retreat.location.coordinates && searchRadius > 0) {
      const distance = calculateDistance(
        userLocation.lat, 
        userLocation.lng,
        retreat.location.coordinates.lat,
        retreat.location.coordinates.lng
      );
      
      return matchesCategory && matchesSearch && distance <= searchRadius;
    }
    
    return matchesCategory && matchesSearch;
  });

  // Use intersection observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    // Get the current element
    const element = document.getElementById("featured-retreats");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Handle detecting user's location
  const detectUserLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          setUserLocation({
            lat: latitude,
            lng: longitude
          });
          
          // Try to get address from coordinates using reverse geocoding
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=YOUR_MAPBOX_TOKEN`
            );
            
            if (response.ok) {
              const data = await response.json();
              if (data.features && data.features.length > 0) {
                const placeName = data.features[0].place_name;
                setUserLocation(prev => prev ? { ...prev, address: placeName } : null);
              }
            }
          } catch (error) {
            console.error("Error getting address:", error);
          }
          
          setIsLocating(false);
          toast.success("Location detected successfully");
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
          toast.error("Could not detect your location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
  };

  // Handle category filter change
  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };
  
  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
    setSearchRadius(25);
  };
  
  // Calculate distance between two points using Haversine formula
  function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 3958.8; // Earth radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  return (
    <section 
      id="featured-retreats"
      className="py-16 md:py-24 bg-gradient-to-b from-sage-50/80 via-white to-sage-50/50"
      ref={containerRef}
    >
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 relative"
        >
          <div className="max-w-lg">
            <Badge 
              variant="outline" 
              className="mb-3 bg-brand-primary/10 text-brand-primary border-brand-primary/20"
            >
              Discover Nearby
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-sage-900">
              Featured <span className="text-brand-primary">Experiences</span>
            </h2>
            <p className="text-muted-foreground">
              Explore handpicked wellness events and retreats in your area. From yoga and meditation 
              to workshops and immersive experiences, find your next moment of wellness.
            </p>
          </div>
        </motion.div>

        {/* Search and filters area */}
        <div className="mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative col-span-1 md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title, description, location..."
                className="pl-9 pr-4 py-2"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={cn(
                  "flex-grow justify-start",
                  isLocating && "opacity-70 cursor-wait"
                )}
                onClick={detectUserLocation}
                disabled={isLocating}
              >
                {isLocating ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    <span>Detecting...</span>
                  </>
                ) : (
                  <>
                    <Compass className="h-4 w-4 mr-2" />
                    <span>Near Me</span>
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className={cn(
                  isFilterOpen && "bg-sage-100"
                )}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-4 rounded-lg border shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  onClick={clearFilters}
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Clear all
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={activeCategory || ""} onValueChange={(value) => handleCategoryChange(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Radius: {searchRadius} miles</label>
                  <Slider 
                    defaultValue={[searchRadius]} 
                    max={100}
                    step={5}
                    onValueChange={(values) => setSearchRadius(values[0])}
                    disabled={!userLocation}
                    className={!userLocation ? "opacity-50" : ""}
                  />
                  {!userLocation && (
                    <p className="text-xs text-muted-foreground mt-1">Enable location to adjust radius</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">View Options</label>
                  <div className="flex border rounded-lg overflow-hidden">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={cn(
                        "rounded-none border-0 flex-1", 
                        viewMode === "grid" && "bg-sage-100"
                      )}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4 mr-2" />
                      Grid
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={cn(
                        "rounded-none border-0 border-l border-r flex-1", 
                        viewMode === "list" && "bg-sage-100"
                      )}
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4 mr-2" />
                      List
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={cn(
                        "rounded-none border-0 flex-1", 
                        viewMode === "map" && "bg-sage-100"
                      )}
                      onClick={() => setViewMode("map")}
                    >
                      <MapIcon className="h-4 w-4 mr-2" />
                      Map
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Active filters badges */}
          {(searchQuery || activeCategory || userLocation) && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                  <span>Search: {searchQuery.length > 15 ? `${searchQuery.substring(0, 15)}...` : searchQuery}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {activeCategory && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                  <span>Category: {activeCategory}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1 text-muted-foreground hover:text-foreground"
                    onClick={() => setActiveCategory(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {userLocation && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                  <span>
                    Near: {userLocation.address ? userLocation.address.split(',')[0] : 'Your location'} 
                    ({searchRadius} miles)
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1 text-muted-foreground hover:text-foreground"
                    onClick={() => setUserLocation(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results count and info */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-medium">Results</p>
            <Badge variant="outline" className="bg-white text-muted-foreground">
              {filteredRetreats.length} {filteredRetreats.length === 1 ? 'retreat' : 'retreats'}
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {userLocation ? (
              <span className="flex items-center">
                <MapIcon className="h-3.5 w-3.5 mr-1" />
                Showing events within {searchRadius} miles
              </span>
            ) : (
              <span className="flex items-center">
                <Compass className="h-3.5 w-3.5 mr-1" />
                Enable location for nearby events
              </span>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "grid" && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredRetreats.length > 0 ? filteredRetreats.map((retreat, index) => (
                <motion.div
                  key={retreat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onHoverStart={() => setHoveredCard(retreat.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <RetreatCard 
                    retreat={retreat}
                    index={index}
                    comingSoon={retreat.id === "retreat-6"} // Just mark one as coming soon for demo
                    viewMode="grid"
                    userLocation={userLocation}
                  />
                </motion.div>
              )) : (
                <motion.div
                  className="col-span-1 md:col-span-3 p-8 bg-white border border-gray-200 rounded-lg text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="rounded-full bg-sage-100 p-3">
                      <Search className="h-6 w-6 text-sage-500" />
                    </div>
                    <h3 className="text-lg font-medium">No retreats found</h3>
                    <p className="text-muted-foreground max-w-md">
                      We couldn't find any retreats matching your search criteria. 
                      Try adjusting your filters or search terms.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear all filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {viewMode === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {filteredRetreats.length > 0 ? filteredRetreats.map((retreat, index) => (
                <motion.div
                  key={retreat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <RetreatCard
                    retreat={retreat}
                    index={index}
                    viewMode="list"
                    comingSoon={retreat.id === "retreat-6"} // Just mark one as coming soon for demo
                    userLocation={userLocation}
                  />
                </motion.div>
              )) : (
                <motion.div
                  className="p-8 bg-white border border-gray-200 rounded-lg text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="rounded-full bg-sage-100 p-3">
                      <Search className="h-6 w-6 text-sage-500" />
                    </div>
                    <h3 className="text-lg font-medium">No retreats found</h3>
                    <p className="text-muted-foreground max-w-md">
                      We couldn't find any retreats matching your search criteria. 
                      Try adjusting your filters or search terms.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear all filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {viewMode === "map" && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-sage-100/50 border border-sage-200 rounded-xl p-10 text-center">
                <MapIcon className="w-16 h-16 text-sage-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Interactive Map Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're working on an interactive map that will show you all wellness events near your location.
                </p>
                <Button variant="outline" onClick={() => setViewMode("grid")}>
                  Return to Grid View
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary/90 group">
            <Link to="/retreats" className="flex items-center">
              View All Wellness Events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRetreats;
