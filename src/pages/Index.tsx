
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedRetreats from "@/components/FeaturedRetreats";
import Footer from "@/components/Footer";
import { instructors } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SanghosStory from "@/components/SanghosStory";
import HowItWorks from "@/components/HowItWorks";
import JoinCommunity from "@/components/JoinCommunity";
import AIWellnessSection from "@/components/AIWellnessSection";
import { FeatureRetreatFinder } from "@/components/ui/feature-retreat-finder";

const Index = () => {
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
      <SanghosStory />
      <FeaturedRetreats />
      <FeatureRetreatFinder />
      <HowItWorks />
      <JoinCommunity />
      <Footer />
    </>
  );
};

export default Index;
