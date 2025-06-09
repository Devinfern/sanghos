
import { MessageSquare, Calendar, Users, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";

interface QuickStatsGridProps {
  currentEvents: any[];
}

const QuickStatsGrid = ({ currentEvents }: QuickStatsGridProps) => {
  const { posts } = useCommunityPosts("", "");

  // Safely handle undefined posts
  const postsCount = posts?.length || 0;
  const eventsCount = currentEvents?.length || 0;

  const quickStats = [
    { label: "Active Discussions", value: postsCount, icon: MessageSquare },
    { label: "Upcoming Events", value: eventsCount, icon: Calendar },
    { label: "Community Members", value: "2.4k", icon: Users },
    { label: "Resources", value: "156", icon: BookOpen }
  ];

  return (
    <div className="col-span-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bento-card hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-brand-subtle/20">
            <CardContent className="pt-6 pb-6 text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-brand-primary" />
              <div className="text-3xl font-bold text-brand-dark mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsGrid;
