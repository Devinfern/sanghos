
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search as SearchIcon, X, Compass, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryOptions = [
  "Yoga", 
  "Meditation", 
  "Breathwork", 
  "Sound Healing", 
  "Forest Therapy", 
  "Mindfulness",
  "Wellness Workshop",
  "Retreat",
  "Fitness"
];

// Location interface
interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

const Search = () => {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchRadius, setSearchRadius] = useState(25); // Miles
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [dateFilter, setDateFilter] = useState<string>("any");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Parse search params from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(locationHook.search);
    const searchQuery = searchParams.get("search") || "";
    const categories = searchParams.getAll("category");
    const radius = searchParams.get("radius");
    const date = searchParams.get("date") || "any";
    
    setQuery(searchQuery);
    setSelectedCategories(categories);
    if (radius) setSearchRadius(parseInt(radius));
    setDateFilter(date);
    
    // Try to get stored location from localStorage
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      try {
        setUserLocation(JSON.parse(storedLocation));
      } catch (e) {
        console.error("Error parsing stored location", e);
      }
    }
  }, [locationHook.search]);
  
  // Store location in localStorage when it changes
  useEffect(() => {
    if (userLocation) {
      localStorage.setItem("userLocation", JSON.stringify(userLocation));
    }
  }, [userLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    
    if (query.trim()) {
      searchParams.set("search", query.trim());
    }
    
    selectedCategories.forEach(category => {
      searchParams.append("category", category);
    });
    
    if (userLocation) {
      searchParams.set("lat", userLocation.lat.toString());
      searchParams.set("lng", userLocation.lng.toString());
      searchParams.set("radius", searchRadius.toString());
    }
    
    if (dateFilter !== "any") {
      searchParams.set("date", dateFilter);
    }
    
    navigate(`/retreats?${searchParams.toString()}`);
    setIsAdvancedOpen(false);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedCategories([]);
    setDateFilter("any");
    navigate("/retreats");
  };
  
  // User location detection
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

  const removeLocation = () => {
    setUserLocation(null);
    localStorage.removeItem("userLocation");
  };

  const hasFilters = query || selectedCategories.length > 0 || userLocation || dateFilter !== "any";

  return (
    <div className="animate-slide-up">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="relative md:col-span-3">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search wellness events..."
              className="pl-10 pr-4 py-6 bg-white border-sand-200 rounded-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-2 flex gap-2">
            <Button 
              type="button"
              variant="outline" 
              className="flex-grow justify-start py-6 bg-white border-sand-200"
              onClick={userLocation ? removeLocation : detectUserLocation}
              disabled={isLocating}
            >
              {isLocating ? (
                <>
                  <span className="h-4 w-4 mr-2 rounded-full border-2 border-transparent border-t-primary animate-spin"></span>
                  <span>Detecting...</span>
                </>
              ) : userLocation ? (
                <>
                  <Compass className="h-4 w-4 mr-2 text-primary" />
                  <span className="truncate">
                    {userLocation.address 
                      ? userLocation.address.split(',').slice(0, 2).join(', ')
                      : "Your Location"}
                  </span>
                </>
              ) : (
                <>
                  <Compass className="h-4 w-4 mr-2" />
                  <span>Find Near Me</span>
                </>
              )}
            </Button>
            
            <Popover open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <PopoverTrigger asChild>
                <Button 
                  type="button"
                  variant="outline" 
                  className="px-3 py-6 bg-white border-sand-200"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 md:w-96 p-4" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Advanced Filters</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Date</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="this-weekend">This Weekend</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                        <SelectItem value="next-week">Next Week</SelectItem>
                        <SelectItem value="this-month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {userLocation && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Distance</label>
                        <span className="text-sm text-muted-foreground">{searchRadius} miles</span>
                      </div>
                      <Slider 
                        defaultValue={[searchRadius]} 
                        max={100}
                        step={5}
                        onValueChange={(values) => setSearchRadius(values[0])}
                      />
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Categories</p>
            {hasFilters && (
              <Button 
                type="button"
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
                onClick={clearFilters}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => (
              <Badge
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className={
                  selectedCategories.includes(category)
                    ? "bg-sage-600 hover:bg-sage-700 cursor-pointer"
                    : "hover:bg-sage-100 cursor-pointer"
                }
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full py-6 text-base font-medium">
          Find Wellness Events
        </Button>
        
        {/* Active filters visualization */}
        {hasFilters && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {query && (
              <Badge variant="outline" className="bg-sage-50">
                Search: {query.length > 15 ? query.substring(0, 15) + '...' : query}
              </Badge>
            )}
            
            {userLocation && (
              <Badge variant="outline" className="bg-sage-50">
                Near: {userLocation.address 
                  ? userLocation.address.split(',')[0]
                  : 'Your location'} ({searchRadius} mi)
              </Badge>
            )}
            
            {dateFilter !== 'any' && (
              <Badge variant="outline" className="bg-sage-50">
                {dateFilter === 'today' ? 'Today' : 
                 dateFilter === 'tomorrow' ? 'Tomorrow' :
                 dateFilter === 'this-weekend' ? 'This Weekend' :
                 dateFilter === 'this-week' ? 'This Week' :
                 dateFilter === 'next-week' ? 'Next Week' :
                 'This Month'}
              </Badge>
            )}
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default Search;
