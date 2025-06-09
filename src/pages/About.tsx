
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import CompanyValues from "@/components/about/CompanyValues";
import TeamSection from "@/components/about/TeamSection";
import CompanyTimeline from "@/components/about/CompanyTimeline";
import JoinCTA from "@/components/about/JoinCTA";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { createOrganizationSchema } from "@/components/seo/StructuredData";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const organizationSchema = createOrganizationSchema({
    description: "Learn about Sanghos mission to transform wellness through intimate, transformative retreat experiences in private homes with expert instructors."
  });

  const aboutKeywords = [
    "about sanghos",
    "wellness company",
    "retreat company",
    "wellness mission", 
    "mindfulness company",
    "retreat platform",
    "wellness community",
    "transformation",
    "spiritual wellness"
  ];

  return (
    <>
      <SEOHead
        title="About Us - Our Mission & Story"
        description="Learn about Sanghos mission to transform wellness through intimate, transformative retreat experiences. Discover our story, values, and the team behind your wellness journey."
        keywords={aboutKeywords}
        canonicalUrl="https://sanghos.com/about"
        structuredData={organizationSchema}
      />

      <Header />
      
      <main className="pt-16">
        <div className="container px-4 md:px-6 pt-4">
          <Breadcrumbs />
        </div>
        
        <AboutHero isLoaded={isLoaded} />
        <AboutMission isLoaded={isLoaded} />
        <CompanyValues isLoaded={isLoaded} />
        <TeamSection isLoaded={isLoaded} />
        <CompanyTimeline isLoaded={isLoaded} />
        <JoinCTA isLoaded={isLoaded} />
      </main>
      
      <Footer />
    </>
  );
};

export default About;
