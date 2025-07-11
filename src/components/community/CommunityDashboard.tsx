
import { motion } from "framer-motion";
import "./BentoDashboard.css";
import EnhancedWelcomeSection from "./dashboard/EnhancedWelcomeSection";
import EnhancedSearchSection from "./dashboard/EnhancedSearchSection";
import CleanStatsOverview from "./dashboard/CleanStatsOverview";
import CourseProgressCards from "./dashboard/CourseProgressCards";
import ActivityFeedCard from "./dashboard/ActivityFeedCard";
import QuickAccessCard from "./dashboard/QuickAccessCard";
import CommunityHighlights from "./dashboard/CommunityHighlights";

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
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-subtle/20 relative">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 -left-32 w-80 h-80 bg-brand-sand/8 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <EnhancedWelcomeSection onSectionChange={onSectionChange} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <EnhancedSearchSection />
          </motion.div>

          {/* Main Dashboard Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-12 gap-6 mt-8"
          >
            {/* Stats Overview - Top Row */}
            <motion.div variants={itemVariants} className="col-span-12">
              <CleanStatsOverview currentEvents={currentEvents} />
            </motion.div>

            {/* Course Progress - Left Column */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8">
              <CourseProgressCards onSectionChange={onSectionChange} />
            </motion.div>

            {/* Quick Actions - Right Column */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
              <QuickAccessCard onSectionChange={onSectionChange} />
            </motion.div>

            {/* Activity Feed - Left */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8">
              <ActivityFeedCard onSectionChange={onSectionChange} />
            </motion.div>

            {/* Community Highlights - Right */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
              <CommunityHighlights trendingPosts={trendingPosts} onSectionChange={onSectionChange} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityDashboard;
