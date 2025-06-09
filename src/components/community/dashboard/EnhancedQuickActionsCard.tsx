
import { Star, MessageSquare, Calendar, Users, BookOpen, Plus } from "lucide-react";
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
      description: "Share your thoughts",
      onClick: () => onSectionChange("discussions"),
      gradient: "from-blue-500 to-purple-600",
      hoverGradient: "hover:from-blue-600 hover:to-purple-700"
    },
    {
      icon: Calendar,
      label: "Browse Events",
      description: "Find your next event",
      onClick: () => onSectionChange("events"),
      gradient: "from-green-500 to-teal-600",
      hoverGradient: "hover:from-green-600 hover:to-teal-700"
    },
    {
      icon: Users,
      label: "Join Retreat",
      description: "Connect & transform",
      onClick: () => onSectionChange("retreats"),
      gradient: "from-orange-500 to-red-600",
      hoverGradient: "hover:from-orange-600 hover:to-red-700"
    },
    {
      icon: BookOpen,
      label: "Explore Resources",
      description: "Learn & grow",
      onClick: () => onSectionChange("resources"),
      gradient: "from-purple-500 to-pink-600",
      hoverGradient: "hover:from-purple-600 hover:to-pink-700"
    }
  ];

  return (
    <Card className="bento-card md:col-span-1 lg:col-span-1 bg-white border-brand-subtle/20 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl">
          <Star className="h-5 w-5 mr-2 text-amber-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              className={`w-full justify-start py-4 px-4 rounded-xl bg-gradient-to-r ${action.gradient} ${action.hoverGradient} text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden`}
              onClick={action.onClick}
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              
              <action.icon className="h-4 w-4 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold text-sm">{action.label}</span>
                <span className="text-xs opacity-90">{action.description}</span>
              </div>
              <Plus className="h-3 w-3 ml-auto opacity-80 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EnhancedQuickActionsCard;
