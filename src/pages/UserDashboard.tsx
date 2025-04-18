
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, User, MessageCircle, BookOpen, Clock, ArrowRight, Plus, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { retreats, formatDate } from "@/lib/data";
import { toast } from "sonner";
import EventURLInput from "@/components/admin/EventURLInput";
import { useAdminStatus } from "@/hooks/useAdminStatus";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [upcomingRetreats, setUpcomingRetreats] = useState<any[]>([]);
  const { isAdmin, isLoading: isAdminLoading } = useAdminStatus();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*, full_name, username')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
          setUserData({
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email,
            joinDate: new Date().toISOString(),
            membershipStatus: "active",
            completedRetreats: 0,
            points: 0
          });
        } else {
          setUserData({
            name: profile.full_name || profile.username || session.user.email?.split('@')[0] || 'User',
            email: session.user.email,
            joinDate: profile.created_at || new Date().toISOString(),
            membershipStatus: "active",
            completedRetreats: 0,
            points: 0,
            avatar: profile.avatar_url
          });
        }

        const today = new Date();
        const upcoming = retreats
          .filter(retreat => new Date(retreat.date) > today)
          .slice(0, 3);
        
        setUpcomingRetreats(upcoming);
      } catch (err) {
        console.error("Error in dashboard:", err);
        toast.error("Something went wrong loading your dashboard");
        
        setUserData({
          name: "User",
          email: "user@example.com",
          joinDate: new Date().toISOString(),
          membershipStatus: "active",
          completedRetreats: 0,
          points: 0
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (isLoading || isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Unable to load user data</p>
          <Button onClick={() => navigate("/login")}>Back to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Dashboard | Sanghos</title>
        <meta name="description" content="Manage your Sanghos account, view upcoming retreats, and track your wellness journey." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              {userData.avatar && (
                <img 
                  src={userData.avatar} 
                  alt={`${userData.name}'s avatar`} 
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}</h1>
                <p className="text-muted-foreground">Track your wellness journey and upcoming experiences</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Badge variant="outline" className="text-sm">
                Member since {formatDate(userData.joinDate)}
              </Badge>
              <Badge variant="secondary" className="bg-sage-100 text-sage-800">
                {userData.points} Points
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="retreats">My Retreats</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="admin" className="flex items-center">
                  <Shield className="mr-1 h-4 w-4" />
                  Admin
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-sage-500" />
                      Upcoming Retreats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{upcomingRetreats.length}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-sage-500" />
                      Completed Retreats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{userData.completedRetreats}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <MessageCircle className="mr-2 h-5 w-5 text-sage-500" />
                      Community Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">5</p>
                    <p className="text-sm text-muted-foreground">Active discussions</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Upcoming Retreats</CardTitle>
                  <CardDescription>
                    The next wellness experiences on your calendar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingRetreats.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingRetreats.map((retreat) => (
                        <div key={retreat.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={retreat.image} 
                              alt={retreat.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{retreat.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Calendar className="mr-1 h-4 w-4" />
                              <span>{formatDate(retreat.date)}</span>
                              <Clock className="ml-3 mr-1 h-4 w-4" />
                              <span>{retreat.time}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/retreat/${retreat.id}`}>
                              Details
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">You don't have any upcoming retreats</p>
                      <Button asChild>
                        <Link to="/retreats">Browse Retreats</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/retreats" className="flex items-center">
                      View all retreats
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Wellness Journey</CardTitle>
                  <CardDescription>
                    Track your progress and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Membership Status</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                          {userData.membershipStatus === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                        {userData.membershipStatus === 'active' && (
                          <p className="text-sm text-muted-foreground">
                            Your membership is active and renewed monthly
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Upcoming Milestones</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-sage-500 mr-2"></div>
                          <span className="text-sm">50 more points until Silver tier</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-sage-500 mr-2"></div>
                          <span className="text-sm">Complete 3 more retreats for a free session</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="retreats">
              <Card>
                <CardHeader>
                  <CardTitle>My Retreat History</CardTitle>
                  <CardDescription>
                    View all your past and upcoming retreat experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Retreat History</h3>
                    <p className="text-muted-foreground mb-6">
                      This section will show all your retreat bookings and history
                    </p>
                    <Button>View All Bookings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="community">
              <Card>
                <CardHeader>
                  <CardTitle>Community Participation</CardTitle>
                  <CardDescription>
                    Connect with other members and join the conversation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Join the Community</h3>
                    <p className="text-muted-foreground mb-6">
                      Connect with like-minded individuals on your wellness journey
                    </p>
                    <Button asChild>
                      <Link to="/community">Go to Community</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your profile and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Name</p>
                          <p className="text-muted-foreground">{userData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Email</p>
                          <p className="text-muted-foreground">{userData.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Preferences</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Email Notifications</p>
                          <p className="text-muted-foreground">You are receiving all notifications</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline">Edit Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {isAdmin && (
              <TabsContent value="admin">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Tools</CardTitle>
                    <CardDescription>
                      Quick tools for event and content management
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <EventURLInput 
                      onEventDataExtracted={(eventData) => {
                        toast.success("Event data extracted successfully!");
                      }} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default UserDashboard;
