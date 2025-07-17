import React from "react";
import { motion } from "framer-motion";
import CommunityHero from "./CommunityHero";
import CommunitySidebar from "./CommunitySidebar";
import FloatingCreateButton from "./FloatingCreateButton";

interface CommunityPageContainerProps {
  title: string;
  children: React.ReactNode;
  showHero?: boolean;
  isLoggedIn?: boolean;
  stats?: {
    activeMembers: number;
    totalPosts: number;
    upcomingEvents: number;
    engagement: number;
  };
  onPostCreated?: () => void;
  onNavigate?: (section: string) => void;
  onCreatePost?: () => void;
}

const CommunityPageContainer = ({
  title,
  children,
  showHero = true,
  isLoggedIn = false,
  stats = {
    activeMembers: 156,
    totalPosts: 2847,
    upcomingEvents: 12,
    engagement: 94
  },
  onPostCreated = () => {},
  onNavigate = () => {},
  onCreatePost = () => {}
}: CommunityPageContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-subtle/10 via-white to-sage-50/20">
      {/* Community Hero */}
      {showHero && (
        <CommunityHero 
          activeMembers={stats.activeMembers}
          totalPosts={stats.totalPosts}
          upcomingEvents={stats.upcomingEvents}
          engagement={stats.engagement}
        />
      )}

      {/* Main Layout */}
      <div className="container px-4 lg:px-8 mx-auto">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Main Content */}
          <motion.div 
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="hidden xl:block w-80 flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-8">
              <CommunitySidebar 
                onCreatePost={onCreatePost}
                onNavigate={onNavigate}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Create Button */}
      {isLoggedIn && (
        <FloatingCreateButton onPostCreated={onPostCreated} />
      )}
    </div>
  );
};

export default CommunityPageContainer;