
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { retreats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import RetreatCard from "./RetreatCard";

const FeaturedRetreats = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    // Get the current element
    const element = document.getElementById("featured-retreats");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const featuredRetreats = retreats.filter((retreat) => retreat.featured);

  return (
    <section 
      id="featured-retreats"
      className="py-16 md:py-24 bg-sand-50"
    >
      <div className="container px-4 md:px-6">
        <div 
          className={`mb-12 text-center max-w-2xl mx-auto transition-opacity duration-700 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Retreats
          </h2>
          <p className="text-muted-foreground">
            Discover our handpicked selection of transformative daylong retreats
            in unique private spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredRetreats.map((retreat, index) => (
            <RetreatCard 
              key={retreat.id} 
              retreat={retreat} 
              index={index}
              comingSoon={true}
            />
          ))}
        </div>

        <div 
          className={`mt-12 text-center transition-opacity duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button asChild size="lg">
            <Link to="/retreats" className="group">
              View All Retreats
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRetreats;
