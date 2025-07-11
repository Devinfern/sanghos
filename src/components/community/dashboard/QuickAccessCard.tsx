
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Users, BookOpen, Plus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface QuickAccessCardProps {
  onSectionChange: (section: string) => void;
}

const QuickAccessCard = ({ onSectionChange }: QuickAccessCardProps) => {
  const quickActions = [
    {
      icon: MessageSquare,
      title: "Start Discussion",
      description: "Share your wellness journey",
      action: () => onSectionChange("discussions"),
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100"
    },
    {
      icon: Calendar,
      title: "Browse Events",
      description: "Find mindful gatherings",
      action: () => onSectionChange("events"),
      color: "bg-green-50 text-green-600 hover:bg-green-100"
    },
    {
      icon: Users,
      title: "Join Community",
      description: "Connect with others",
      action: () => onSectionChange("retreats"),
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100"
    },
    {
      icon: BookOpen,
      title: "Explore Resources",
      description: "Deepen your practice",
      action: () => onSectionChange("resources"),
      color: "bg-amber-50 text-amber-600 hover:bg-amber-100"
    }
  ];

  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className="w-full h-auto p-4 justify-start hover:shadow-sm transition-all duration-300 bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200 group"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg mr-3 transition-colors ${action.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900 text-sm">
                    {action.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    {action.description}
                  </div>
                </div>
                
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </Button>
            </motion.div>
          );
        })}

        {/* Create New Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-3 border-t border-gray-100"
        >
          <Button 
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-12 rounded-xl font-medium"
            onClick={() => onSectionChange("discussions")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessCard;
