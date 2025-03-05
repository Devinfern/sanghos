
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categoryOptions = [
  "Yoga", 
  "Meditation", 
  "Breathwork", 
  "Sound Healing", 
  "Forest Therapy", 
  "Mindfulness"
];

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Parse search params from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";
    const categories = searchParams.getAll("category");
    
    setQuery(searchQuery);
    setSelectedCategories(categories);
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    
    if (query.trim()) {
      searchParams.set("search", query.trim());
    }
    
    selectedCategories.forEach(category => {
      searchParams.append("category", category);
    });
    
    navigate(`/retreats?${searchParams.toString()}`);
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
    navigate("/retreats");
  };

  const hasFilters = query || selectedCategories.length > 0;

  return (
    <div className="animate-slide-up">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search retreats..."
            className="pl-10 pr-4 py-6 bg-white border-sand-200 rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Categories</p>
            {hasFilters && (
              <Button 
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

        <Button type="submit" className="w-full">
          Search Retreats
        </Button>
      </form>
    </div>
  );
};

export default Search;
