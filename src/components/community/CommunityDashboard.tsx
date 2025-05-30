
import { motion } from "framer-motion";
import "./BentoDashboard.css";
import WelcomeSection from "./dashboard/WelcomeSection";
import SearchSection from "./dashboard/SearchSection";
import QuickStatsGrid from "./dashboard/QuickStatsGrid";
import TrendingTopicsCard from "./dashboard/TrendingTopicsCard";
import QuickActionsCard from "./dashboard/QuickActionsCard";
import RecentActivityCard from "./dashboard/RecentActivityCard";

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
      <WelcomeSection />
      <SearchSection />

      {/* Bento Grid Layout */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
        className="bento-grid gap-6"
      >
        <QuickStatsGrid currentEvents={currentEvents} />
        <TrendingTopicsCard onSectionChange={onSectionChange} />
        <QuickActionsCard onSectionChange={onSectionChange} />
        <RecentActivityCard onSectionChange={onSectionChange} />
      </motion.div>
    </div>
  );
};

export default CommunityDashboard;
