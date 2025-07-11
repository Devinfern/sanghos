
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Sparkles, Users, MessageCircle, MapPin, CheckSquare, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardLeftSidebarProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
}

const DashboardLeftSidebar = ({ onSectionChange, activeSection }: DashboardLeftSidebarProps) => {
  const resources = [
    {
      icon: Sparkles,
      title: "Beginners Guide",
      subtitle: "Getting started",
      color: "text-brand-rose",
      bgColor: "bg-brand-rose/10",
      section: "resources"
    },
    {
      icon: BookOpen,
      title: "Wellness Library",
      subtitle: "Research & articles",
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
      section: "resources"
    },
    {
      icon: CheckSquare,
      title: "Retreat Preparation",
      subtitle: "Checklists & guides",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      section: "preparation"
    },
    {
      icon: Heart,
      title: "Connect with Fellow Retreaters",
      subtitle: "Find your retreat companions",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      section: "connections"
    },
    {
      icon: MapPin,
      title: "Retreat Centers",
      subtitle: "Find locations",
      color: "text-brand-sand",
      bgColor: "bg-brand-sand/10",
      section: "retreat-centers"
    },
    {
      icon: Calendar,
      title: "Retreats",
      subtitle: "Your retreat journey",
      color: "text-green-600",
      bgColor: "bg-green-50",
      section: "retreats"
    },
    {
      icon: MessageCircle,
      title: "Discussions",
      subtitle: "Community chat",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      section: "discussions"
    }
  ];

  return (
    <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-brand-primary" />
          Your Retreat Journey
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          const isActive = activeSection === resource.section;
          
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer group ${
                isActive 
                  ? 'bg-brand-primary/10 border border-brand-primary/20' 
                  : 'hover:bg-brand-subtle/20'
              }`}
              onClick={() => onSectionChange(resource.section)}
            >
              <div className={`h-10 w-10 rounded-full ${
                isActive ? 'bg-brand-primary/20' : resource.bgColor
              } flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`h-5 w-5 ${
                  isActive ? 'text-brand-primary' : resource.color
                }`} />
              </div>
              <div className="ml-3">
                <p className={`font-medium text-sm ${
                  isActive ? 'text-brand-primary' : 'text-gray-900'
                }`}>
                  {resource.title}
                </p>
                <p className="text-xs text-gray-600">{resource.subtitle}</p>
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto h-2 w-2 bg-brand-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default DashboardLeftSidebar;
