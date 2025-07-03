
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import ExpandableRetreatCards from "@/components/about/ExpandableRetreatCards";
import JoinCTA from "@/components/about/JoinCTA";
import CommunitySection from "@/components/about/CommunitySection";

const About = () => {
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
        <title>About Us | Sanghos</title>
        <meta name="description" content="Learn about Sanghos - our story, mission, values, and the team behind our mindfulness and wellness retreats." />
      </Helmet>

      <Header />

      <main className="bg-white overflow-x-hidden">
        <AboutHero isLoaded={isLoaded} />
        <AboutMission isLoaded={isLoaded} />
        <ExpandableRetreatCards isLoaded={isLoaded} />
        <JoinCTA isLoaded={isLoaded} />
        <CommunitySection isLoaded={isLoaded} />
      </main>

      <Footer />
    </>
  );
};

export default About;
