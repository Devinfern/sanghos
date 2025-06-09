
import { Users, MessageSquare, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface EnhancedActiveMembersCardProps {
  members: any[];
  onSectionChange: (section: string) => void;
}

const EnhancedActiveMembersCard = ({ members, onSectionChange }: EnhancedActiveMembersCardProps) => {
  // Enhanced mock data with profile pictures and activity
  const activeMembersData = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=64&h=64&fit=crop&crop=face",
      lastActivity: "Active now",
      role: "Wellness Guide",
      posts: 12,
      isOnline: true,
      badge: "Top Contributor"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      lastActivity: "2 min ago",
      role: "Meditation Teacher",
      posts: 8,
      isOnline: true,
      badge: "Expert"
    },
    {
      id: 3,
      name: "Luna Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      lastActivity: "15 min ago",
      role: "Community Member",
      posts: 15,
      isOnline: false,
      badge: "Rising Star"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="overflow-hidden rounded-xl border border-brand-subtle/20 bg-gradient-to-br from-white to-brand-subtle/5"
    >
      <div className="bg-gradient-to-br from-brand-rose/90 to-brand-rose/70 backdrop-blur-xl p-5 rounded-t-xl">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Active Members
        </h3>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-b-xl">
        <div className="space-y-3">
          {activeMembersData.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-3 rounded-xl hover:bg-brand-subtle/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-brand-subtle/20"
              onClick={() => onSectionChange("members")}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300"
                  />
                  {member.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-brand-dark group-hover:text-brand-primary transition-colors">
                      {member.name}
                    </h4>
                    {member.badge && (
                      <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                        <Award className="h-3 w-3 mr-1" />
                        {member.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-1">{member.role}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {member.lastActivity}
                    </div>
                    <div className="flex items-center text-brand-primary">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {member.posts} posts
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-4 text-brand-dark hover:text-brand-primary hover:bg-brand-subtle/10 transition-colors"
          onClick={() => onSectionChange("members")}
        >
          View All Members
        </Button>
      </div>
    </motion.div>
  );
};

export default EnhancedActiveMembersCard;
