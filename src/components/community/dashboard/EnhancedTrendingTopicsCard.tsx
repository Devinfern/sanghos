
import { TrendingUp, ArrowRight, Flame, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface EnhancedTrendingTopicsCardProps {
  onSectionChange: (section: string) => void;
}

const EnhancedTrendingTopicsCard = ({ onSectionChange }: EnhancedTrendingTopicsCardProps) => {
  const trendingTopics = [
    { 
      name: "Beginner Yoga", 
      icon: "🧘‍♀️", 
      count: 24, 
      growth: "+12%",
      isHot: true 
    },
    { 
      name: "Meditation Tips", 
      icon: "🧠", 
      count: 18, 
      growth: "+8%",
      isHot: false 
    },
    { 
      name: "Sound Healing", 
      icon: "🎵", 
      count: 12, 
      growth: "+15%",
      isHot: true 
    },
    { 
      name: "Breathwork", 
      icon: "💨", 
      count: 15, 
      growth: "+6%",
      isHot: false 
    },
    { 
      name: "Wellness Journey", 
      icon: "✨", 
      count: 31, 
      growth: "+20%",
      isHot: true 
    },
    { 
      name: "Retreat Planning", 
      icon: "🏔️", 
      count: 9, 
      growth: "+4%",
      isHot: false 
    }
  ];

  return (
    <Card className="bento-card md:col-span-2 lg:col-span-3 bg-gradient-to-br from-white via-brand-subtle/5 to-brand-primary/5 border-brand-subtle/20 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-2xl">
          <div className="flex items-center">
            <div className="relative">
              <TrendingUp className="h-6 w-6 mr-3 text-brand-primary" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-amber-400 animate-pulse" />
            </div>
            Trending Topics
          </div>
          <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 px-3 py-1">
            <Flame className="h-3 w-3 mr-1" />
            Hot
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-white/80 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer border border-brand-subtle/10 hover:border-brand-primary/30"
              onClick={() => onSectionChange("discussions")}
            >
              {topic.isHot && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {topic.icon}
                    </span>
                    <div>
                      <span className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                        {topic.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 text-xs"
                        >
                          {topic.count} posts
                        </Badge>
                        <span className="text-xs text-emerald-600 font-medium">
                          {topic.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
        
        <Button
          variant="outline"
          className="w-full mt-6 py-3 rounded-xl border-brand-primary/30 hover:bg-brand-primary hover:text-white transition-all duration-300 group"
          onClick={() => onSectionChange("discussions")}
        >
          Explore All Topics
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedTrendingTopicsCard;
