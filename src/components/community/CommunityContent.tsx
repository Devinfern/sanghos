
import { useState } from "react";
import { motion } from "framer-motion";
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
            activeSection={activeSection}
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
      case "retreat-centers":
        return <CommunityResourcesPage />; // Placeholder for now
      case "preparation":
        return <CommunityResourcesPage />; // Placeholder for retreat preparation
      case "connections":
        return <CommunityMembersPage />; // Placeholder for fellow retreaters
      case "integration":
        return <CommunityResourcesPage />; // Placeholder for integration support
      case "share":
        return <CommunityDiscussions isLoggedIn={isLoggedIn} />; // Placeholder for sharing journey
      case "alumni":
        return <CommunityMembersPage />; // Placeholder for alumni network
      case "practice-groups":
        return <CommunityMembersPage />; // Placeholder for practice groups
      case "local-chapters":
        return <CommunityMembersPage />; // Placeholder for local chapters
      default:
        return (
          <ModernCommunityDashboard
            isLoggedIn={isLoggedIn}
            currentEvents={currentEvents}
            trendingPosts={trendingPosts}
            onSectionChange={onSectionChange}
            activeSection={activeSection}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Section - Only show for non-dashboard sections on desktop */}
      {activeSection !== "dashboard" && (
        <div className="bg-gradient-to-b from-white to-brand-subtle/10 pt-20 pb-4 hidden md:block">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <CommunityBreadcrumb activeSection={activeSection} />
                <h1 className="text-2xl font-bold text-brand-dark mt-1">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}
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
        </div>
      )}

      {/* Main Content - Full width for dashboard on desktop, mobile-optimized for mobile */}
      <div className={activeSection === "dashboard" ? "hidden md:block" : "bg-gradient-to-b from-white to-brand-subtle/10 pb-16 hidden md:block"}>
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

      {/* Mobile Content - Full width, simplified */}
      <div className="md:hidden">
        <motion.div 
          key={activeSection}
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp}
          className="p-4"
        >
          {renderActiveSection()}
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityContent;
