
import { useState, useEffect } from "react";
import { Search, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SanghosIcon from "@/components/SanghosIcon";

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
  onTabChange?: (tab: string) => void;
  retreatCounts?: {
    all: number;
    sanghos: number;
    thirdparty: number;
  };
  activeTab?: string;
}

const RetreatHero = ({ 
  onSearch, 
  onCategorySelect,
  onTabChange,
  retreatCounts = { all: 0, sanghos: 0, thirdparty: 0 },
  activeTab = "all"
}: RetreatHeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSearch, setExpandedSearch] = useState(false);
  
  // If the user scrolls down more than 300px, we'll consider the search "expanded"
  useEffect(() => {
    const handleScroll = () => {
      setExpandedSearch(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    
    // Automatically scroll to results
    if (!expandedSearch) {
      setTimeout(() => {
        window.scrollTo({ top: 450, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-sage-50 to-sage-100 pt-14 pb-8 md:pt-20 md:pb-10">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-sage-200/20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-sage-200/30 translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-900 mb-4">
            Find Your Perfect <span className="text-primary">Mindfulness Retreat</span>
          </h1>
          
          <p className="text-lg text-sage-700 mb-6 max-w-2xl mx-auto">
            Discover curated retreats designed to help you reconnect with yourself, 
            find balance, and cultivate mindfulness in stunning locations.
          </p>
          
          {/* Integrated Tab Navigation */}
          {onTabChange && (
            <div className="mb-6">
              <Tabs defaultValue={activeTab} onValueChange={onTabChange} className="w-full">
                <div className="flex justify-center mb-4">
                  <TabsList className="grid grid-cols-3 w-full max-w-md bg-white/90 shadow-sm">
                    <TabsTrigger value="all" className="relative overflow-hidden group">
                      All Retreats
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform origin-left duration-300"></span>
                    </TabsTrigger>
                    <TabsTrigger value="sanghos" className="relative overflow-hidden group">
                      <span className="flex items-center gap-1">
                        Sanghos 
                        <SanghosIcon className="ml-0.5 w-4 h-4" />
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform origin-left duration-300"></span>
                    </TabsTrigger>
                    <TabsTrigger value="thirdparty" className="relative overflow-hidden group">
                      Partners
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform origin-left duration-300"></span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="animate-fade-up">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center bg-white/80 rounded-full px-3 py-1 text-sm text-sage-600">
                      <Info className="w-3.5 h-3.5 mr-1" />
                      Showing all {retreatCounts.all} retreats
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="sanghos" className="animate-fade-up">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center bg-white/80 rounded-full px-3 py-1 text-sm text-sage-600">
                      <Info className="w-3.5 h-3.5 mr-1" />
                      Showing {retreatCounts.sanghos} retreats organized by Sanghos
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="thirdparty" className="animate-fade-up">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center bg-white/80 rounded-full px-3 py-1 text-sm text-sage-600">
                      <Info className="w-3.5 h-3.5 mr-1" />
                      Showing {retreatCounts.thirdparty} partner retreats
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
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
      </div>
    </div>
  );
};

export default RetreatHero;
