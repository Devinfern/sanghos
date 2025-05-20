
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventManager from "@/components/admin/EventManager";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AdminCMS = () => {
  const { isAdmin, isLoading, error } = useAdminStatus();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [directAdminCheck, setDirectAdminCheck] = useState<boolean | null>(null);
  const [checkLoading, setCheckLoading] = useState(false);
  
  // Debug: Direct database check for this specific page
  useEffect(() => {
    const checkDirectAdminStatus = async () => {
      if (!user?.email) return;
      
      setCheckLoading(true);
      try {
        console.log("AdminCMS - Direct DB check for:", user.email);
        
        const { data, error } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', user.email)
          .maybeSingle();
          
        if (error) {
          console.error("Direct admin check error:", error);
        }
        
        const isDirectAdmin = !!data;
        console.log("AdminCMS - Direct DB check result:", isDirectAdmin, data);
        setDirectAdminCheck(isDirectAdmin);
        
        // If direct check passes but hook check fails, override
        if (isDirectAdmin && !isAdmin && !isLoading) {
          console.log("AdminCMS - Direct check passed but hook failed, proceeding as admin");
          // Don't redirect in this case
          return;
        }
      } catch (err) {
        console.error("AdminCMS - Direct admin check error:", err);
      } finally {
        setCheckLoading(false);
      }
    };
    
    checkDirectAdminStatus();
  }, [user, isAdmin, isLoading]);
  
  useEffect(() => {
    // Debug logging
    console.log("AdminCMS - Current user:", user?.email);
    console.log("AdminCMS - Admin status:", { isAdmin, isLoading, error });
    console.log("AdminCMS - Direct admin check:", { directAdminCheck, checkLoading });
    
    // Only redirect if both checks fail and neither is loading
    if (!isLoading && !checkLoading && !isAdmin && directAdminCheck === false) {
      toast.error("You don't have permission to access this page");
      navigate("/");
    }
  }, [isAdmin, isLoading, error, navigate, user, directAdminCheck, checkLoading]);
  
  // Show loading while either check is in progress
  if (isLoading || checkLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 min-h-screen pt-28 pb-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <div className="text-lg font-medium">Verifying admin access...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  // Allow access if either check passes
  if (isAdmin || directAdminCheck) {
    return (
      <>
        <Helmet>
          <title>Admin CMS | Sanghos</title>
          <meta
            name="description"
            content="Content Management System for Sanghos administrators"
          />
        </Helmet>

        <Header />
        
        <div className="container mx-auto px-4 min-h-screen pt-28 pb-16">
          <h1 className="text-3xl font-bold mb-8">Admin Content Management System</h1>
          
          <Tabs defaultValue="events">
            <TabsList className="mb-8">
              <TabsTrigger value="events">Events & Retreats</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events">
              <EventManager />
            </TabsContent>
            
            <TabsContent value="community">
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-4">Community CMS</h2>
                <p className="text-muted-foreground mb-6">
                  Manage community forums, events, and content using the dedicated Community CMS.
                </p>
                <button 
                  onClick={() => navigate("/community/cms")}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded"
                >
                  Go to Community CMS
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <Footer />
      </>
    );
  }

  return null; // When redirecting
};

export default AdminCMS;
