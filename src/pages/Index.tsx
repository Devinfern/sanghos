
import React from "react";
import { Helmet } from "react-helmet";
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

const Index = () => {
  const { events, isLoading } = useEvents();

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
      <EventsSection events={events} isLoading={isLoading} />
      <HomeCategories />
      <FeatureRetreatFinder />
      <HowItWorks />
      <JoinCommunity />
      <Footer />
    </>
  );
};

export default Index;
