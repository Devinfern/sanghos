
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardLeftSidebarProps {
  onSectionChange: (section: string) => void;
}

const DashboardLeftSidebar = ({ onSectionChange }: DashboardLeftSidebarProps) => {
  const resources = [
    {
      icon: Sparkles,
      title: "Beginners Guide",
      subtitle: "Getting started",
      color: "text-brand-rose",
      bgColor: "bg-brand-rose/10",
      onClick: () => onSectionChange("resources")
    },
    {
      icon: BookOpen,
      title: "Wellness Library",
      subtitle: "Research & articles",
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
      onClick: () => onSectionChange("resources")
    },
    {
      icon: Calendar,
      title: "Event Calendar",
      subtitle: "Upcoming gatherings",
      color: "text-brand-sand",
      bgColor: "bg-brand-sand/10",
      onClick: () => onSectionChange("events")
    }
  ];

  return (
    <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-brand-primary" />
          Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center p-3 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer group"
              onClick={resource.onClick}
            >
              <div className={`h-10 w-10 rounded-full ${resource.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`h-5 w-5 ${resource.color}`} />
              </div>
              <div className="ml-3">
                <p className="font-medium text-sm text-gray-900">{resource.title}</p>
                <p className="text-xs text-gray-600">{resource.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default DashboardLeftSidebar;
