
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FeatureRetreatFinder } from "@/components/ui/feature-retreat-finder";

const WellnessJournalPage = () => {
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
        <title>AI Wellness Journal | Sanghos</title>
        <meta 
          name="description" 
          content="Express yourself through journaling and discover personalized wellness retreats and local events tailored to your unique needs." 
        />
      </Helmet>

      <Header />

      <main className="min-h-screen relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundAttachment: "fixed"
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-sage-50/85 to-sage-100/95" />
        
        <div className="relative z-10">
          <FeatureRetreatFinder />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default WellnessJournalPage;
