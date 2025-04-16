
import CommunityHero from "./CommunityHero";
import CommunityStats from "./CommunityStats";
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

  return (
    <>
      <CommunityHero />
      <CommunityStats />
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-8">
          <CommunityNavigation 
            activeSection={activeSection} 
            onSectionChange={onSectionChange} 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 w-full shrink-0">
            <div className="sticky top-24 space-y-8">
              <CommunityResources />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-brand-dark">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h1>
              {isAdmin && (
                <Button 
                  variant="outline" 
                  onClick={onToggleCMS}
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary/5"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Content
                </Button>
              )}
            </div>

            {renderActiveSection()}
          </div>

          <div className="lg:w-80 w-full shrink-0">
            <div className="sticky top-24 space-y-6">
              <CommunityEvents events={currentEvents} />
              <CommunityMembers trendingPosts={trendingPosts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityContent;
