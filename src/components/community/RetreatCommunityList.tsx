
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            description: "A 5-day immersive experience to develop your meditation practice",
            startDate: "2025-05-10",
            endDate: "2025-05-15",
            location: "Peaceful Valley Resort, California",
            participants: 12,
            image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          },
          {
            id: "retreat-456",
            title: "Yoga and Mindfulness Weekend",
            description: "Reconnect with yourself through yoga, meditation, and nature",
            startDate: "2025-06-15",
            endDate: "2025-06-17",
            location: "Serenity Lodge, Colorado",
            participants: 8,
            image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          },
          {
            id: "retreat-789",
            title: "Deep Forest Wellness Immersion",
            description: "Rejuvenate your mind and body in the heart of the forest",
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
            description: "A transformative journey in the mountains to deepen your practice",
            startDate: "2024-11-05",
            endDate: "2024-11-10",
            location: "Alpine Center, Montana",
            participants: 18,
            image: "https://images.unsplash.com/photo-1519834255828-9e0c573b32db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          },
          {
            id: "retreat-654",
            title: "Seaside Wellness Retreat",
            description: "Heal and restore by the ocean with guided practices",
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
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded w-full"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-brand-subtle/10 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Retreat Communities</h2>
        <p className="text-muted-foreground">
          Connect with fellow retreat participants before and after your wellness experiences. 
          Share insights, coordinate travel plans, and continue your journey together.
        </p>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Upcoming Retreats</span>
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Past Retreats</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-6">
            {upcomingRetreats.map((retreat) => (
              <Card key={retreat.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-40 md:h-auto">
                    <img 
                      src={retreat.image} 
                      alt={retreat.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold mb-2">{retreat.title}</h3>
                        <Badge className="bg-brand-peach text-brand-dark">Upcoming</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{retreat.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                        <span>
                          {new Date(retreat.startDate).toLocaleDateString()} - {new Date(retreat.endDate).toLocaleDateString()}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                        <span>{retreat.location}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                        <span>{retreat.participants} participants</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button asChild>
                        <Link to={`/community/retreat/${retreat.id}`}>
                          Join Community <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          <div className="space-y-6">
            {pastRetreats.map((retreat) => (
              <Card key={retreat.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-40 md:h-auto">
                    <img 
                      src={retreat.image} 
                      alt={retreat.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold mb-2">{retreat.title}</h3>
                        <Badge variant="outline">Past</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{retreat.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                        <span>
                          {new Date(retreat.startDate).toLocaleDateString()} - {new Date(retreat.endDate).toLocaleDateString()}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                        <span>{retreat.location}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                        <span>{retreat.participants} participants</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" asChild>
                        <Link to={`/community/retreat/${retreat.id}`}>
                          View Community <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetreatCommunityList;
