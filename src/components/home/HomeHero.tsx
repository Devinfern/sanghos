import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const HomeHero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/retreats?search=${encodeURIComponent(query)}`);
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  return <section className="relative pt-24 pb-32 bg-[#F3F1ED] overflow-hidden">
      {/* Background subtle shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute h-96 w-96 rounded-full bg-brand-primary/5 -top-20 -left-20 blur-3xl"></div>
        <div className="absolute h-96 w-96 rounded-full bg-brand-peach/5 -bottom-20 -right-20 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div className="max-w-3xl" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={fadeUp}>
            <span className="text-sm font-medium text-brand-primary uppercase tracking-wider mb-3 block">DISCOVER YOUR NEXT RETREAT</span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-dark leading-[1.1] mb-6">Find The Wellness Experience You Didn't Know You Needed.</h1>
            
            <ul className="space-y-4 mb-8 text-lg">
              <li className="flex items-start">
                <span className="mr-2 text-brand-primary">•</span>
                <span>Day-long retreats & more</span>
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
            
            <form onSubmit={handleSearch} className="relative max-w-xl mb-8">
              <div className="flex items-center">
                <Search className="absolute left-5 h-5 w-5 text-brand-primary" />
                <Input type="text" placeholder="Yoga, meditation, breathwork..." className="pl-12 pr-28 py-7 bg-white shadow-md border-none rounded-full text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0" value={query} onChange={e => setQuery(e.target.value)} />
                <Button type="submit" size="lg" className="absolute right-1.5 h-12 px-6 rounded-full bg-brand-primary hover:bg-brand-primary/90 font-medium">
                  <span>Search</span>
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 rounded-full group" onClick={() => navigate("/retreats")}>
                Browse Retreats
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-brand-primary/50 text-brand-primary hover:bg-brand-primary/5 rounded-full" onClick={() => navigate("/community-teaser")}>
                Join our Community
              </Button>
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div className="relative aspect-[4/3] rounded-2xl overflow-hidden" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={fadeUp}>
            <img alt="Peaceful meditation space with natural light" className="w-full h-full object-cover" src="/lovable-uploads/440cf0e4-ee06-4235-9ec4-b3ecdefd7ee9.jpg" />
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HomeHero;