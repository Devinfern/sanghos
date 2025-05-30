
import { useState, useEffect, useRef } from "react";
import { Search, Filter, X, TrendingUp, Clock, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: string;
  title: string;
  type: "discussion" | "event" | "resource" | "member";
  excerpt?: string;
  author?: string;
  category?: string;
}

interface CommunitySearchBarProps {
  onSearch: (query: string, filters: any) => void;
  placeholder?: string;
}

const CommunitySearchBar = ({
  onSearch,
  placeholder = "Search discussions, events, resources, and members..."
}: CommunitySearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const recentSearches = [
    "meditation techniques",
    "yoga for beginners",
    "breathwork session",
    "retreat planning"
  ];

  const trendingTopics = [
    "mindfulness",
    "sound healing",
    "wellness journey",
    "community support"
  ];

  const filterOptions = [
    { id: "discussions", label: "Discussions", icon: Search },
    { id: "events", label: "Events", icon: Clock },
    { id: "resources", label: "Resources", icon: TrendingUp },
    { id: "members", label: "Members", icon: Users }
  ];

  const mockSearchResults: SearchResult[] = [
    {
      id: "1",
      title: "Best meditation apps for beginners",
      type: "discussion",
      excerpt: "Looking for recommendations on meditation apps that are great for starting out...",
      author: "Sarah M.",
      category: "meditation"
    },
    {
      id: "2",
      title: "Morning Yoga Session",
      type: "event",
      excerpt: "Join us for a refreshing morning yoga practice suitable for all levels...",
      author: "Yoga Studio",
      category: "yoga"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(value.length > 0);
    if (value.length > 2) {
      onSearch(value, { types: selectedFilters });
    }
  };

  const handleFilterToggle = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(f => f !== filterId)
      : [...selectedFilters, filterId];
    
    setSelectedFilters(newFilters);
    onSearch(query, { types: newFilters });
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    setSelectedFilters([]);
    onSearch("", {});
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "discussion": return Search;
      case "event": return Clock;
      case "resource": return TrendingUp;
      case "member": return Users;
      default: return Search;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${isExpanded ? 'scale-105' : ''}`}>
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            setIsExpanded(true);
            setShowSuggestions(true);
          }}
          className="pl-12 pr-12 py-3 text-lg rounded-full border-2 border-brand-subtle/30 focus:border-brand-primary transition-all duration-300"
        />
        {query && (
          <Button
            size="sm"
            variant="ghost"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Pills */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedFilters.map((filterId) => {
            const filter = filterOptions.find(f => f.id === filterId);
            return filter ? (
              <Badge
                key={filterId}
                variant="secondary"
                className="cursor-pointer hover:bg-brand-primary hover:text-white transition-colors"
                onClick={() => handleFilterToggle(filterId)}
              >
                {filter.label}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ) : null;
          })}
        </div>
      )}

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="p-4 shadow-lg border-brand-subtle/20">
              {query.length === 0 ? (
                <div className="space-y-4">
                  {/* Filter Options */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter by type
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.map((filter) => (
                        <Badge
                          key={filter.id}
                          variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-brand-primary hover:text-white transition-colors"
                          onClick={() => handleFilterToggle(filter.id)}
                        >
                          <filter.icon className="h-3 w-3 mr-1" />
                          {filter.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Recent searches
                    </h4>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <div
                          key={index}
                          className="text-sm p-2 rounded hover:bg-brand-subtle/10 cursor-pointer transition-colors"
                          onClick={() => handleInputChange(search)}
                        >
                          {search}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trending Topics */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Trending topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trendingTopics.map((topic, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-brand-primary hover:text-white transition-colors"
                          onClick={() => handleInputChange(topic)}
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Search results for "{query}"
                  </h4>
                  {mockSearchResults
                    .filter(result => 
                      result.title.toLowerCase().includes(query.toLowerCase()) ||
                      result.excerpt?.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((result) => {
                      const IconComponent = getTypeIcon(result.type);
                      return (
                        <div
                          key={result.id}
                          className="p-3 rounded-lg hover:bg-brand-subtle/10 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <IconComponent className="h-4 w-4 text-brand-primary mt-1" />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-sm truncate">{result.title}</h5>
                              {result.excerpt && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {result.excerpt}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-1">
                                {result.author && (
                                  <span className="text-xs text-muted-foreground">
                                    by {result.author}
                                  </span>
                                )}
                                {result.category && (
                                  <Badge variant="outline" className="text-xs">
                                    {result.category}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunitySearchBar;
