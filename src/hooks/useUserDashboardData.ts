
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { retreats } from "@/lib/data";

export const useUserDashboardData = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [upcomingRetreats, setUpcomingRetreats] = useState<any[]>([]);

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

  return { userData, isLoading, upcomingRetreats };
};
