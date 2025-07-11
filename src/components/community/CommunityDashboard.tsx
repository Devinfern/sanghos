
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-subtle/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-primary/20 to-brand-sand/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-brand-rose/15 to-brand-primary/15 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-brand-sand/20 to-brand-subtle/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 space-y-8 p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <EnhancedWelcomeSection onSectionChange={onSectionChange} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <EnhancedSearchSection />
          </motion.div>

          {/* Enhanced Bento Grid Layout with Staggered Animation */}
          <motion.div
            variants={containerVariants}
            className="bento-grid gap-6 mt-8"
          >
            <motion.div variants={itemVariants} className="bento-item">
              <QuickStatsGrid currentEvents={currentEvents} />
            </motion.div>
            
            <motion.div variants={itemVariants} className="bento-item">
              <EnhancedTrendingTopicsCard onSectionChange={onSectionChange} />
            </motion.div>
            
            <motion.div variants={itemVariants} className="bento-item">
              <EnhancedQuickActionsCard onSectionChange={onSectionChange} />
            </motion.div>
            
            <motion.div variants={itemVariants} className="bento-item">
              <RecentActivityCard onSectionChange={onSectionChange} />
            </motion.div>
            
            {/* Enhanced User Progress Widget */}
            <motion.div variants={itemVariants} className="col-span-full">
              <div className="glass-card p-6 rounded-2xl border border-white/20 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl shadow-xl">
                <UserProgressWidget />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityDashboard;
