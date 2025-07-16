import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSharedRetreatData } from "@/hooks/useSharedRetreatData";
import RetreatCard from "./RetreatCard";

const FeaturedRetreats = () => {
  const { allRetreats, isLoading } = useSharedRetreatData();
  
  // Get featured retreats or fallback to first 8 retreats
  const featuredRetreats = allRetreats.filter(retreat => retreat.featured).slice(0, 8);
  const displayRetreats = featuredRetreats.length > 0 ? featuredRetreats : allRetreats.slice(0, 8);

  if (isLoading) {
    return (
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-2">
              Featured Retreats
            </h2>
            <p className="text-slate-600">
              Discover curated wellness retreats and transformative experiences
            </p>
          </div>
          <Button variant="link" asChild className="text-brand-primary group hidden md:inline-flex">
            <Link to="/retreats">
              View All Retreats
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {displayRetreats.map((retreat, index) => (
                <CarouselItem key={retreat.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <RetreatCard 
                    retreat={retreat} 
                    index={index}
                    viewMode="grid"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
        
        <div className="text-center mt-8 md:hidden">
          <Button asChild variant="outline" size="lg">
            <Link to="/retreats">
              View All Retreats
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRetreats;