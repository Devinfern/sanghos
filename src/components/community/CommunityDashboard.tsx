
import { motion } from "framer-motion";
import "./BentoDashboard.css";
import EnhancedWelcomeSection from "./dashboard/EnhancedWelcomeSection";
import EnhancedSearchSection from "./dashboard/EnhancedSearchSection";
import QuickStatsGrid from "./dashboard/QuickStatsGrid";
import EnhancedTrendingTopicsCard from "./dashboard/EnhancedTrendingTopicsCard";
import EnhancedQuickActionsCard from "./dashboard/EnhancedQuickActionsCard";
import RecentActivityCard from "./dashboard/RecentActivityCard";
import UserProgressWidget from "./dashboard/UserProgressWidget";

interface CommunityDashboardProps {
  isLoggedIn: boolean;
  currentEvents: any[];
  trendingPosts: any[];
  onSectionChange: (section: string) => void;
}

const CommunityDashboard = ({
  isLoggedIn,
  currentEvents,
  trendingPosts,
  onSectionChange
}: CommunityDashboardProps) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-8 p-6">
      <EnhancedWelcomeSection onSectionChange={onSectionChange} />
      <EnhancedSearchSection />

      {/* Enhanced Bento Grid Layout */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
        className="bento-grid gap-6"
      >
        <QuickStatsGrid currentEvents={currentEvents} />
        <EnhancedTrendingTopicsCard onSectionChange={onSectionChange} />
        <EnhancedQuickActionsCard onSectionChange={onSectionChange} />
        <RecentActivityCard onSectionChange={onSectionChange} />
        
        {/* Add User Progress Widget */}
        <div className="col-span-full">
          <UserProgressWidget />
        </div>
      </motion.div>
    </div>
  );
};

export default CommunityDashboard;
