
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommunityLayout from "@/components/layouts/CommunityLayout";
import RetreatHeader from "@/components/community/RetreatHeader";
import RetreatTabs from "@/components/community/RetreatTabs";
import RetreatParticipants from "@/components/community/RetreatParticipants";
import RetreatQuickLinks from "@/components/community/RetreatQuickLinks";

const RetreatCommunity = () => {
  const { retreatId } = useParams<{ retreatId: string }>();
  const [retreat, setRetreat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [participants, setParticipants] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("discussions");

  useEffect(() => {
    const checkLoginStatus = () => {
      const userString = localStorage.getItem("sanghos_user");
      setIsLoggedIn(userString !== null);
    };
    
    const loadRetreatData = async () => {
      setIsLoading(true);
      try {
        // For demo purposes, we'll just simulate fetching retreat data
        // In a real app, this would be a Supabase query
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock data for demo - in a real app, this would come from Supabase
        setRetreat({
          id: retreatId,
          title: "Inner Calm Meditation Retreat",
          description: "A 5-day immersive experience to develop your meditation practice",
          startDate: "2025-05-10",
          endDate: "2025-05-15",
          location: "Peaceful Valley Resort, California",
          image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        });

        // Mock participants data
        setParticipants([
          {
            id: 1,
            name: "Alex Morgan",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          },
          {
            id: 2,
            name: "Jamie Lee",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          },
          {
            id: 3,
            name: "Taylor Kim",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          },
          {
            id: 4,
            name: "Jordan Smith",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          }
        ]);
        
        checkLoginStatus();
      } catch (error) {
        console.error("Error loading retreat data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRetreatData();
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
