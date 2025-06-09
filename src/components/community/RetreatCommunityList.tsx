
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users } from "lucide-react";
import EnhancedRetreatCard from "./enhanced/EnhancedRetreatCard";

const RetreatCommunityList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingRetreats, setUpcomingRetreats] = useState<any[]>([]);
  const [pastRetreats, setPastRetreats] = useState<any[]>([]);

  useEffect(() => {
    const fetchRetreats = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be a Supabase query
        // For now, let's use mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for retreat communities
        const mockUpcoming = [
          {
            id: "retreat-123",
            title: "Inner Calm Meditation Retreat",
            description: "A 5-day immersive experience to develop your meditation practice and connect with like-minded souls",
            startDate: "2025-05-10",
            endDate: "2025-05-15",
            location: "Peaceful Valley Resort, California",
            participants: 12,
            image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          },
          {
            id: "retreat-456",
            title: "Yoga and Mindfulness Weekend",
            description: "Reconnect with yourself through yoga, meditation, and nature in this transformative weekend experience",
            startDate: "2025-06-15",
            endDate: "2025-06-17",
            location: "Serenity Lodge, Colorado",
            participants: 8,
            image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          },
          {
            id: "retreat-789",
            title: "Deep Forest Wellness Immersion",
            description: "Rejuvenate your mind and body in the heart of the forest with guided practices and healing rituals",
            startDate: "2025-07-20",
            endDate: "2025-07-25",
            location: "Evergreen Sanctuary, Oregon",
            participants: 15,
            image: "https://images.unsplash.com/photo-1597495921292-28486fae4da4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          }
        ];
        
        const mockPast = [
          {
            id: "retreat-321",
            title: "Mountain Meditation Experience",
            description: "A transformative journey in the mountains to deepen your practice and connect with nature",
            startDate: "2024-11-05",
            endDate: "2024-11-10",
            location: "Alpine Center, Montana",
            participants: 18,
            image: "https://images.unsplash.com/photo-1519834255828-9e0c573b32db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          },
          {
            id: "retreat-654",
            title: "Seaside Wellness Retreat",
            description: "Heal and restore by the ocean with guided practices, meditation, and wellness workshops",
            startDate: "2024-09-12",
            endDate: "2024-09-18",
            location: "Coastal Haven, Maine",
            participants: 14,
            image: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          }
        ];
        
        setUpcomingRetreats(mockUpcoming);
        setPastRetreats(mockPast);
      } catch (error) {
        console.error("Error fetching retreats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRetreats();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-brand-subtle/20">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-48 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-brand-subtle/20 via-brand-primary/10 to-brand-sand/20 p-6 rounded-xl mb-8 border border-brand-subtle/20">
        <h2 className="text-xl font-semibold mb-3 text-brand-dark">Retreat Communities</h2>
        <p className="text-muted-foreground leading-relaxed">
          Connect with fellow retreat participants before and after your wellness experiences. 
          Share insights, coordinate travel plans, and continue your journey together.
        </p>
      </div>
      
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="bg-brand-subtle/10 p-1 rounded-xl">
          <TabsTrigger value="upcoming" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2">
            <Calendar className="h-4 w-4" />
            <span>Upcoming Retreats</span>
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2">
            <Users className="h-4 w-4" />
            <span>Past Retreats</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingRetreats.map((retreat, index) => (
              <EnhancedRetreatCard
                key={retreat.id}
                retreat={retreat}
                index={index}
                onJoinCommunity={() => {
                  // Navigate to retreat community
                  console.log("Join community for:", retreat.id);
                }}
                onExploreDetails={() => {
                  // Navigate to retreat details
                  window.open(`/retreats/${retreat.id}`, '_blank');
                }}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {pastRetreats.map((retreat, index) => (
              <EnhancedRetreatCard
                key={retreat.id}
                retreat={retreat}
                index={index}
                onJoinCommunity={() => {
                  // Navigate to retreat community
                  console.log("View community for:", retreat.id);
                }}
                onExploreDetails={() => {
                  // Navigate to retreat details
                  window.open(`/retreats/${retreat.id}`, '_blank');
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetreatCommunityList;
