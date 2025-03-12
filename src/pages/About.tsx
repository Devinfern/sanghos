
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import refactored components
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import RetreatTypes from "@/components/about/RetreatTypes";
import CompanyValues from "@/components/about/CompanyValues";
import CompanyTimeline from "@/components/about/CompanyTimeline";
import TeamSection from "@/components/about/TeamSection";
import JoinCTA from "@/components/about/JoinCTA";

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
        <meta
          name="description"
          content="Learn about Sanghos - our story, mission, values, and the team behind our mindfulness and wellness retreats."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <AboutHero isLoaded={isLoaded} />

        {/* Mission Section */}
        <AboutMission isLoaded={isLoaded} />

        {/* Retreat Types Section */}
        <RetreatTypes isLoaded={isLoaded} />

        {/* Our Values Section */}
        <CompanyValues isLoaded={isLoaded} />

        {/* Timeline Section */}
        <CompanyTimeline isLoaded={isLoaded} />

        {/* Team Section */}
        <TeamSection isLoaded={isLoaded} />

        {/* Join Us CTA Section */}
        <JoinCTA isLoaded={isLoaded} />
      </main>

      <Footer />
    </>
  );
};

export default About;
