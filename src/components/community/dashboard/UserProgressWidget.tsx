
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, MessageSquare, Calendar, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UserProgressWidget = () => {
  // Mock user progress data - in real app this would come from API
  const userStats = {
    eventsAttended: 3,
    discussionsStarted: 7,
    commentsPosted: 24,
    retreatsJoined: 1,
    weeklyGoal: 5,
    currentStreak: 12
  };

  const achievements = [
    { name: "Community Builder", icon: Users, color: "text-blue-500" },
    { name: "Discussion Starter", icon: MessageSquare, color: "text-green-500" },
    { name: "Event Enthusiast", icon: Calendar, color: "text-purple-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="overflow-hidden border-brand-subtle/20 bg-gradient-to-br from-white to-brand-subtle/5">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-brand-dark flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-amber-500" />
              Your Journey
            </h3>
            <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/30">
              {userStats.currentStreak} day streak
            </Badge>
          </div>

          {/* Weekly Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Weekly Activity Goal</span>
              <span className="font-medium text-brand-dark">{userStats.eventsAttended}/{userStats.weeklyGoal}</span>
            </div>
            <Progress 
              value={(userStats.eventsAttended / userStats.weeklyGoal) * 100} 
              className="h-2"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-xl bg-brand-subtle/10 hover:bg-brand-subtle/20 transition-colors">
              <div className="text-2xl font-bold text-brand-primary">{userStats.discussionsStarted}</div>
              <div className="text-xs text-muted-foreground">Discussions</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-brand-sand/10 hover:bg-brand-sand/20 transition-colors">
              <div className="text-2xl font-bold text-brand-sand">{userStats.commentsPosted}</div>
              <div className="text-xs text-muted-foreground">Comments</div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-brand-dark">Recent Achievements</h4>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/80 border border-brand-subtle/20 text-xs"
                >
                  <achievement.icon className={`h-3 w-3 ${achievement.color}`} />
                  <span className="text-muted-foreground">{achievement.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending indicator */}
          <div className="flex items-center text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
            <TrendingUp className="h-3 w-3 mr-1" />
            You're more active than 78% of members this week!
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProgressWidget;
