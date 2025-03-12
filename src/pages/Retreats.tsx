
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Search, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetreatCard from "@/components/RetreatCard";
import SanghosIcon from "@/components/SanghosIcon";
import { retreats } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Retreats</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated selection of mindfulness and wellness retreats designed to help you 
              reconnect with yourself and find balance in your life.
            </p>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="all" className="relative overflow-hidden group">
                    All Retreats
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform origin-left duration-300"></span>
                  </TabsTrigger>
                  <TabsTrigger value="sanghos" className="relative overflow-hidden group">
                    <span className="flex items-center gap-1">
                      Sanghos 
                      <SanghosIcon className="ml-0.5 w-4 h-4 text-primary/90 fill-primary/60" />
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
                {activeTab === "all" && (
                  <div className="mb-2 flex justify-center">
                    <div className="inline-flex items-center bg-muted/60 rounded-full px-3 py-1 text-sm text-muted-foreground">
                      <Info className="w-3.5 h-3.5 mr-1" />
                      Showing all {retreats.length} retreats
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="sanghos" className="animate-fade-up">
                {activeTab === "sanghos" && (
                  <div className="mb-2 flex justify-center">
                    <div className="inline-flex items-center bg-muted/60 rounded-full px-3 py-1 text-sm text-muted-foreground">
                      <Info className="w-3.5 h-3.5 mr-1" />
                      Showing {sanghoRetreats.length} retreats organized by Sanghos
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="thirdparty" className="animate-fade-up">
                {activeTab === "thirdparty" && (
                  <div className="mb-2 flex justify-center">
                    <div className="inline-flex items-center bg-muted/60 rounded-full px-3 py-1 text-sm text-muted-foreground">
                      <Info className="w-3.5 h-3.5 mr-1" />
                      Showing {thirdPartyRetreats.length} partner retreats
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search retreats..."
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
            <div className="text-center py-16 bg-muted/20 rounded-lg">
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
