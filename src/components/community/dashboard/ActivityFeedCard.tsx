
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Users, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface ActivityFeedCardProps {
  onSectionChange: (section: string) => void;
}

const ActivityFeedCard = ({ onSectionChange }: ActivityFeedCardProps) => {
  const activities = [
    {
      id: 1,
      type: "discussion",
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        initials: "SC"
      },
      action: "started a discussion in",
      target: "Mindful Living",
      title: "Morning meditation practices that changed my life",
      timestamp: "2 hours ago",
      engagement: { likes: 12, comments: 5 },
      badge: "New"
    },
    {
      id: 2,
      type: "event",
      user: {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        initials: "MJ"
      },
      action: "joined the event",
      target: "Weekend Retreat",
      title: "Finding Inner Peace Through Nature",
      timestamp: "4 hours ago",
      engagement: { attendees: 23 },
      badge: "Popular"
    },
    {
      id: 3,
      type: "achievement",
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        initials: "EW"
      },
      action: "completed",
      target: "Yoga Basics Course",
      title: "30-day mindfulness challenge finished!",
      timestamp: "6 hours ago",
      engagement: { progress: "100%" },
      badge: "Achievement"
    },
    {
      id: 4,
      type: "resource",
      user: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        initials: "DK"
      },
      action: "shared a resource in",
      target: "Wellness Library",
      title: "The Science of Meditation: Research-backed benefits",
      timestamp: "8 hours ago",
      engagement: { saves: 18, views: 124 },
      badge: "Resource"
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "New": return "bg-green-100 text-green-700";
      case "Popular": return "bg-blue-100 text-blue-700";
      case "Achievement": return "bg-purple-100 text-purple-700";
      case "Resource": return "bg-amber-100 text-amber-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "discussion": return MessageSquare;
      case "event": return Users;
      case "achievement": return Heart;
      case "resource": return MessageSquare;
      default: return MessageSquare;
    }
  };

  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Recent Activity
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onSectionChange("discussions")}
            className="text-brand-primary hover:text-brand-primary/80"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onSectionChange("discussions")}
            >
              <div className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="bg-brand-subtle text-brand-primary text-sm">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-gray-900 text-sm">
                        {activity.user.name}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {activity.action}
                      </span>
                      <span className="font-medium text-brand-primary text-sm">
                        {activity.target}
                      </span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getBadgeColor(activity.badge)} border-0`}
                    >
                      {activity.badge}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-800 mb-2 line-clamp-2">
                    {activity.title}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.timestamp}</span>
                      </div>
                      
                      {activity.engagement.likes && (
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{activity.engagement.likes}</span>
                        </div>
                      )}
                      
                      {activity.engagement.comments && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{activity.engagement.comments}</span>
                        </div>
                      )}
                      
                      {activity.engagement.attendees && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{activity.engagement.attendees}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-brand-subtle/50 transition-colors">
                      <Icon className="h-3 w-3 text-gray-600 group-hover:text-brand-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ActivityFeedCard;
