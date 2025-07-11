
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Sparkles, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EnhancedSearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const popularSearches = [
    { term: "Meditation", trending: true },
    { term: "Yoga", trending: false },
    { term: "Mindfulness", trending: true },
    { term: "Retreats", trending: false },
    { term: "Wellness", trending: false }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      custom={1}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="relative group">
        {/* Enhanced background with glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-brand-primary/10 via-brand-sand/10 to-brand-rose/10 rounded-3xl blur-xl transition-all duration-500 ${isFocused ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}`} />
        
        <div className="relative bg-white/95 backdrop-blur-md border-2 border-brand-subtle/30 hover:border-brand-primary/40 focus-within:border-brand-primary/60 transition-all duration-300 rounded-3xl shadow-lg hover:shadow-xl">
          <div className="relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
              <div className="p-2 bg-brand-primary/10 rounded-full">
                <Search className="text-brand-primary h-5 w-5" />
              </div>
            </div>
            
            <Input
              placeholder="Search wellness discussions, events, retreats, and community members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-20 pr-32 py-7 text-lg border-0 focus:ring-0 focus:border-0 bg-transparent placeholder:text-muted-foreground/70 font-medium rounded-3xl"
            />
            
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-2xl hover:bg-brand-subtle/20 transition-colors px-4 py-2"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    size="sm"
                    className="rounded-2xl bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl px-4 py-2"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Popular Searches */}
      <motion.div 
        className="mt-6 flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mr-4">
          <TrendingUp className="h-4 w-4 text-brand-primary" />
          <span className="text-sm text-muted-foreground font-medium">Popular:</span>
        </div>
        
        {popularSearches.map((item, index) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Badge 
              variant="outline" 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 rounded-full px-3 py-1 ${
                item.trending 
                  ? 'bg-gradient-to-r from-brand-primary/10 to-brand-sand/10 border-brand-primary/30 hover:border-brand-primary/50 text-brand-primary' 
                  : 'hover:bg-brand-subtle/20 hover:border-brand-primary/30'
              }`}
              onClick={() => setSearchQuery(item.term)}
            >
              {item.trending && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-brand-rose rounded-full mr-2"
                />
              )}
              {item.term}
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-brand-subtle/20 shadow-lg"
        >
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
            {['Discussions', 'Events', 'Retreats', 'Members', 'Resources'].map((filter) => (
              <Badge 
                key={filter}
                variant="outline" 
                className="cursor-pointer hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-colors rounded-full"
              >
                {filter}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EnhancedSearchSection;
