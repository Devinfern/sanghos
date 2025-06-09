
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageSquare, Calendar } from "lucide-react";

const EnhancedWelcomeSection = ({ onSectionChange }: { onSectionChange: (section: string) => void }) => {
  const { user } = useAuth();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const userName = user?.user_metadata?.username || user?.email?.split('@')[0] || "Friend";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary/90 text-white p-6 md:p-8 mb-6"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-brand-rose/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 w-96 h-40 rounded-full bg-brand-sand/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
      </div>
      
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            {getGreeting()}, {userName}! ✨
          </h1>
          <p className="text-base md:text-lg opacity-90 max-w-2xl leading-relaxed">
            Welcome to your wellness community. Connect, grow, and embark on your journey with like-minded souls.
          </p>
        </motion.div>
        
        {/* Enhanced Primary CTAs */}
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button 
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            onClick={() => onSectionChange("events")}
          >
            <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            Explore Events
          </Button>
          <Button 
            size="lg"
            className="bg-brand-sand hover:bg-brand-sand/90 text-brand-dark border-2 border-brand-sand hover:border-brand-sand/90 transition-all duration-300 hover:scale-105 hover:shadow-xl group font-semibold"
            onClick={() => onSectionChange("discussions")}
          >
            <MessageSquare className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Start Discussion
          </Button>
          <Button 
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 border-2 border-white/20 hover:border-white/40 transition-all duration-300 group"
            onClick={() => onSectionChange("retreats")}
          >
            <Calendar className="h-4 w-4 mr-2 group-hover:bounce transition-transform" />
            View Retreats
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnhancedWelcomeSection;
