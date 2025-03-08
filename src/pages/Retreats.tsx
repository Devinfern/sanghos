
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetreatCard from "@/components/RetreatCard";
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

// Extract unique categories from retreats
const allCategories = Array.from(
  new Set(retreats.flatMap((retreat) => retreat.category))
).sort();

const Retreats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Filter retreats based on search query and selected category
  const filteredRetreats = retreats.filter(retreat => {
    const matchesSearch = searchQuery === "" || 
      retreat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retreat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retreat.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      retreat.category.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

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

          {/* Search and Filter */}
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
                onValueChange={(value) => setSelectedCategory(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {allCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredRetreats.length} {filteredRetreats.length === 1 ? 'retreat' : 'retreats'} found
            </p>
          </div>

          {/* Retreats Grid */}
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
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/20 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No retreats found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Retreats;
