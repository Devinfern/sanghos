
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";

interface AboutHeroProps {
  isLoaded: boolean;
}

const AboutHero = ({ isLoaded }: AboutHeroProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 md:py-32 bg-brand-subtle/10 relative">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-brand-dark leading-tight">Discover Local Wellness Retreats & Experiences</h1>
            
            <ul className="space-y-4 mb-8 text-lg">
              <li className="flex items-start">
                <span className="mr-2 text-brand-primary">•</span>
                <span>Curated retreats & more</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-brand-primary">•</span>
                <span>Services screened by experienced instructors</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-brand-primary">•</span>
                <span>Filter by retreat type, price, location, and more</span>
              </li>
            </ul>
            
            <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white text-lg px-8 py-6 rounded-full">
              Explore Our Retreats
            </Button>
          </motion.div>
          
          <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="relative rounded-3xl overflow-hidden">
            <OptimizedImage src="/lovable-uploads/60c5a966-4e10-4c09-af70-bfafe90c0630.png" alt="Peaceful retreat space" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
