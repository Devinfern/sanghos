
import { useState } from "react";
import { motion } from "framer-motion";
import CommunityNavigation from "./CommunityNavigation";
import CommunityDiscussions from "./CommunityDiscussions";
import CommunityEventsPage from "./CommunityEventsPage";
import CommunityResourcesPage from "./CommunityResourcesPage";
import CommunityMembersPage from "./CommunityMembersPage";
import RetreatCommunityList from "./RetreatCommunityList";
import { Button } from "@/components/ui/button";
import { Settings, Bell, MessageSquare, Calendar, Users, BookOpen, Sparkles } from "lucide-react";

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
  const [highlightedMember, setHighlightedMember] = useState(trendingPosts[0] || null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

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
    <div className="bg-gradient-to-b from-white to-brand-subtle/10 min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="container px-4 md:px-6 mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-dark to-brand-primary text-white p-8 md:p-12 mb-8">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent" />
            <div className="absolute -top-28 -right-28 w-64 h-64 rounded-full bg-brand-rose/30 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 w-96 h-32 rounded-full bg-brand-primary/30 blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Welcome to Sanghos Community</h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                Connect with like-minded individuals, share experiences, and embark on your wellness journey together.
              </p>
            </motion.div>
            
            <motion.div 
              className="mt-6 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                <Sparkles className="h-4 w-4 mr-2" />
                Explore Events
              </Button>
              {isLoggedIn ? (
                <Button className="bg-brand-sand text-brand-dark hover:bg-brand-sand/90">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Discussions
                </Button>
              ) : (
                <Button className="bg-brand-sand text-brand-dark hover:bg-brand-sand/90">
                  Join Community
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="bg-white py-2 sticky top-16 z-30 border-b border-brand-subtle/20">
        <CommunityNavigation 
          activeSection={activeSection} 
          onSectionChange={onSectionChange} 
        />
      </div>
      
      {/* Main Content */}
      <div className="container px-4 md:px-6 mx-auto mt-8">
        <div className="flex justify-between items-center mb-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-28 space-y-6">
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp}
                className="overflow-hidden rounded-xl neo-blur border border-white/10"
              >
                <div className="bg-gradient-to-br from-brand-primary/90 to-brand-dark/90 backdrop-blur-xl p-5 rounded-t-xl">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Resources
                  </h3>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-b-xl">
                  <div className="space-y-3">
                    <div className="flex items-center p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors">
                      <div className="h-8 w-8 rounded-full bg-brand-rose/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-brand-rose" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-sm">Beginners Guide</p>
                        <p className="text-xs text-muted-foreground">Getting started</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors">
                      <div className="h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-brand-primary" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-sm">Wellness Library</p>
                        <p className="text-xs text-muted-foreground">Research & articles</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors">
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
              className="glass-morphism bg-white/95 backdrop-blur-md border border-brand-subtle/10 p-6 rounded-xl shadow-sm"
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
                className="overflow-hidden rounded-xl neo-blur border border-white/10"
              >
                <div className="bg-gradient-to-br from-brand-sand/90 to-brand-sand/70 backdrop-blur-xl p-5 rounded-t-xl">
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
              
              {/* Community Members Card */}
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp}
                custom={2}
                className="overflow-hidden rounded-xl neo-blur border border-white/10"
              >
                <div className="bg-gradient-to-br from-brand-rose/90 to-brand-rose/70 backdrop-blur-xl p-5 rounded-t-xl">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Active Members
                  </h3>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-b-xl">
                  {trendingPosts.slice(0, 3).map((member, index) => (
                    <div 
                      key={index} 
                      className={`p-2 rounded-lg cursor-pointer transition-all ${highlightedMember === member ? 'bg-brand-subtle/20' : 'hover:bg-brand-subtle/10'}`}
                      onClick={() => setHighlightedMember(member)}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img src={member.avatar || "/placeholder.svg"} alt={member.author} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-sm">{member.author}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">{member.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-brand-dark">
                    View All Members
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityContent;
