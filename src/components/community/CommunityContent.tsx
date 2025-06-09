
import { useState } from "react";
import { motion } from "framer-motion";
import EnhancedCommunityNavigation from "./enhanced/EnhancedCommunityNavigation";
import CommunityDiscussions from "./CommunityDiscussions";
import CommunityEventsPage from "./CommunityEventsPage";
import CommunityResourcesPage from "./CommunityResourcesPage";
import CommunityMembersPage from "./CommunityMembersPage";
import RetreatCommunityList from "./RetreatCommunityList";
import CommunityDashboard from "./CommunityDashboard";
import CommunityBreadcrumb from "./CommunityBreadcrumb";
import NotificationBell from "./enhanced/NotificationBell";
import EnhancedActiveMembersCard from "./enhanced/EnhancedActiveMembersCard";
import { Button } from "@/components/ui/button";
import { Settings, BookOpen, Calendar, Sparkles } from "lucide-react";

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
  const [highlightedEvent, setHighlightedEvent] = useState(currentEvents[0] || null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <CommunityDashboard
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
          <CommunityDashboard
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
      
      {/* Main Content */}
      <div className="container px-4 md:px-6 mx-auto mt-4">
        {/* Header Section - Reduced spacing and improved layout */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <CommunityBreadcrumb activeSection={activeSection} />
            <h1 className="text-2xl font-bold text-brand-dark mt-1">
              {activeSection === "dashboard" ? "Community Dashboard" : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-28 space-y-6">
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp}
                className="overflow-hidden rounded-xl border border-brand-subtle/20 bg-gradient-to-br from-white to-brand-subtle/5"
              >
                <div className="bg-gradient-to-br from-brand-primary/90 to-brand-dark/90 backdrop-blur-xl p-4 rounded-t-xl">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Resources
                  </h3>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-b-xl">
                  <div className="space-y-3">
                    <div className="flex items-center p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer">
                      <div className="h-8 w-8 rounded-full bg-brand-rose/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-brand-rose" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-sm">Beginners Guide</p>
                        <p className="text-xs text-muted-foreground">Getting started</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer">
                      <div className="h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-brand-primary" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-sm">Wellness Library</p>
                        <p className="text-xs text-muted-foreground">Research & articles</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer">
                      <div className="h-8 w-8 rounded-full bg-brand-sand/10 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-brand-sand" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-sm">Event Calendar</p>
                        <p className="text-xs text-muted-foreground">Upcoming gatherings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-1 lg:col-span-2">
            <motion.div 
              key={activeSection}
              initial="hidden" 
              animate="visible" 
              variants={fadeInUp}
              className="bg-white/95 backdrop-blur-md border border-brand-subtle/10 p-6 rounded-xl shadow-sm"
            >
              {renderActiveSection()}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Upcoming Events Card */}
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp}
                custom={1}
                className="overflow-hidden rounded-xl border border-brand-subtle/20 bg-gradient-to-br from-white to-brand-subtle/5"
              >
                <div className="bg-gradient-to-br from-brand-sand/90 to-brand-sand/70 backdrop-blur-xl p-4 rounded-t-xl">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Upcoming Events
                  </h3>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-b-xl">
                  {currentEvents.slice(0, 3).map((event, index) => (
                    <div 
                      key={index} 
                      className={`p-2 rounded-lg cursor-pointer transition-all ${highlightedEvent === event ? 'bg-brand-subtle/20' : 'hover:bg-brand-subtle/10'}`}
                      onClick={() => setHighlightedEvent(event)}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-brand-primary/10 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-xs font-medium text-brand-primary">{event.date?.month}</span>
                          <span className="text-sm font-bold text-brand-primary">{event.date?.day}</span>
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-brand-dark">
                    View All Events
                  </Button>
                </div>
              </motion.div>
              
              {/* Enhanced Active Members Card */}
              <EnhancedActiveMembersCard 
                members={trendingPosts} 
                onSectionChange={onSectionChange} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityContent;
