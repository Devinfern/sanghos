
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
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent z-10"></div>
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
      <div className="container relative z-20 px-4 md:px-6 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto">
          <div className={`transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-center">
              Find your wellness <br /> sanctuary
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 text-center">
              Join intimate retreats in unique, private spaces
            </p>
          </div>

          <div className={`transition-all duration-700 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-16">
              <div className="glass-panel bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg">
                <div className="flex items-center p-1.5">
                  <Search className="absolute left-5 h-5 w-5 text-white/70" />
                  <Input 
                    type="text" 
                    placeholder="Search by practice, location, or instructor..." 
                    className="pl-12 pr-28 py-7 bg-transparent border-none rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-0 text-lg" 
                    value={query} 
                    onChange={e => setQuery(e.target.value)} 
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="absolute right-1.5 rounded-lg hover:bg-white/20"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-3xl mx-auto">
              {["Yoga", "Meditation", "Breathwork", "Sound Healing", "Forest Therapy", "Mindfulness"].map((practice) => (
                <Button 
                  key={practice} 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all"
                  onClick={() => navigate(`/retreats?category=${practice}`)}
                >
                  {practice}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
