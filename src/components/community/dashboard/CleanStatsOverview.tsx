
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";

interface CleanStatsOverviewProps {
  currentEvents: any[];
}

const CleanStatsOverview = ({ currentEvents }: CleanStatsOverviewProps) => {
  const stats = [
    {
      icon: Calendar,
      label: "Upcoming Events",
      value: currentEvents.length.toString(),
      subtitle: "This month",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Users,
      label: "Active Members",
      value: "2,847",
      subtitle: "Online now: 342",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: MessageSquare,
      label: "Discussions",
      value: "156",
      subtitle: "New today",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Star,
      label: "Your Progress",
      value: "78%",
      subtitle: "This week",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.subtitle}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CleanStatsOverview;
