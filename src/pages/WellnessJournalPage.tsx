
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WellnessJournal from "@/components/WellnessJournal";
import { Badge } from "@/components/ui/badge";

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
        <title>Wellness Journal & Local Events | Sanghos</title>
        <meta
          name="description"
          content="Express yourself through journaling and discover personalized local wellness events and retreats tailored to your unique needs."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sage-50/90 to-sage-100/95" />

        <div className="container mx-auto py-16 px-4 relative z-10 max-w-4xl">
          <div className="text-center mb-12 space-y-6">
            <Badge
              variant="outline"
              className="inline-flex items-center justify-center p-1.5 px-3 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium"
            >
              AI-Powered Wellness Recommendations
            </Badge>
            <h1 className="text-4xl md:text-5xl font-semibold text-sage-900 max-w-2xl mx-auto leading-tight">
              Your Personal Wellness Journey Starts Here
            </h1>
            <p className="text-lg text-sage-700 max-w-2xl mx-auto leading-relaxed">
              Share your thoughts and let our AI guide you to transformative local wellness experiences tailored just for you.
            </p>
          </div>

          <WellnessJournal />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default WellnessJournalPage;
