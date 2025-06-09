
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

const Community = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock data for the components
  const currentEvents = [
    {
      id: "1",
      title: "Morning Meditation",
      date: { day: "15", month: "JUN" },
      time: "9:00 AM",
      location: "Online"
    },
    {
      id: "2", 
      title: "Yoga Flow Session",
      date: { day: "18", month: "JUN" },
      time: "6:00 PM",
      location: "Central Park"
    }
  ];

  const trendingPosts = [
    {
      id: "1",
      title: "Best meditation practices for beginners",
      author: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    },
    {
      id: "2",
      title: "How yoga changed my life",
      author: "Michael Chen", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    }
  ];

  const handleSectionChange = (section: string) => {
    setActiveTab(section);
  };

  const handleBack = () => {
    setActiveTab("dashboard");
  };

  useEffect(() => {
    // Check if user is logged in (mock for now)
    setIsLoggedIn(true);
  }, []);

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
