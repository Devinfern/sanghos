
import { Star, MessageSquare, Calendar, Users, BookOpen, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface EnhancedQuickActionsCardProps {
  onSectionChange: (section: string) => void;
}

const EnhancedQuickActionsCard = ({ onSectionChange }: EnhancedQuickActionsCardProps) => {
  const actions = [
    {
      icon: MessageSquare,
      label: "Start Discussion",
      description: "Share your wellness journey",
      onClick: () => onSectionChange("discussions"),
      gradient: "from-blue-500/20 to-purple-600/20",
      hoverGradient: "hover:from-blue-500/30 hover:to-purple-600/30",
      iconColor: "text-blue-600",
      delay: 0
    },
    {
      icon: Calendar,
      label: "Browse Events",
      description: "Discover mindful gatherings",
      onClick: () => onSectionChange("events"),
      gradient: "from-green-500/20 to-teal-600/20",
      hoverGradient: "hover:from-green-500/30 hover:to-teal-600/30",
      iconColor: "text-green-600",
      delay: 0.1
    },
    {
      icon: Users,
      label: "Join Retreat",
      description: "Transform with community",
      onClick: () => onSectionChange("retreats"),
      gradient: "from-orange-500/20 to-red-600/20",
      hoverGradient: "hover:from-orange-500/30 hover:to-red-600/30",
      iconColor: "text-orange-600",
      delay: 0.2
    },
    {
      icon: BookOpen,
      label: "Explore Resources",
      description: "Deepen your practice",
      onClick: () => onSectionChange("resources"),
      gradient: "from-purple-500/20 to-pink-600/20",
      hoverGradient: "hover:from-purple-500/30 hover:to-pink-600/30",
      iconColor: "text-purple-600",
      delay: 0.3
    }
  ];

  return (
    <Card className="bento-card md:col-span-1 lg:col-span-1 border-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl overflow-hidden">
      <CardHeader className="pb-4 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl">
            <Star className="h-5 w-5 text-amber-600" />
          </div>
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-brand-dark to-brand-primary bg-clip-text text-transparent">
            Quick Actions
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Take your next step in wellness
        </p>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: action.delay, duration: 0.5 }}
          >
            <Button
              className={`w-full justify-between py-6 px-4 rounded-xl bg-gradient-to-r ${action.gradient} ${action.hoverGradient} border-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group relative overflow-hidden text-left`}
              onClick={action.onClick}
              variant="ghost"
            >
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className={`p-2 rounded-lg bg-white/50 backdrop-blur-sm ${action.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-sm text-gray-800 group-hover:text-gray-900 transition-colors">
                    {action.label}
                  </span>
                  <span className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                    {action.description}
                  </span>
                </div>
              </div>
              
              <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
        ))}
        
        {/* Inspiration quote */}
        <motion.div 
          className="mt-4 p-3 bg-gradient-to-r from-brand-subtle/30 to-brand-primary/10 rounded-xl border border-brand-subtle/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-xs text-brand-slate italic text-center">
            "Every small step is a victory on your wellness journey"
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default EnhancedQuickActionsCard;
