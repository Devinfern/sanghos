import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { retreats, formatDate } from "@/lib/data";
import { toast } from "sonner";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardRetreats from "@/components/dashboard/DashboardRetreats";
import DashboardCommunity from "@/components/dashboard/DashboardCommunity";
import DashboardAccount from "@/components/dashboard/DashboardAccount";
import DashboardAdmin from "@/components/dashboard/DashboardAdmin";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [upcomingRetreats, setUpcomingRetreats] = useState<any[]>([]);
  const { isAdmin, isLoading: isAdminLoading } = useAdminStatus();
  const [activeTab, setActiveTab] = useState("overview");

  // Debug admin status
  useEffect(() => {
    console.log("Admin status in UserDashboard:", isAdmin);
    console.log("Admin loading in UserDashboard:", isAdminLoading);
    
    // If admin check completes and user is admin, show a toast notification
    if (!isAdminLoading && isAdmin) {
      toast.success("Admin access granted", { id: "admin-access" });
    }
  }, [isAdmin, isAdminLoading]);

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
          <button onClick={() => navigate("/login")}>Back to Login</button>
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
              {isAdmin && (
                <Badge variant="destructive" className="flex items-center">
                  <Shield className="h-3.5 w-3.5 mr-1" /> Admin
                </Badge>
              )}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
            
            <TabsContent value="overview">
              <DashboardOverview userData={userData} upcomingRetreats={upcomingRetreats} />
            </TabsContent>
            
            <TabsContent value="retreats">
              <DashboardRetreats />
            </TabsContent>
            
            <TabsContent value="community">
              <DashboardCommunity />
            </TabsContent>
            
            <TabsContent value="account">
              <DashboardAccount userData={userData} />
            </TabsContent>

            {isAdmin && (
              <TabsContent value="admin">
                <DashboardAdmin />
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
