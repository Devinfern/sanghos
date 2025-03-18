import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
interface AboutHeroProps {
  isLoaded: boolean;
}
const AboutHero = ({
  isLoaded
}: AboutHeroProps) => {
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  return <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-brand-subtle/20 to-white overflow-hidden relative md:py-[150px]">
      {/* Decorative elements */}
      <div className="absolute w-72 h-72 bg-brand-sky rounded-full blur-3xl opacity-50 -top-20 -left-20 z-0"></div>
      <div className="absolute w-96 h-96 bg-brand-peach/30 rounded-full blur-3xl opacity-40 -bottom-40 -right-20 z-0"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content - Text and CTA */}
          <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-dark leading-tight">
              Bringing Mindfulness to Everyone
            </h1>
            
            <p className="text-xl md:text-2xl mb-6 text-brand-slate">
              At Sanghos, we believe in the power of mindfulness to transform lives.
            </p>
            
            <p className="text-lg mb-8 text-muted-foreground">
              We're a community of practitioners, teachers, and seekers dedicated to making wellness 
              and mindfulness retreats accessible to all. Our journey started with a simple idea: 
              everyone deserves the opportunity to find inner peace and connection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white group" asChild>
                <a href="/retreats">
                  Explore Our Retreats
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button size="lg" variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 group" asChild>
                <a href="/join-now">
                  Join Our Community
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </motion.div>
          
          {/* Right content - Image */}
          <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-brand-subtle/30 rounded-2xl transform rotate-3 z-0"></div>
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-brand-subtle/30 z-10">
                <OptimizedImage src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3" alt="Mindfulness community gathering" className="w-full h-full" objectFit="cover" aspectRatio="custom" />
              </div>
              
              {/* Stats overlay */}
              <div className="absolute -bottom-6 right-6 bg-white rounded-lg shadow-lg px-6 py-4 z-20 border border-brand-subtle/20">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand-primary">50+</p>
                    <p className="text-sm text-brand-slate">Retreats</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand-primary">1000+</p>
                    <p className="text-sm text-brand-slate">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand-primary">20+</p>
                    <p className="text-sm text-brand-slate">Locations</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default AboutHero;