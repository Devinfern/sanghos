import { motion } from "framer-motion";
import DashboardLeftSidebar from "./dashboard/DashboardLeftSidebar";
import DashboardMainContent from "./dashboard/DashboardMainContent";
import DashboardRightSidebar from "./dashboard/DashboardRightSidebar";
interface ModernCommunityDashboardProps {
  isLoggedIn: boolean;
  currentEvents: any[];
  trendingPosts: any[];
  onSectionChange: (section: string) => void;
  activeSection: string;
}
const ModernCommunityDashboard = ({
  isLoggedIn,
  currentEvents,
  trendingPosts,
  onSectionChange,
  activeSection
}: ModernCommunityDashboardProps) => {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-subtle/20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 -left-32 w-80 h-80 bg-brand-sand/8 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-12 gap-6 p-6 max-w-7xl mx-auto my-[38px]">
          {/* Left Sidebar */}
          <motion.div variants={{
          hidden: {
            opacity: 0,
            x: -20
          },
          visible: {
            opacity: 1,
            x: 0
          }
        }} className="col-span-12 lg:col-span-3">
            <DashboardLeftSidebar onSectionChange={onSectionChange} activeSection={activeSection} />
          </motion.div>

          {/* Main Content */}
          <motion.div variants={{
          hidden: {
            opacity: 0,
            y: 20
          },
          visible: {
            opacity: 1,
            y: 0
          }
        }} className="col-span-12 lg:col-span-6">
            <DashboardMainContent onSectionChange={onSectionChange} />
          </motion.div>

          {/* Right Sidebar */}
          <motion.div variants={{
          hidden: {
            opacity: 0,
            x: 20
          },
          visible: {
            opacity: 1,
            x: 0
          }
        }} className="col-span-12 lg:col-span-3">
            <DashboardRightSidebar currentEvents={currentEvents} trendingPosts={trendingPosts} onSectionChange={onSectionChange} />
          </motion.div>
        </motion.div>
      </div>
    </div>;
};
export default ModernCommunityDashboard;