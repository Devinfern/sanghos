
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EnhancedSearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const popularSearches = ["Meditation", "Yoga", "Mindfulness", "Retreats", "Wellness"];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      custom={1}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-sand/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
        <div className="relative bg-white/95 backdrop-blur-md border-2 border-brand-subtle/30 hover:border-brand-primary/50 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-brand-primary h-6 w-6 z-10" />
            <Input
              placeholder="Search discussions, events, retreats, and members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-16 pr-24 py-6 text-lg border-0 focus:ring-0 focus:border-0 bg-transparent placeholder:text-muted-foreground/70 font-medium"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-xl hover:bg-brand-subtle/20 transition-colors"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </Button>
              {searchQuery && (
                <Button
                  size="sm"
                  className="rounded-xl bg-brand-primary hover:bg-brand-primary/90 transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Search
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      <motion.div 
        className="mt-4 flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-sm text-muted-foreground mr-2">Popular:</span>
        {popularSearches.map((term) => (
          <Badge 
            key={term}
            variant="outline" 
            className="cursor-pointer hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-colors"
            onClick={() => setSearchQuery(term)}
          >
            {term}
          </Badge>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EnhancedSearchSection;
