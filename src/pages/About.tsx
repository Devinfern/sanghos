
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";

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

      <main className="pt-24 pb-16 bg-background">
        <AboutHero isLoaded={isLoaded} />
      </main>

      <Footer />
    </>
  );
};

export default About;
