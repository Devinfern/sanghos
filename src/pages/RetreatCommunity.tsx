import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import CommunityLayout from "@/components/layouts/CommunityLayout";
import EnhancedRetreatHeader from "@/components/community/EnhancedRetreatHeader";
import EnhancedRetreatTabs from "@/components/community/EnhancedRetreatTabs";
import { supabase } from "@/integrations/supabase/client";
import NotificationSystem from "@/components/community/NotificationSystem";
import PrivateMessaging from "@/components/community/PrivateMessaging";
import BookingIntegration from "@/components/community/BookingIntegration";
import UserDashboardWidget from "@/components/community/UserDashboardWidget";

const RetreatCommunity = () => {
  const { retreatId } = useParams<{ retreatId: string }>();
  const location = useLocation();
  const [retreat, setRetreat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userJoined, setUserJoined] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("discussions");

  // Determine retreat phase from URL
  const getRetreatPhase = () => {
    if (location.pathname.includes('/pre')) return 'pre';
    if (location.pathname.includes('/post')) return 'post';
    return 'pre'; // Default to pre-retreat
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    
    const loadRetreatData = async () => {
      setIsLoading(true);
      try {
        // Enhanced mock data with more realistic retreat information
        const mockRetreats = {
          "retreat-123": {
            id: "retreat-123",
            title: "Inner Calm Meditation Retreat",
            description: "A transformative 5-day journey into mindfulness and self-discovery. Join us in the serene mountains for an immersive experience that will deepen your meditation practice and connect you with a supportive community of like-minded souls.",
            startDate: "2025-05-10",
            endDate: "2025-05-15",
            location: "Peaceful Valley Resort, California",
            image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            participants: 12,
            maxParticipants: 20
          },
          "retreat-456": {
            id: "retreat-456",
            title: "Yoga and Mindfulness Weekend",
            description: "Reconnect with yourself through yoga, meditation, and nature in this transformative weekend experience designed to restore balance and inner peace.",
            startDate: "2025-06-15",
            endDate: "2025-06-17",
            location: "Serenity Lodge, Colorado",
            image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            participants: 8,
            maxParticipants: 15
          },
          "retreat-789": {
            id: "retreat-789",
            title: "Deep Forest Wellness Immersion",
            description: "Rejuvenate your mind and body in the heart of the forest with guided practices, healing rituals, and profound connections with nature and community.",
            startDate: "2025-07-20",
            endDate: "2025-07-25",
            location: "Evergreen Sanctuary, Oregon",
            image: "https://images.unsplash.com/photo-1597495921292-28486fae4da4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            participants: 15,
            maxParticipants: 25
          }
        };
        
        const retreatData = mockRetreats[retreatId as keyof typeof mockRetreats];
        setRetreat(retreatData || null);
        
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

  const handleJoinCommunity = () => {
    setUserJoined(true);
    // In a real app, this would make an API call to join the community
    console.log("Joined retreat community:", retreatId);
  };

  const handleLeaveCommunity = () => {
    setUserJoined(false);
    // In a real app, this would make an API call to leave the community
    console.log("Left retreat community:", retreatId);
  };

  // Mock user data for dashboard
  const currentUser = {
    name: "You",
    avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
    joinedDate: "2024-01-15",
    role: "Participant"
  };

  const userStats = {
    postsCount: 3,
    commentsCount: 12,
    likesReceived: 18,
    retreatsJoined: 1,
    daysUntilRetreat: retreat ? Math.ceil((new Date(retreat.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : undefined
  };

  const mockRetreatMembers = [
    { id: "user-1", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: "user-2", name: "Michael Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { id: "user-3", name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" }
  ];

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
          </div>
        </div>
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout title={`${retreat.title} Community`}>
      <div className="container px-4 md:px-6 mx-auto py-[100px]">
        {/* Enhanced Header with Notifications */}
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <NotificationSystem retreatId={retreatId} userId="current-user" />
          </div>
          
          <EnhancedRetreatHeader 
            retreat={retreat}
            userJoined={userJoined}
            onJoinCommunity={handleJoinCommunity}
            onLeaveCommunity={handleLeaveCommunity}
          />
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - User Dashboard & Booking */}
          <div className="lg:col-span-1 space-y-6">
            <UserDashboardWidget user={currentUser} stats={userStats} />
            <BookingIntegration 
              retreat={retreat}
              userJoined={userJoined}
              onJoinRetreat={handleJoinCommunity}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <EnhancedRetreatTabs 
              retreatId={retreatId}
              retreatName={retreat.title}
              isLoggedIn={isLoggedIn}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              retreatPhase={getRetreatPhase()}
            />
          </div>
        </div>
      </div>

      {/* Private Messaging */}
      <PrivateMessaging 
        currentUserId="current-user"
        retreatMembers={mockRetreatMembers}
      />
    </CommunityLayout>
  );
};

export default RetreatCommunity;
