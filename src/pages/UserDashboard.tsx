
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useUserDashboardData } from "@/hooks/useUserDashboardData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import DashboardError from "@/components/dashboard/DashboardError";

const UserDashboard = () => {
  const { userData, isLoading, upcomingRetreats } = useUserDashboardData();
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

  if (isLoading || isAdminLoading) {
    return <DashboardLoading />;
  }

  if (!userData) {
    return <DashboardError />;
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
          <DashboardHeader userData={userData} isAdmin={isAdmin} />
          <DashboardTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isAdmin={isAdmin} 
            userData={userData} 
            upcomingRetreats={upcomingRetreats} 
          />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default UserDashboard;
