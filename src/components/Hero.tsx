import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OptimizedImage from "./OptimizedImage";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { motion } from "framer-motion";
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
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark/50 z-10 w-full h-full"></div>
        <div className="absolute inset-0 bg-[url('https://cdn.prod.website-files.com/5ff4fbd49286ac4facd6bbce/67cfba7e2604665f5076bdb7_HEROIMG.jpg')] bg-cover bg-center bg-no-repeat transform scale-110 motion-safe:animate-subtle-zoom"></div>
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 py-24 sm:py-32">
        <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={{
        hidden: {
          opacity: 0
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
          }
        }
      }}>
          <motion.div variants={fadeIn} transition={{
          duration: 0.7
        }} className="mb-8">
            <AnimatedHero />
            
            <motion.p className="text-xl md:text-2xl text-white/95 mb-8 font-light leading-relaxed mt-4 max-w-2xl mx-auto" variants={fadeIn} transition={{
            duration: 0.7,
            delay: 0.2
          }}>
              Join daylong retreats with expert instructors in unique,
              intimate settings for transformative wellness experiences
            </motion.p>
          </motion.div>

          <motion.div variants={fadeIn} transition={{
          duration: 0.7,
          delay: 0.4
        }}>
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-10 glass-panel rounded-full overflow-hidden p-1.5 shadow-lg shadow-brand-primary/10 border border-white/20 backdrop-blur-md">
              <div className="flex items-center">
                <Search className="absolute left-5 h-5 w-5 text-brand-primary" />
                <Input type="text" placeholder="Yoga, meditation, breathwork..." className="pl-12 pr-36 py-7 bg-white/80 border-none rounded-full text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0" value={query} onChange={e => setQuery(e.target.value)} />
                <Button type="submit" size="lg" className="absolute right-1.5 h-12 px-6 rounded-full bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] font-medium">
                  <span>Search</span>
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-5">
              <Button size="lg" className="group bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] py-6 px-7 text-base rounded-xl" onClick={() => navigate("/retreats")}>
                Browse Retreats
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/90 hover:bg-white text-brand-dark border-transparent hover:border-brand-subtle/40 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] py-6 px-7 text-base rounded-xl" onClick={() => navigate("/instructors")}>Join our Community</Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default Hero;