
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Users, 
  Calendar, 
  Star, 
  TrendingUp,
  Award,
  Clock
} from "lucide-react";

interface UserDashboardWidgetProps {
  user: {
    name: string;
    avatar: string;
    joinedDate: string;
    role: string;
  };
  stats: {
    postsCount: number;
    commentsCount: number;
    likesReceived: number;
    retreatsJoined: number;
    daysUntilRetreat?: number;
  };
}

const UserDashboardWidget = ({ user, stats }: UserDashboardWidgetProps) => {
  const engagementScore = Math.min(100, (stats.postsCount * 10 + stats.commentsCount * 3 + stats.likesReceived) / 2);
  
  const achievements = [
    { id: 1, name: "First Post", icon: MessageCircle, earned: stats.postsCount >= 1 },
    { id: 2, name: "Community Helper", icon: Users, earned: stats.commentsCount >= 10 },
    { id: 3, name: "Popular Contributor", icon: Star, earned: stats.likesReceived >= 20 },
    { id: 4, name: "Retreat Veteran", icon: Calendar, earned: stats.retreatsJoined >= 3 },
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <div className="space-y-4">
      {/* User Profile Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.role}</p>
              <p className="text-xs text-muted-foreground">
                Member since {new Date(user.joinedDate).getFullYear()}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Countdown to Retreat */}
          {stats.daysUntilRetreat && (
            <div className="bg-brand-peach/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-brand-primary" />
                <span className="text-sm font-medium">Your Retreat</span>
              </div>
              <p className="text-2xl font-bold text-brand-primary">
                {stats.daysUntilRetreat} days
              </p>
              <p className="text-xs text-muted-foreground">until your next retreat</p>
            </div>
          )}

          {/* Community Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold text-brand-primary">{stats.postsCount}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold text-brand-primary">{stats.commentsCount}</p>
              <p className="text-xs text-muted-foreground">Comments</p>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold text-brand-primary">{stats.likesReceived}</p>
              <p className="text-xs text-muted-foreground">Likes</p>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold text-brand-primary">{stats.retreatsJoined}</p>
              <p className="text-xs text-muted-foreground">Retreats</p>
            </div>
          </div>

          {/* Engagement Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Community Engagement</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-sm text-green-500">{Math.round(engagementScore)}%</span>
              </div>
            </div>
            <Progress value={engagementScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {earnedAchievements.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {earnedAchievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-2 p-2 bg-brand-peach/20 rounded-lg"
                  >
                    <Icon className="h-4 w-4 text-brand-primary" />
                    <span className="text-xs font-medium text-brand-dark">
                      {achievement.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4">
              <Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Start engaging to earn achievements!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboardWidget;
