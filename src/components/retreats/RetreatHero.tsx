
import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = [
  "Meditation", 
  "Yoga", 
  "Breathwork", 
  "Sound Healing", 
  "Forest Therapy", 
  "Mindfulness"
];

interface RetreatHeroProps {
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
}

const RetreatHero = ({ onSearch, onCategorySelect }: RetreatHeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-sage-50 to-sage-100 py-16 md:py-24">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-sage-200/20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-sage-200/30 translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-900 mb-6">
            Find Your Perfect <span className="text-primary">Mindfulness Retreat</span>
          </h1>
          
          <p className="text-lg text-sage-700 mb-8 max-w-2xl mx-auto">
            Discover curated retreats designed to help you reconnect with yourself, 
            find balance, and cultivate mindfulness in stunning locations.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center bg-white text-sage-600 rounded-md px-4 py-2 shadow-sm">
              <span className="font-medium">200+</span>
              <span className="ml-2 text-sage-500">Active Retreats</span>
            </div>
            <div className="flex items-center bg-white text-sage-600 rounded-md px-4 py-2 shadow-sm">
              <span className="font-medium">50+</span>
              <span className="ml-2 text-sage-500">Expert Guides</span>
            </div>
            <div className="flex items-center bg-white text-sage-600 rounded-md px-4 py-2 shadow-sm">
              <span className="font-medium">1000+</span>
              <span className="ml-2 text-sage-500">Happy Participants</span>
            </div>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className="relative max-w-xl mx-auto mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search retreats by name, location, or type..."
                className="pl-10 py-6 bg-white border-0 shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="bg-white hover:bg-sage-100 cursor-pointer text-sage-700 hover:text-sage-900 border-sage-200"
                onClick={() => onCategorySelect(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            variant="link" 
            className="text-sage-700 hover:text-sage-900 font-normal"
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
          >
            Browse all retreats <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RetreatHero;
