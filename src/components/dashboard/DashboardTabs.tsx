
import React from "react";
import { Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardRetreats from "@/components/dashboard/DashboardRetreats";
import DashboardCommunity from "@/components/dashboard/DashboardCommunity";
import DashboardAccount from "@/components/dashboard/DashboardAccount";
import DashboardAdmin from "@/components/dashboard/DashboardAdmin";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  isAdmin: boolean;
  userData: any;
  upcomingRetreats: any[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  isAdmin, 
  userData, 
  upcomingRetreats 
}) => {
  return (
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
  );
};

export default DashboardTabs;
