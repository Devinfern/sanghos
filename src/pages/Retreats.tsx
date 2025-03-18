
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Search, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetreatCard from "@/components/RetreatCard";
import SanghosIcon from "@/components/SanghosIcon";
import RetreatHero from "@/components/retreats/RetreatHero";
import { retreats } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const allCategories = Array.from(
  new Set(retreats.flatMap((retreat) => retreat.category))
).sort();

const Retreats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveTab("all");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredRetreats = retreats.filter(retreat => {
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
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const sanghoRetreats = retreats.filter(retreat => retreat.isSanghos);
  const thirdPartyRetreats = retreats.filter(retreat => !retreat.isSanghos);

  const retreatCounts = {
    all: retreats.length,
    sanghos: sanghoRetreats.length,
    thirdparty: thirdPartyRetreats.length
  };

  return (
    <>
      <Helmet>
        <title>Retreats | Sanghos</title>
        <meta 
          name="description" 
          content="Discover our mindfulness and wellness retreats to reconnect with yourself."
        />
      </Helmet>

      <Header />

      <main className="pt-20 bg-sage-50/50">
        <RetreatHero 
          onSearch={handleSearch} 
          onCategorySelect={handleCategorySelect}
          onTabChange={handleTabChange}
          retreatCounts={retreatCounts}
          activeTab={activeTab}
        />
        
        <div className="container px-4 md:px-6 py-8 -mt-4 relative z-10">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Refine your search..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select 
                value={selectedCategory || ""} 
                onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredRetreats.length} {filteredRetreats.length === 1 ? 'retreat' : 'retreats'} found
            </p>
          </div>

          {filteredRetreats.length > 0 ? (
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-700",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              {filteredRetreats.map((retreat, index) => (
                <RetreatCard 
                  key={retreat.id} 
                  retreat={retreat} 
                  index={index}
                  comingSoon={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">No retreats found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setActiveTab("all");
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Retreats;
