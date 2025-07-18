
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, MessageCircle, TrendingUp, UserCheck, MapPin, Coffee } from "lucide-react";
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
  const retreatAlumni = [
    { 
      name: "Sarah Chen", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=64&h=64&fit=crop&crop=face", 
      retreatName: "Mindful Mountains", 
      location: "Colorado",
      completedDate: "Dec 2024",
      isOnline: true
    },
    { 
      name: "Marcus Johnson", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face", 
      retreatName: "Desert Awakening", 
      location: "Arizona",
      completedDate: "Nov 2024",
      isOnline: true
    },
    { 
      name: "Luna Rodriguez", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face", 
      retreatName: "Ocean Serenity", 
      location: "California",
      completedDate: "Oct 2024",
      isOnline: false
    },
  ];

  const practiceGroups = [
    {
      name: "Morning Meditation Circle",
      members: 24,
      nextSession: "Tomorrow 7:00 AM",
      type: "Daily Practice"
    },
    {
      name: "Integration Support Group",
      members: 16,
      nextSession: "Friday 6:00 PM",
      type: "Weekly Support"
    },
    {
      name: "Nature Connection",
      members: 12,
      nextSession: "Saturday 9:00 AM",
      type: "Outdoor Practice"
    }
  ];

  const quickActions = [
    { 
      icon: UserCheck, 
      label: "Find Retreat Buddy", 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      onClick: () => onSectionChange("connections")
    },
    { 
      icon: Users, 
      label: "Join Practice Group", 
      color: "text-green-600",
      bgColor: "bg-green-50",
      onClick: () => onSectionChange("practice-groups")
    },
    { 
      icon: Coffee, 
      label: "Local Chapter Meetup", 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      onClick: () => onSectionChange("local-chapters")
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

      {/* Retreat Alumni */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2 text-brand-primary" />
              Retreat Alumni
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {retreatAlumni.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer"
                onClick={() => onSectionChange("alumni")}
              >
                <div className="relative mr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-brand-primary/10 text-brand-primary text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {member.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-600">{member.retreatName}</p>
                  <p className="text-xs text-gray-500">{member.location} • {member.completedDate}</p>
                </div>
              </motion.div>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-brand-primary hover:text-brand-primary/80"
              onClick={() => onSectionChange("alumni")}
            >
              View Alumni Network
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Practice Groups */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-brand-rose" />
              Practice Groups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {practiceGroups.map((group, index) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-3 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer"
                onClick={() => onSectionChange("practice-groups")}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900">
                    {group.name}
                  </h4>
                  <span className="text-xs bg-brand-subtle/50 text-brand-primary px-2 py-1 rounded-full">
                    {group.members}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{group.type}</p>
                <p className="text-xs text-gray-500">{group.nextSession}</p>
              </motion.div>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-brand-primary hover:text-brand-primary/80"
              onClick={() => onSectionChange("practice-groups")}
            >
              View All Groups
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-brand-rose" />
              Community Actions
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
