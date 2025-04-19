import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WellnessJournal from "@/components/WellnessJournal";
const WellnessJournalPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return <>
      <Helmet>
        <title>Wellness Journal & Local Events | Sanghos</title>
        <meta name="description" content="Express yourself through journaling and discover personalized local wellness events and retreats tailored to your unique needs." />
      </Helmet>

      <Header />

      <main className="min-h-screen relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        backgroundAttachment: "fixed"
      }} />
        <div className="absolute inset-0 bg-gradient-to-b from-sage-50/85 to-sage-100/95" />
        
        <div className="container mx-auto py-12 px-4 relative z-10 max-w-4xl my-[80px]">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-sage-900 mb-4">Your AI Retreat Finder</h1>
            <p className="text-sage-700 max-w-2xl mx-auto">Express yourself through journaling and let our AI recommend personalized retreat experiences and local wellness events that match your needs.</p>
          </div>
          
          <WellnessJournal />
        </div>
      </main>
      
      <Footer />
    </>;
};
export default WellnessJournalPage;