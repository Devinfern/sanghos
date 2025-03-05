
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/retreats?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Peaceful retreat setting"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className={`transition-all duration-700 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Wellness Retreats in Private Homes
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Join daylong retreats with expert instructors in unique,
              intimate settings
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <form
              onSubmit={handleSearch}
              className="relative max-w-md mx-auto mb-10 glass-panel rounded-full overflow-hidden p-1"
            >
              <div className="flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Yoga, meditation, breathwork..."
                  className="pl-12 pr-24 py-6 bg-transparent border-none rounded-full text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 h-10 px-5 rounded-full"
                >
                  Search
                </Button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="group"
                onClick={() => navigate("/retreats")}
              >
                Browse Retreats
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white hover:bg-white/90"
                onClick={() => navigate("/instructors")}
              >
                Meet Our Instructors
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
