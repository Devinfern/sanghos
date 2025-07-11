
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, MessageCircle, TrendingUp, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardRightSidebarProps {
  currentEvents: any[];
  trendingPosts: any[];
  onSectionChange: (section: string) => void;
}

const DashboardRightSidebar = ({ 
  currentEvents, 
  trendingPosts, 
  onSectionChange 
}: DashboardRightSidebarProps) => {
  const activeMembers = [
    { name: "Sarah Chen", avatar: "", status: "online", lastSeen: "2 min ago" },
    { name: "Mike Johnson", avatar: "", status: "online", lastSeen: "5 min ago" },
    { name: "Emma Wilson", avatar: "", status: "away", lastSeen: "1 hour ago" },
    { name: "David Kim", avatar: "", status: "online", lastSeen: "Just now" },
  ];

  const quickActions = [
    { 
      icon: MessageCircle, 
      label: "Start Discussion", 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      onClick: () => onSectionChange("discussions")
    },
    { 
      icon: Calendar, 
      label: "Book Session", 
      color: "text-green-600",
      bgColor: "bg-green-50",
      onClick: () => onSectionChange("events")
    },
    { 
      icon: Users, 
      label: "Find Members", 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      onClick: () => onSectionChange("members")
    },
  ];

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-brand-sand" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentEvents.slice(0, 3).map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center p-3 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer group"
                onClick={() => onSectionChange("events")}
              >
                <div className="h-12 w-12 bg-brand-primary/10 rounded-lg flex flex-col items-center justify-center mr-3 group-hover:bg-brand-primary/20 transition-colors">
                  <span className="text-xs font-medium text-brand-primary uppercase">
                    {event.date?.month || "Jan"}
                  </span>
                  <span className="text-sm font-bold text-brand-primary">
                    {event.date?.day || "15"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">
                    {event.title}
                  </h4>
                  <p className="text-xs text-gray-600">{event.time}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              </motion.div>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-brand-primary hover:text-brand-primary/80"
              onClick={() => onSectionChange("events")}
            >
              View All Events
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2 text-brand-primary" />
              Active Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer"
                onClick={() => onSectionChange("members")}
              >
                <div className="relative mr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-brand-primary/10 text-brand-primary text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                    member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500">{member.lastSeen}</p>
                </div>
              </motion.div>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-brand-primary hover:text-brand-primary/80"
              onClick={() => onSectionChange("members")}
            >
              View All Members
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-brand-rose" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto hover:bg-brand-subtle/20"
                    onClick={action.onClick}
                  >
                    <div className={`h-8 w-8 rounded-lg ${action.bgColor} flex items-center justify-center mr-3`}>
                      <Icon className={`h-4 w-4 ${action.color}`} />
                    </div>
                    <span className="font-medium text-gray-900">{action.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardRightSidebar;
