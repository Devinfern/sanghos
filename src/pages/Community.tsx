
import { useEffect, useState } from "react";
import CommunityLayout from "@/components/layouts/CommunityLayout";
import CommunityDashboard from "@/components/community/CommunityDashboard";
import CommunityEvents from "@/components/community/CommunityEvents";
import CommunityMembers from "@/components/community/CommunityMembers";
import CommunityResources from "@/components/community/CommunityResources";
import CommunityManagement from "@/components/community/CommunityManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";

const Community = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    // Mock data for now since database tables don't exist
    const mockEvents = [
      { id: 1, title: "Morning Meditation", date: "2025-06-10", time: "8:00 AM" },
      { id: 2, title: "Yoga Flow Session", date: "2025-06-11", time: "6:00 PM" }
    ];

    const mockTrendingPosts = [
      { id: 1, title: "Best meditation practices", author: "Sarah" },
      { id: 2, title: "Retreat preparation tips", author: "Mike" }
    ];

    setCurrentEvents(mockEvents);
    setTrendingPosts(mockTrendingPosts);
    checkAuth();
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveTab(section);
  };

  const handleBack = () => {
    setActiveTab("dashboard");
  };

  const communityKeywords = [
    "wellness community",
    "mindfulness community",
    "retreat community",
    "spiritual community",
    "wellness discussion",
    "meditation community",
    "yoga community",
    "wellness events",
    "mindful living"
  ];

  return (
    <>
      <SEOHead
        title="Wellness Community - Connect & Share"
        description="Join our vibrant wellness community to connect with like-minded individuals, share experiences, participate in discussions, and discover upcoming retreat events."
        keywords={communityKeywords}
        canonicalUrl="https://sanghos.com/community"
      />

      <CommunityLayout title="Community Hub">
        <div className="container px-4 md:px-6 pt-4">
          <Breadcrumbs />
        </div>
        
        <div className="container px-4 md:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-dark mb-2">Community Hub</h1>
            <p className="text-muted-foreground">Connect, share, and grow with our wellness community</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="manage">Manage</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <CommunityDashboard 
                isLoggedIn={isLoggedIn}
                currentEvents={currentEvents}
                trendingPosts={trendingPosts}
                onSectionChange={handleSectionChange}
              />
            </TabsContent>
            
            <TabsContent value="events" className="space-y-6">
              <CommunityEvents events={currentEvents} />
            </TabsContent>
            
            <TabsContent value="members" className="space-y-6">
              <CommunityMembers trendingPosts={trendingPosts} />
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <CommunityResources />
            </TabsContent>
            
            <TabsContent value="manage" className="space-y-6">
              <CommunityManagement onBack={handleBack} />
            </TabsContent>
          </Tabs>
        </div>
      </CommunityLayout>
    </>
  );
};

export default Community;
