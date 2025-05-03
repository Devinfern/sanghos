
import CommunityHero from "./CommunityHero";
import CommunityNavigation from "./CommunityNavigation";
import CommunityResources from "./CommunityResources";
import CommunityEvents from "./CommunityEvents";
import CommunityMembers from "./CommunityMembers";
import CommunityDiscussions from "./CommunityDiscussions";
import CommunityEventsPage from "./CommunityEventsPage";
import CommunityResourcesPage from "./CommunityResourcesPage";
import CommunityMembersPage from "./CommunityMembersPage";
import RetreatCommunityList from "./RetreatCommunityList";
import { Button } from "@/components/ui/button";
import { Settings, Bell } from "lucide-react";
import { motion } from "framer-motion";

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
  const renderActiveSection = () => {
    switch (activeSection) {
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
        return null;
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
      <CommunityHero />
      
      <div className="bg-gradient-to-b from-white to-brand-subtle/5 py-6">
        <CommunityNavigation 
          activeSection={activeSection} 
          onSectionChange={onSectionChange} 
        />
        
        <div className="container px-4 md:px-6 mx-auto mt-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 w-full order-2 lg:order-1 shrink-0">
              <div className="sticky top-28 space-y-8">
                <motion.div 
                  initial="hidden" 
                  animate="visible" 
                  variants={fadeInUp}
                  className="bg-white p-5 rounded-xl shadow-sm border border-brand-subtle/10"
                >
                  <CommunityResources />
                </motion.div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2">
              <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-brand-dark">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="text-muted-foreground rounded-full">
                    <Bell className="h-4 w-4" />
                  </Button>
                  {isAdmin && (
                    <Button 
                      variant="outline" 
                      onClick={onToggleCMS}
                      className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 rounded-full"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Content
                    </Button>
                  )}
                </div>
              </div>

              <motion.div 
                key={activeSection}
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp}
                className="min-h-[50vh] bg-white p-6 rounded-xl shadow-sm border border-brand-subtle/10"
              >
                {renderActiveSection()}
              </motion.div>
            </div>

            <div className="lg:w-80 w-full order-3 shrink-0">
              <div className="sticky top-28 space-y-6">
                <motion.div 
                  initial="hidden" 
                  animate="visible" 
                  variants={fadeInUp}
                  custom={1}
                  className="bg-white p-5 rounded-xl shadow-sm border border-brand-subtle/10"
                >
                  <CommunityEvents events={currentEvents} />
                </motion.div>
                <motion.div 
                  initial="hidden" 
                  animate="visible" 
                  variants={fadeInUp}
                  custom={2}
                  className="bg-white p-5 rounded-xl shadow-sm border border-brand-subtle/10"
                >
                  <CommunityMembers trendingPosts={trendingPosts} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityContent;
