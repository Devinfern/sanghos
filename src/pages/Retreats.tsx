
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import RetreatCard from "@/components/RetreatCard";
import { retreats } from "@/lib/data";

const Retreats = () => {
  const location = useLocation();
  const [filteredRetreats, setFilteredRetreats] = useState(retreats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parse search parameters
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";
    const categories = searchParams.getAll("category");

    // Filter retreats based on search parameters
    const filtered = retreats.filter((retreat) => {
      // Search query filter
      const matchesQuery =
        searchQuery === "" ||
        retreat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        retreat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        retreat.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        categories.length === 0 ||
        categories.some((category) =>
          retreat.category.includes(category)
        );

      return matchesQuery && matchesCategory;
    });

    setFilteredRetreats(filtered);
    
    // Simulate loading for smooth transitions
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Retreats | Sanghos</title>
        <meta
          name="description"
          content="Browse and book daylong wellness retreats in unique private spaces with expert instructors."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Retreats</h1>
            <p className="text-muted-foreground">
              Find the perfect daylong retreat to nourish your mind, body, and soul
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Search />
              </div>
            </div>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl overflow-hidden shadow-sm h-[400px] animate-pulse"
                    >
                      <div className="bg-muted h-48 w-full"></div>
                      <div className="p-5 space-y-4">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="flex justify-between">
                          <div className="h-5 bg-muted rounded w-1/3"></div>
                          <div className="h-5 bg-muted rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredRetreats.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredRetreats.map((retreat, index) => (
                    <RetreatCard key={retreat.id} retreat={retreat} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">No retreats found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Retreats;
