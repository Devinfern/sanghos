
import { useState } from "react";
import { motion } from "framer-motion";
import EnhancedCommunityNavigation from "./enhanced/EnhancedCommunityNavigation";
import CommunityDiscussions from "./CommunityDiscussions";
import CommunityEventsPage from "./CommunityEventsPage";
import CommunityResourcesPage from "./CommunityResourcesPage";
import CommunityMembersPage from "./CommunityMembersPage";
import RetreatCommunityList from "./RetreatCommunityList";
import ModernCommunityDashboard from "./ModernCommunityDashboard";
import CommunityBreadcrumb from "./CommunityBreadcrumb";
import NotificationBell from "./enhanced/NotificationBell";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface CommunityContentProps {
  isAdmin: boolean;
  isLoggedIn: boolean;
  activeSection: string;
  currentEvents: any[];
  trendingPosts: any[];
  onSectionChange: (section: string) => void;
  onToggleCMS: () => void;
}

const CommunityContent = ({
  isAdmin,
  isLoggedIn,
  activeSection,
  currentEvents,
  trendingPosts,
  onSectionChange,
  onToggleCMS
}: CommunityContentProps) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <ModernCommunityDashboard
            isLoggedIn={isLoggedIn}
            currentEvents={currentEvents}
            trendingPosts={trendingPosts}
            onSectionChange={onSectionChange}
          />
        );
      case "discussions":
        return <CommunityDiscussions isLoggedIn={isLoggedIn} />;
      case "events":
        return <CommunityEventsPage events={currentEvents} />;
      case "resources":
        return <CommunityResourcesPage />;
      case "members":
        return <CommunityMembersPage />;
      case "retreats":
        return <RetreatCommunityList />;
      default:
        return (
          <ModernCommunityDashboard
            isLoggedIn={isLoggedIn}
            currentEvents={currentEvents}
            trendingPosts={trendingPosts}
            onSectionChange={onSectionChange}
          />
        );
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-brand-subtle/10 min-h-screen pt-16 pb-16">
      {/* Navigation */}
      <div className="bg-white/98 backdrop-blur-lg sticky top-16 z-30 border-b border-brand-subtle/20 shadow-sm">
        <EnhancedCommunityNavigation 
          activeSection={activeSection} 
          onSectionChange={onSectionChange} 
        />
      </div>
      
      {/* Header Section - Only show for non-dashboard sections */}
      {activeSection !== "dashboard" && (
        <div className="container px-4 md:px-6 mx-auto mt-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <CommunityBreadcrumb activeSection={activeSection} />
              <h1 className="text-2xl font-bold text-brand-dark mt-1">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h1>
            </div>
            <div className="flex gap-2 items-center ml-4">
              <NotificationBell />
              {isAdmin && (
                <Button 
                  variant="outline" 
                  onClick={onToggleCMS}
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 rounded-full px-3 py-2 text-sm"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Manage
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Full width for dashboard, contained for others */}
      <div className={activeSection === "dashboard" ? "" : "container px-4 md:px-6 mx-auto"}>
        <motion.div 
          key={activeSection}
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp}
          className={activeSection === "dashboard" ? "" : "bg-white/95 backdrop-blur-md border border-brand-subtle/10 p-6 rounded-xl shadow-sm"}
        >
          {renderActiveSection()}
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityContent;
