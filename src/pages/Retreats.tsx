
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Info, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetreatCard from "@/components/RetreatCard";
import SanghosIcon from "@/components/SanghosIcon";
import RetreatHero from "@/components/retreats/RetreatHero";
import { retreats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const allCategories = Array.from(
  new Set(retreats.flatMap((retreat) => retreat.category))
).sort();

// Previously we were using this to identify the most recent retreat
// Now all retreats will have the coming soon overlay
const getMostRecentRetreatId = () => {
  const sortedRetreats = [...retreats].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sortedRetreats[0]?.id;
};

const mostRecentRetreatId = getMostRecentRetreatId();

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

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
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

  const hasFilters = searchQuery !== "" || selectedCategory !== null;

  return (
    <>
      <Helmet>
        <title>Retreats | Sanghos</title>
        <meta 
          name="description" 
          content="Discover our mindfulness and wellness retreats to reconnect with yourself."
        />
      </Helmet>

      <main className="pt-20 bg-sage-50/30 min-h-screen flex flex-col">
        <RetreatHero 
          onSearch={handleSearch} 
          onCategorySelect={handleCategorySelect}
          onTabChange={handleTabChange}
          retreatCounts={retreatCounts}
          activeTab={activeTab}
        />
        
        <div className="container px-4 md:px-6 py-10 flex-grow">
          {hasFilters && (
            <Card className="mb-6 overflow-hidden shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
                    
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                        Search: {searchQuery.length > 15 ? `${searchQuery.substring(0, 15)}...` : searchQuery}
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
                    
                    {selectedCategory && (
                      <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                        Category: {selectedCategory}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-5 w-5 p-0 ml-1 text-muted-foreground hover:text-foreground"
                          onClick={() => setSelectedCategory(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-sm text-muted-foreground hover:text-primary ml-auto"
                      onClick={resetFilters}
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Clear all filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-medium">
                Results
              </p>
              <Badge variant="outline" className="bg-white text-muted-foreground">
                {filteredRetreats.length} {filteredRetreats.length === 1 ? 'retreat' : 'retreats'}
              </Badge>
            </div>
            
            {activeTab === "sanghos" && (
              <div className="flex items-center text-sm text-muted-foreground">
                <SanghosIcon className="h-4 w-4 mr-1 text-sage-600" />
                <span>Sanghos organized retreats</span>
              </div>
            )}
            {activeTab === "thirdparty" && (
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Partner retreats</span>
              </div>
            )}
          </div>

          {filteredRetreats.length > 0 ? (
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 transition-opacity duration-700",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              {filteredRetreats.map((retreat, index) => (
                <RetreatCard 
                  key={retreat.id} 
                  retreat={retreat} 
                  index={index}
                  comingSoon={true} // Set all retreats to coming soon
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 my-8 bg-white shadow-sm">
              <CardContent className="pt-0">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-sage-100 p-4 mb-4">
                    <Info className="h-6 w-6 text-sage-600" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No retreats found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't find any retreats matching your search criteria. Try adjusting your filters or search query.
                  </p>
                  <Button 
                    variant="default" 
                    onClick={resetFilters}
                  >
                    Reset filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Retreats;
