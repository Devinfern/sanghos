
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings, PlusCircle, LayoutGrid, Check, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// URL and key constants for Supabase from the project's configuration
const SUPABASE_URL = "https://ordomvdrqjthpzfyrrzp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZG9tdmRycWp0aHB6ZnlycnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzM3NDgsImV4cCI6MjA1NjgwOTc0OH0.fQqjrsQC--wNITiVq15SIwuY2sp3t5hxpbg0DVVeoLw";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const verifyAdminAccess = async () => {
      if (!user?.email) return;
      
      setIsChecking(true);
      try {
        console.log(`Verifying admin access via edge function for: ${user.email}`);
        
        // Use edge function for admin verification with direct URL and key
        const response = await fetch(`${SUPABASE_URL}/functions/v1/is_user_admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({ email: user.email })
        });
        
        if (!response.ok) {
          throw new Error(`Edge function returned status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("Admin dashboard verification via edge function:", result);
        
        setIsAdmin(result.isAdmin);
      } catch (err) {
        console.error("Edge function admin verification error:", err);
        
        // Fallback to direct query
        try {
          console.log("Falling back to direct query for admin check");
          const { data, error } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', user.email)
            .maybeSingle();
            
          if (error) {
            console.error("Fallback admin verification error:", error);
            throw error;
          }
          
          setIsAdmin(!!data);
          console.log("Fallback admin dashboard verification:", !!data, data);
        } catch (fallbackErr) {
          console.error("Admin verification failed completely:", fallbackErr);
          setIsAdmin(false);
          toast.error("Error verifying admin status");
        }
      } finally {
        setIsChecking(false);
      }
    };
    
    verifyAdminAccess();
  }, [user]);

  const handleNavigate = (path: string) => {
    if (isAdmin === false) {
      toast.error("You don't have admin permission");
      return;
    }
    navigate(path);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Admin Tools</CardTitle>
          {isChecking ? (
            <div className="animate-pulse text-xs text-muted-foreground">Verifying access...</div>
          ) : isAdmin === true ? (
            <div className="flex items-center text-xs text-green-600">
              <Check className="h-3 w-3 mr-1" /> Verified
            </div>
          ) : isAdmin === false ? (
            <div className="flex items-center text-xs text-amber-600">
              <AlertTriangle className="h-3 w-3 mr-1" /> No access
            </div>
          ) : null}
        </div>
        <CardDescription>
          Access administrative tools and content management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Admin CMS</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage events, retreats, and community content
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleNavigate("/admin/cms")}
                  disabled={isChecking || isAdmin === false}
                >
                  Open Admin CMS
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Retreat Management</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create and manage retreat listings easily
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleNavigate("/retreat-management")}
                  disabled={isChecking || isAdmin === false}
                >
                  Manage Retreats
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleNavigate("/retreat-management")}
            disabled={isChecking || isAdmin === false}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Retreat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAdmin;
