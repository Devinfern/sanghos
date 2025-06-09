
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import Header from "@/components/Header";
import HomeHero from "@/components/home/HomeHero";
import HomePurpose from "@/components/home/HomePurpose";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeRetreatTypes from "@/components/home/HomeRetreatTypes";
import HomeCommunitySection from "@/components/home/HomeCommunitySection";
import EventsSection from "@/components/sections/EventsSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { createOrganizationSchema } from "@/components/seo/StructuredData";
import { useSitemapGeneration } from "@/components/seo/XMLSitemap";
import { useEvents } from "@/hooks/useEvents";

const Index = () => {
  const { events, isLoading } = useEvents();
  const [isVisible, setIsVisible] = useState(false);
  
  // Generate sitemap on app load
  useSitemapGeneration();

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

  const organizationSchema = createOrganizationSchema({
    description: "Transformative daylong wellness retreats hosted by expert instructors in unique private spaces. Mindfulness, yoga, meditation, breathwork and more.",
    contactPoint: {
      contactType: "customer service",
      email: "hello@sanghos.com"
    }
  });

  const homeKeywords = [
    "wellness retreats",
    "mindfulness retreats", 
    "private home retreats",
    "day retreats",
    "meditation retreats",
    "yoga retreats",
    "breathwork retreats",
    "spiritual wellness",
    "personal transformation",
    "wellness experiences"
  ];

  return (
    <>
      <SEOHead
        title="Wellness Retreats in Private Homes"
        description="Discover transformative daylong wellness retreats hosted by expert instructors in unique private spaces. Mindfulness, yoga, meditation, breathwork and more."
        keywords={homeKeywords}
        canonicalUrl="https://sanghos.com"
        structuredData={organizationSchema}
        ogType="website"
      />

      <Header />
      
      <main className="overflow-hidden">
        <HomeHero />
        
        <motion.div 
          className="overflow-hidden"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <EventsSection events={events} isLoading={isLoading} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <HomePurpose />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <HomeFeatures />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <HomeRetreatTypes />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <HomeCommunitySection />
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
