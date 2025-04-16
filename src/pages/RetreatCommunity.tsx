
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import CommunityLayout from "@/components/layouts/CommunityLayout";
import RetreatDiscussions from "@/components/community/RetreatDiscussions";
import { supabase } from "@/integrations/supabase/client";

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
        
        // Simulate API delay
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
          { id: 1, name: "Alex Morgan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
          { id: 2, name: "Jamie Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
          { id: 3, name: "Taylor Kim", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
          { id: 4, name: "Jordan Smith", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
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
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="link" className="p-0" asChild>
              <Link to="/community">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Community
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="rounded-lg overflow-hidden w-full md:w-48 h-32 md:h-auto">
              <img 
                src={retreat.image} 
                alt={retreat.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{retreat.title} Community</h1>
              <p className="text-muted-foreground mb-4">
                {retreat.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>
                  {new Date(retreat.startDate).toLocaleDateString()} - {new Date(retreat.endDate).toLocaleDateString()}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                <span>{retreat.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs 
              defaultValue="discussions" 
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="discussions" className="space-y-6">
                <RetreatDiscussions 
                  retreatId={retreatId} 
                  retreatName={retreat.title}
                  isLoggedIn={isLoggedIn}
                />
              </TabsContent>
              
              <TabsContent value="resources">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Retreat Resources</h2>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="text-md font-medium">Packing List</h3>
                      <p className="text-sm text-muted-foreground">
                        Essential items to bring for your retreat experience
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Download PDF
                      </Button>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="text-md font-medium">Meditation Guide</h3>
                      <p className="text-sm text-muted-foreground">
                        Basic meditation techniques we'll practice during the retreat
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Guide
                      </Button>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="text-md font-medium">Location & Directions</h3>
                      <p className="text-sm text-muted-foreground">
                        How to find the retreat venue including maps and directions
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Open Map
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Participants</h3>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <img src={participant.avatar} alt={participant.name} />
                    </Avatar>
                    <span>{participant.name}</span>
                  </div>
                ))}
                <div className="text-center pt-2">
                  <Button variant="ghost" size="sm" className="text-brand-primary">
                    View all participants
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="justify-start w-full text-left">
                  Retreat Schedule
                </Button>
                <Button variant="ghost" className="justify-start w-full text-left">
                  Venue Information
                </Button>
                <Button variant="ghost" className="justify-start w-full text-left">
                  Host Contact Details
                </Button>
                <Button variant="ghost" className="justify-start w-full text-left">
                  Share Feedback
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default RetreatCommunity;
