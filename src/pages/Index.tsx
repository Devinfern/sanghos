
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SanghosStory from "@/components/SanghosStory";
import HomeCategories from "@/components/HomeCategories";
import { FeatureRetreatFinder } from "@/components/ui/feature-retreat-finder";
import HowItWorks from "@/components/HowItWorks";
import JoinCommunity from "@/components/JoinCommunity";
import Footer from "@/components/Footer";
import EventsSection from "@/components/sections/EventsSection";
import { useEvents } from "@/hooks/useEvents";
import { motion } from "framer-motion";
import WellnessCommunityTeaser from "@/components/WellnessCommunityTeaser";

const Index = () => {
  const { events, isLoading } = useEvents();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay before showing content for smoother transitions
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <Helmet>
        <title>Sanghos | Wellness Retreats in Private Homes</title>
        <meta
          name="description"
          content="Discover transformative daylong wellness retreats hosted by expert instructors in unique private spaces."
        />
      </Helmet>

      <Header />
      <Hero />

      <motion.div 
        className="overflow-hidden"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SanghosStory />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <EventsSection events={events} isLoading={isLoading} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <HomeCategories />
        </motion.div>

        <motion.div variants={itemVariants}>
          <WellnessCommunityTeaser />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FeatureRetreatFinder />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <HowItWorks />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <JoinCommunity />
        </motion.div>
      </motion.div>
      
      <Footer />
    </>
  );
};

export default Index;
