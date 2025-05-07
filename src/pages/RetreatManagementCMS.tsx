
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetreatForm from "@/components/admin/RetreatForm";
import RetreatsList from "@/components/admin/RetreatsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const RetreatManagementCMS = () => {
  const { isAdmin, isLoading: isAdminLoading } = useAdminStatus();
  const [activeTab, setActiveTab] = useState("list");
  const [editingRetreat, setEditingRetreat] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAdminLoading && !isAdmin) {
      toast.error("You don't have permission to access this page");
      navigate("/");
    }
  }, [isAdmin, isAdminLoading, navigate]);

  if (isAdminLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  const handleCreateNew = () => {
    setEditingRetreat(null);
    setActiveTab("form");
  };

  const handleEditRetreat = (retreat: any) => {
    setEditingRetreat(retreat);
    setActiveTab("form");
  };

  const handleFormComplete = () => {
    setActiveTab("list");
    setEditingRetreat(null);
  };

  return (
    <>
      <Helmet>
        <title>Retreat Management | Sanghos</title>
        <meta
          name="description"
          content="Manage your retreats and events with our simple CMS"
        />
      </Helmet>

      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">Retreat Management</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList>
            <TabsTrigger value="list">All Retreats</TabsTrigger>
            <TabsTrigger value="form">
              {editingRetreat ? "Edit Retreat" : "Create New Retreat"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="focus-visible:outline-none">
            <RetreatsList 
              onCreateNew={handleCreateNew} 
              onEditRetreat={handleEditRetreat} 
            />
          </TabsContent>
          
          <TabsContent value="form" className="focus-visible:outline-none">
            <RetreatForm 
              retreatData={editingRetreat} 
              onComplete={handleFormComplete} 
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </>
  );
};

export default RetreatManagementCMS;
