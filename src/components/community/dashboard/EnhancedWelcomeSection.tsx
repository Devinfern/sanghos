
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageSquare, Calendar, Heart, Sunrise, Sun, Moon } from "lucide-react";

const EnhancedWelcomeSection = ({ onSectionChange }: { onSectionChange: (section: string) => void }) => {
  const { user } = useAuth();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return { greeting: "Good evening", icon: Moon, message: "Rest and reflect on your wellness journey" };
    if (hour < 12) return { greeting: "Good morning", icon: Sunrise, message: "Start your day with mindful intention" };
    if (hour < 17) return { greeting: "Good afternoon", icon: Sun, message: "Continue nurturing your wellness practice" };
    return { greeting: "Good evening", icon: Moon, message: "Wind down and connect with your community" };
  };

  const { greeting, icon: TimeIcon, message } = getTimeBasedGreeting();
  const userName = user?.user_metadata?.username || user?.email?.split('@')[0] || "Wellness Seeker";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="relative overflow-hidden rounded-3xl mb-8"
    >
      {/* Enhanced Multi-layer Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary/90" />
        
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-sand/30 via-transparent to-brand-rose/30 animate-gradient-shift" />
        
        {/* Organic shapes */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-white/20 to-brand-rose/30 blur-3xl animate-gentle-pulse" />
        <div className="absolute bottom-0 left-1/3 w-96 h-40 rounded-full bg-gradient-to-r from-brand-sand/40 to-transparent blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-white/15 to-transparent blur-xl animate-float" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>
      
      <div className="relative z-10 p-8 md:p-12 text-white">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <TimeIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {greeting}, {userName}! 
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block ml-2"
                >
                  ✨
                </motion.span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed font-light">
                {message}. Your wellness community is here to support you every step of the way.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced Action Buttons */}
        <motion.div 
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button 
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group px-6 py-3 rounded-2xl"
            onClick={() => onSectionChange("events")}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span className="font-semibold">Explore Events</span>
            </div>
          </Button>
          
          <Button 
            size="lg"
            className="bg-brand-sand hover:bg-brand-sand/90 text-brand-dark border-2 border-brand-sand hover:border-brand-sand/90 transition-all duration-300 hover:scale-105 hover:shadow-xl group px-6 py-3 rounded-2xl font-semibold"
            onClick={() => onSectionChange("discussions")}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Start Discussion</span>
            </div>
          </Button>
          
          <Button 
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 border-2 border-white/20 hover:border-white/40 transition-all duration-300 group px-6 py-3 rounded-2xl"
            onClick={() => onSectionChange("retreats")}
          >
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Find Retreats</span>
            </div>
          </Button>
        </motion.div>

        {/* Wellness tip of the day */}
        <motion.div 
          className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-1 bg-white/20 rounded-full mt-1">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Daily Wellness Intention</h3>
              <p className="text-sm opacity-90">
                "Take three deep breaths before each transition today. Notice how this simple practice brings presence to your moments."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnhancedWelcomeSection;
