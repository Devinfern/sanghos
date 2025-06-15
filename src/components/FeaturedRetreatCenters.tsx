
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
import { featuredCenters } from "@/lib/wellnessCentersData";
import RetreatCenterCard from "./RetreatCenterCard";

const FeaturedRetreatCenters = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-brand-dark">
                        Featured Wellness Studios
                    </h2>
                    <Button variant="link" asChild className="text-brand-primary group hidden md:inline-flex">
                        <Link to="/wellness-studios">
                           View All
                           <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {featuredCenters.map((center, index) => (
                            <CarouselItem key={center.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <RetreatCenterCard center={center} index={index} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="text-center mt-8 md:hidden">
                  <Button asChild variant="outline" size="lg">
                    <Link to="/wellness-studios">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedRetreatCenters;
