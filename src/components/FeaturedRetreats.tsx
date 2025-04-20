
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Grid, List, Map as MapIcon, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { retreats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import RetreatCard from "./RetreatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ViewMode = "grid" | "list" | "map";

const FeaturedRetreats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const featuredRetreats = retreats.filter((retreat) => retreat.featured);
  
  // Extract unique categories from retreats
  const categories = Array.from(new Set(retreats.flatMap(retreat => retreat.category)));
  
  // Filter by category if one is selected
  const filteredRetreats = activeCategory 
    ? featuredRetreats.filter(retreat => retreat.category.includes(activeCategory))
    : featuredRetreats;

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

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

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
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 relative"
        >
          <div className="max-w-lg">
            <Badge 
              variant="outline" 
              className="mb-3 bg-brand-primary/10 text-brand-primary border-brand-primary/20"
            >
              Curated Experience
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-sage-900">
              Featured <span className="text-brand-primary">Retreats</span>
            </h2>
            <p className="text-muted-foreground">
              Discover our handpicked selection of transformative daylong retreats
              in unique private spaces. Each retreat is carefully curated to provide
              an exceptional wellness experience.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-0">
            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {activeCategory || "All Categories"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleCategoryChange(null)}>
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* View Mode Selector */}
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
                <Grid className="h-4 w-4 mr-2" />
                Grid
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
                <List className="h-4 w-4 mr-2" />
                List
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
                <MapIcon className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>
          </div>
        </motion.div>

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
              {filteredRetreats.map((retreat, index) => (
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
                    comingSoon={retreat.id === hoveredCard ? false : true}
                  />
                </motion.div>
              ))}
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
              {filteredRetreats.map((retreat, index) => (
                <motion.div
                  key={retreat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="bg-white rounded-xl shadow-sm border border-sage-100 overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img 
                      src={retreat.image} 
                      alt={retreat.title}
                      className="w-full h-full object-cover"
                    />
                    {retreat.featured && (
                      <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>
                    )}
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-muted-foreground">
                          {retreat.location.city}, {retreat.location.state}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {retreat.category[0]}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{retreat.title}</h3>
                      <p className="text-muted-foreground line-clamp-2 mb-4">{retreat.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={retreat.instructor.image}
                          alt={retreat.instructor.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm">{retreat.instructor.name}</span>
                      </div>
                      
                      <Button asChild>
                        <Link to={`/retreat/${retreat.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                <h3 className="text-xl font-medium mb-2">Map View Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're working on an interactive map to help you discover retreats by location.
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
              View All Retreats
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRetreats;
