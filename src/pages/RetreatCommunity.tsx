
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommunityLayout from "@/components/layouts/CommunityLayout";
import RetreatHeader from "@/components/community/RetreatHeader";
import RetreatTabs from "@/components/community/RetreatTabs";
import RetreatParticipants from "@/components/community/RetreatParticipants";
import RetreatQuickLinks from "@/components/community/RetreatQuickLinks";
import { supabase } from "@/integrations/supabase/client";

const RetreatCommunity = () => {
  const { retreatId } = useParams<{ retreatId: string }>();
  const [retreat, setRetreat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [participants, setParticipants] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("discussions");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    
    const loadRetreatData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch data from Supabase
        // For now we'll use minimal placeholder data
        setRetreat({
          id: retreatId,
          title: "Retreat",
          description: "Retreat description will appear here",
          startDate: "",
          endDate: "",
          location: "",
          image: ""
        });
        
        setParticipants([]);
        
        await checkLoginStatus();
      } catch (error) {
        console.error("Error loading retreat data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRetreatData();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkLoginStatus();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [retreatId]);

  if (isLoading) {
    return (
      <CommunityLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading retreat community...</span>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  if (!retreat) {
    return (
      <CommunityLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Retreat not found</h2>
            <p className="mb-6">The retreat you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/community">Back to Community</Link>
            </Button>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout title={`${retreat.title} Community`}>
      <div className="container px-4 md:px-6 mx-auto py-[100px]">
        <RetreatHeader retreat={retreat} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <RetreatTabs 
              retreatId={retreatId}
              retreatName={retreat.title}
              isLoggedIn={isLoggedIn}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          
          <div>
            <RetreatParticipants participants={participants} />
            <RetreatQuickLinks />
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default RetreatCommunity;
