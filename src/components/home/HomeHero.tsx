import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles, Play, Star, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const HomeHero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/retreats?search=${encodeURIComponent(query)}`);
    }
  };

  // Animation variants
  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Cinematic Background with Overlays */}
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent z-10" />
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/lovable-uploads/eb5e3a10-e1d3-49a7-9bd6-f9cfd8a697fc.jpg')"
          }}
          animate={{ scale: isLoaded ? 1.05 : 1 }}
          transition={{ duration: 20, ease: "easeOut" }}
        />
        
        {/* Ambient Lighting Effects */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-radial from-brand-primary/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-radial from-brand-peach/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div 
        className="absolute top-32 right-32 text-white/20" 
        animate={floatingAnimation}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      
      <motion.div 
        className="absolute top-48 right-48 text-white/15" 
        animate={floatingAnimation}
        transition={{ ...floatingAnimation.transition, delay: 2 }}
      >
        <Star className="w-6 h-6" />
      </motion.div>

      <motion.div 
        className="absolute bottom-48 right-24 text-white/20" 
        animate={floatingAnimation}
        transition={{ ...floatingAnimation.transition, delay: 4 }}
      >
        <Leaf className="w-7 h-7" />
      </motion.div>

      {/* Main Content - Centered Layout */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex justify-center">
            
            {/* Centered Hero Content */}
            <motion.div 
              className="max-w-4xl text-center"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={slideInLeft}
            >
              {/* Elegant Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-12"
                variants={fadeInUp}
              >
                <Sparkles className="w-5 h-5 text-brand-peach" />
                <span className="text-base font-medium text-white/90 tracking-wide">
                  DISCOVER YOUR SANCTUARY
                </span>
              </motion.div>

              {/* Hero Title with Serif Accents */}
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] mb-12"
                variants={fadeInUp}
              >
                <span className="font-light">Wellness</span>
                <br />
                <span className="font-serif italic text-brand-peach">Experiences,</span>
                <br />
                <span className="font-bold">Tailored To You</span>
              </motion.h1>

              {/* Elegant Description */}
              <motion.p 
                className="text-2xl text-white/80 leading-relaxed mb-16 max-w-3xl mx-auto"
                variants={fadeInUp}
              >
                Immerse yourself in transformative daylong retreats with expert instructors in breathtaking, intimate settings.
              </motion.p>

              {/* Glassmorphism Search Bar */}
              <motion.form 
                onSubmit={handleSearch} 
                className="relative mb-16 max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl backdrop-blur-xl border border-white/30" />
                  <div className="relative flex items-center p-3">
                    <Search className="absolute left-8 h-6 w-6 text-white/70" />
                    <Input 
                      type="text" 
                      placeholder="Yoga, meditation, breathwork..." 
                      className="pl-16 pr-40 py-8 bg-transparent border-none text-white placeholder:text-white/60 focus:outline-none focus:ring-0 text-xl"
                      value={query} 
                      onChange={e => setQuery(e.target.value)} 
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="absolute right-3 px-10 py-6 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Search
                    </Button>
                  </div>
                </div>
              </motion.form>

              {/* Floating CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-8 justify-center mb-20"
                variants={fadeInUp}
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:via-brand-primary/90 hover:to-brand-primary text-white px-12 py-8 rounded-2xl shadow-2xl hover:shadow-brand-primary/25 transition-all duration-500 transform hover:scale-105"
                  onClick={() => navigate("/retreats")}
                >
                  <span className="text-xl font-semibold">Browse Retreats</span>
                  <ArrowRight className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white px-12 py-8 rounded-2xl backdrop-blur-md transition-all duration-500 transform hover:scale-105"
                  onClick={() => navigate("/community-teaser")}
                >
                  <Play className="mr-4 h-6 w-6" />
                  <span className="text-xl font-medium">Join Community</span>
                </Button>
              </motion.div>

              {/* Floating Stats */}
              <motion.div 
                className="flex items-center justify-center gap-16 pt-12 border-t border-white/20"
                variants={fadeInUp}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-lg text-white/60">Retreats</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-lg text-white/60">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">10k+</div>
                  <div className="text-lg text-white/60">Happy Guests</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>


      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      
    </section>
  );
};
export default HomeHero;