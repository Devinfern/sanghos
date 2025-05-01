
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WellnessJournal from "@/components/WellnessJournal";
import { Badge } from "@/components/ui/badge";
import OfferingCard from "@/components/OfferingCard";
import { Calendar, User, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OFFERINGS = [
  {
    icon: <Calendar className="h-6 w-6 text-brand-primary" />,
    title: "Daylong Wellness Retreats",
    description:
      "Enjoy intimate retreats led by expert instructors in private, beautiful spaces near you.",
    color: "from-brand-primary/15 to-white",
  },
  {
    icon: <User className="h-6 w-6 text-brand-peach" />,
    title: "Personalized Recommendations",
    description:
      "Get AI-powered suggestions for events and retreats based on your wellness goals and location.",
    color: "from-brand-peach/15 to-white",
  },
  {
    icon: <Star className="h-6 w-6 text-brand-rose" />,
    title: "Expert Instructors",
    description:
      "Practice with passionate, vetted wellness professionals who bring authenticity and care.",
    color: "from-brand-rose/15 to-white",
  },
];

const WellnessJournalPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

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
        <title>Wellness Journal & Local Events | Sanghos</title>
        <meta
          name="description"
          content="Express yourself through journaling and discover personalized local wellness events and retreats tailored to your unique needs."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-28 pb-20 relative bg-gradient-to-br from-sand-50/80 via-sage-50/60 to-brand-subtle/10">
        {/* Elegant background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5 pointer-events-none"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-sage-50/95 to-sage-100/90"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-peach/5 rounded-full blur-3xl"></div>
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col md:flex-row gap-10 lg:gap-16 items-stretch"
          >
            {/* Left: Hero & Offerings */}
            <motion.section 
              className="w-full md:w-1/2 flex flex-col gap-10 justify-center"
              variants={itemVariants}
            >
              <div className="rounded-3xl bg-gradient-to-br from-white to-sage-50/80 shadow-xl shadow-sage-200/20 px-7 py-10 md:px-12 md:py-14 mb-6 border border-sage-100/40">
                <Badge
                  variant="outline"
                  className="mb-5 bg-brand-primary/10 text-brand-primary font-medium px-4 py-1.5 text-base border-brand-primary/20"
                >
                  AI-Powered Wellness Journey
                </Badge>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-banana text-sage-900 mb-4 leading-tight">
                  Your Wellness Insight <span className="text-brand-primary">Starts Here</span>
                </h1>
                
                <p className="text-lg md:text-xl text-sage-700 mb-8 leading-relaxed max-w-xl font-light">
                  Journal your thoughts and wellness goals—receive personalized local event & retreat recommendations tailored just for you, powered by AI.
                </p>
                
                <Button 
                  className="mb-10 group px-6 py-6 bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-base rounded-xl" 
                  onClick={() => navigate("/retreats")}
                >
                  Explore All Retreats
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {OFFERINGS.map((offering, i) => (
                    <OfferingCard key={i} {...offering} />
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Right: Journal + Dock */}
            <motion.section 
              className="w-full md:w-1/2 flex flex-col justify-center"
              variants={itemVariants}
            >
              <div className="rounded-3xl bg-white/80 backdrop-blur-sm border border-sage-100/40 shadow-xl shadow-sage-200/10 p-6 md:p-8">
                <WellnessJournal />
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default WellnessJournalPage;
