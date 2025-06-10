
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Loader2 } from "lucide-react";
import { retreats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchInsightLAEvents } from "@/lib/insightEvents";
import BackButton from "@/components/retreat-details/BackButton";
import RetreatHeroSection from "@/components/retreat-details/RetreatHeroSection";
import RetreatContentPanel from "@/components/retreat-details/RetreatContentPanel";
import { Link } from "react-router-dom";

const RetreatDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [retreat, setRetreat] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRetreatDetails = async () => {
      try {
        // Load retreats from Sanghos
        const sanghosRetreats = await retreats;
        
        // Load InsightLA events
        const insightLARetreats = await fetchInsightLAEvents().catch(err => {
          console.error("Failed to load InsightLA retreats:", err);
          return [];
        });
        
        // Combine all retreats
        const allRetreats = [...sanghosRetreats, ...insightLARetreats];
        
        // Find retreat with matching id
        const foundRetreat = allRetreats.find(r => r.id === id);
        
        if (foundRetreat) {
          setRetreat(foundRetreat);
          // Trigger animation after retreat is loaded
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching retreat details:", error);
        setIsLoading(false);
      }
    };
    
    fetchRetreatDetails();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-sage-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Loading Retreat Details</h2>
            <p className="text-muted-foreground">Please wait while we fetch the retreat information...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!retreat) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Retreat Not Found</h2>
            <Button asChild>
              <Link to="/retreats">View All Retreats</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{retreat.title} | Sanghos</title>
        <meta name="description" content={retreat.description} />
      </Helmet>

      <Header />

      <main className="pt-24 min-h-screen bg-white">
        <BackButton />

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <RetreatHeroSection retreat={retreat} isVisible={isVisible} />
          <RetreatContentPanel retreat={retreat} isVisible={isVisible} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RetreatDetails;
