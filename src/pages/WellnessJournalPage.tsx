
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WellnessJournal from "@/components/WellnessJournal";
import { motion } from "framer-motion";

const WellnessJournalPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        when: "beforeChildren"
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <>
      <Helmet>
        <title>AI Retreat Finder | Sanghos</title>
        <meta
          name="description"
          content="Express yourself through journaling and discover personalized retreats and events tailored to your wellness needs."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-24 pb-16 relative bg-gradient-to-br from-white to-sage-50/60 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86')] bg-cover bg-center opacity-[0.03] pointer-events-none"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 to-white/90"></div>
          
          {/* Subtle decorative elements */}
          <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-brand-primary/5 blur-3xl"></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-brand-peach/5 blur-3xl"></div>
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-12 text-center">
              <h1 className="text-3xl md:text-4xl font-semibold text-sage-900 mb-3">
                AI Retreat Finder
              </h1>
              <p className="text-sage-700 max-w-2xl mx-auto">
                Express yourself through journaling and discover personalized retreat recommendations tailored to your wellness needs.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-16">
              <WellnessJournal />
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default WellnessJournalPage;
