
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Star, ChevronRight, Flame } from "lucide-react";
import { motion } from "framer-motion";

interface CommunityHighlightsProps {
  trendingPosts: any[];
  onSectionChange: (section: string) => void;
}

const CommunityHighlights = ({ trendingPosts, onSectionChange }: CommunityHighlightsProps) => {
  const highlights = [
    {
      type: "trending",
      title: "Meditation for Anxiety Relief",
      author: "Dr. Sarah Park",
      engagement: "2.3k views",
      timeframe: "this week",
      category: "Wellness",
      isHot: true
    },
    {
      type: "popular",
      title: "Community Yoga Challenge",
      author: "Wellness Team",
      engagement: "847 participants",
      timeframe: "ongoing",
      category: "Events",
      isHot: false
    },
    {
      type: "featured",
      title: "Mindful Eating Guide",
      author: "Emma Johnson",
      engagement: "1.8k saves",
      timeframe: "featured",
      category: "Nutrition",
      isHot: false
    }
  ];

  const weeklyStats = [
    { label: "New Members", value: "142", change: "+23%" },
    { label: "Active Discussions", value: "89", change: "+15%" },
    { label: "Events Hosted", value: "12", change: "+8%" }
  ];

  return (
    <div className="space-y-6">
      {/* Community Highlights */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-primary" />
              Trending
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
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onSectionChange("discussions")}
            >
              <div className="p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200 bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.isHot && (
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500" />
                      </div>
                    )}
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-brand-subtle/50 text-brand-primary border-0"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500 capitalize">
                    {item.timeframe}
                  </span>
                </div>
                
                <h4 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h4>
                
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>by {item.author}</span>
                  <span className="font-medium">{item.engagement}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            This Week
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {weeklyStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {stat.label}
                </div>
                <div className="text-2xl font-bold text-brand-primary">
                  {stat.value}
                </div>
              </div>
              <div className="text-right">
                <Badge 
                  variant="secondary" 
                  className="bg-green-100 text-green-700 border-0 text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityHighlights;
