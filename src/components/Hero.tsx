
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OptimizedImage from "./OptimizedImage";

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
      {/* Background image with enhanced overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent z-10"></div>
        <OptimizedImage
          src="https://cdn.prod.website-files.com/5ff4fbd49286ac4facd6bbce/67cfba7e2604665f5076bdb7_HEROIMG.jpg"
          alt="Peaceful retreat setting"
          className="w-full h-full"
          aspectRatio="custom"
          objectFit="cover"
          priority={true}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-700 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 font-playfair leading-tight">
              Find your sanctuary
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
              Discover and book transformative daylong wellness retreats 
              in unique private spaces
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
              className="relative max-w-2xl mx-auto mb-12 glass-panel rounded-full overflow-hidden p-1.5 shadow-xl"
            >
              <div className="flex items-center">
                <Search className="absolute left-5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by practice type or location..."
                  className="pl-12 pr-36 py-7 bg-transparent border-none rounded-full text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0 text-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="absolute right-1.5 h-12 px-6 rounded-full text-base"
                >
                  Search
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base font-medium shadow-md"
                onClick={() => navigate("/retreats")}
              >
                <span>Browse All Retreats</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/90 hover:bg-white text-primary rounded-full px-8 py-6 text-base font-medium shadow-md border-transparent"
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
