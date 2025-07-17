import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  MessageCircle, 
  Calendar, 
  Bookmark,
  TrendingUp,
  Users,
  Compass,
  Heart,
  Sparkles
} from "lucide-react";

interface CommunitySidebarProps {
  onCreatePost: () => void;
  onNavigate: (section: string) => void;
}

const CommunitySidebar = ({ onCreatePost, onNavigate }: CommunitySidebarProps) => {
  const quickActions = [
    { icon: Plus, label: "New Post", action: onCreatePost, variant: "default" as const },
    { icon: MessageCircle, label: "Join Discussion", action: () => onNavigate("discussions"), variant: "outline" as const },
    { icon: Calendar, label: "View Events", action: () => onNavigate("events"), variant: "outline" as const },
    { icon: Bookmark, label: "Saved Posts", action: () => onNavigate("saved"), variant: "outline" as const },
  ];

  const trendingTopics = [
    { name: "Mindful Mornings", count: 24, trend: "up" },
    { name: "Meditation Tips", count: 18, trend: "up" },
    { name: "Retreat Prep", count: 15, trend: "stable" },
    { name: "Daily Gratitude", count: 12, trend: "up" },
    { name: "Wellness Journey", count: 9, trend: "down" },
  ];

  const activeMembers = [
    { name: "Sarah M.", status: "meditating", avatar: "SM" },
    { name: "David L.", status: "online", avatar: "DL" },
    { name: "Emma K.", status: "in-retreat", avatar: "EK" },
    { name: "Michael R.", status: "online", avatar: "MR" },
  ];

  const upcomingEvents = [
    { title: "Morning Meditation", time: "8:00 AM", type: "virtual" },
    { title: "Nature Walk", time: "2:00 PM", type: "local" },
    { title: "Group Sharing", time: "6:00 PM", type: "virtual" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "meditating": return "bg-brand-primary";
      case "in-retreat": return "bg-brand-sand";
      default: return "bg-gray-400";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === "down") return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
    return <div className="w-3 h-3 rounded-full bg-gray-300" />;
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
        <h3 className="font-semibold text-brand-dark mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-primary" />
          Quick Actions
        </h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant={action.variant}
                onClick={action.action}
                className="w-full justify-start gap-3 h-auto py-3"
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Trending Topics */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
        <h3 className="font-semibold text-brand-dark mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand-sand" />
          Trending Topics
        </h3>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {getTrendIcon(topic.trend)}
                <span className="text-sm font-medium text-brand-dark">{topic.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {topic.count}
              </Badge>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Active Members */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
        <h3 className="font-semibold text-brand-dark mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-sage-600" />
          Active Now
        </h3>
        <div className="space-y-3">
          {activeMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-subtle/20 transition-colors cursor-pointer"
            >
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs bg-brand-subtle text-brand-dark">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
              </div>
              <div>
                <div className="text-sm font-medium text-brand-dark">{member.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{member.status.replace('-', ' ')}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
        <h3 className="font-semibold text-brand-dark mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-rose" />
          Today's Schedule
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg border border-brand-subtle/30 bg-white/50"
            >
              <div>
                <div className="text-sm font-medium text-brand-dark">{event.title}</div>
                <div className="text-xs text-muted-foreground">{event.time}</div>
              </div>
              <Badge 
                variant={event.type === "virtual" ? "secondary" : "outline"}
                className="text-xs"
              >
                {event.type}
              </Badge>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Personal Activity Summary */}
      <Card className="p-6 bg-gradient-to-br from-brand-primary/5 to-brand-subtle/10 border-0 shadow-sm">
        <h3 className="font-semibold text-brand-dark mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4 text-brand-rose" />
          Your Journey
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Posts shared</span>
            <span className="font-medium text-brand-dark">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Days active</span>
            <span className="font-medium text-brand-dark">23</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Events joined</span>
            <span className="font-medium text-brand-dark">5</span>
          </div>
          <div className="pt-2 border-t border-brand-subtle/20">
            <div className="text-xs text-center text-muted-foreground">
              Keep up the great progress! 🌱
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommunitySidebar;