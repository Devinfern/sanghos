
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventManager from "@/components/admin/EventManager";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { toast } from "sonner";

const AdminCMS = () => {
  const { isAdmin, isLoading } = useAdminStatus();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast.error("You don't have permission to access this page");
      navigate("/");
    }
  }, [isAdmin, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 min-h-screen pt-28 pb-16">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!isAdmin) {
    return null;
  }

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
};

export default AdminCMS;
