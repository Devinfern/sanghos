import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WellnessJournal from "@/components/WellnessJournal";
import { cn } from "@/lib/utils";
import { Sparkles, Feather, Heart, Leaf, MapPin } from "lucide-react";

const WellnessJournalPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Retreat Finder | Sanghos</title>
        <meta 
          name="description" 
          content="Discover personalized wellness retreats tailored to your unique needs using our AI-powered retreat matching technology."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-white to-brand-subtle/10">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div 
            className={cn(
              "mb-12 text-center transition-opacity duration-700",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-brand-primary">AI Retreat Finder</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Unlock your perfect wellness journey with our AI-powered retreat matching technology. Share your thoughts and let our intelligent system guide you to transformative experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center gap-8 mt-8 mb-12"
            >
              <div className="flex items-center text-brand-primary/80">
                <Feather className="h-5 w-5 mr-2" />
                <span className="text-sm">Express</span>
              </div>
              <div className="flex items-center text-brand-primary/80">
                <Sparkles className="h-5 w-5 mr-2" />
                <span className="text-sm">Analyze</span>
              </div>
              <div className="flex items-center text-brand-primary/80">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-sm">Discover</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 h-20 w-20 text-brand-primary/10 opacity-70">
              <Leaf className="h-full w-full" />
            </div>
            
            <div className="absolute -bottom-8 -right-8 h-24 w-24 text-brand-primary/10 opacity-70 rotate-45">
              <Feather className="h-full w-full" />
            </div>
            
            <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-brand-subtle/20">
              <WellnessJournal />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-24 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary">Benefits of Journaling</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-brand-subtle/20 backdrop-blur-sm">
                <div className="bg-brand-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-brand-primary h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Enhanced Self-Awareness</h3>
                <p className="text-muted-foreground">Regular journaling helps you identify patterns in your emotions and behaviors.</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-brand-subtle/20 backdrop-blur-sm">
                <div className="bg-brand-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-brand-primary h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Stress Reduction</h3>
                <p className="text-muted-foreground">Writing down your thoughts can help reduce anxiety and mental clutter.</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-brand-subtle/20 backdrop-blur-sm">
                <div className="bg-brand-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="text-brand-primary h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Personal Growth</h3>
                <p className="text-muted-foreground">Document your journey and celebrate your progress toward wellness goals.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default WellnessJournalPage;
