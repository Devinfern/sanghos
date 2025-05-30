
import { TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrendingTopicsCardProps {
  onSectionChange: (section: string) => void;
}

const TrendingTopicsCard = ({ onSectionChange }: TrendingTopicsCardProps) => {
  const topicSuggestions = [
    { name: "Beginner Yoga", icon: "🧘‍♀️", count: 24 },
    { name: "Meditation Tips", icon: "🧠", count: 18 },
    { name: "Sound Healing", icon: "🎵", count: 12 },
    { name: "Breathwork", icon: "💨", count: 15 },
    { name: "Wellness Journey", icon: "✨", count: 31 },
    { name: "Retreat Planning", icon: "🏔️", count: 9 }
  ];

  return (
    <Card className="bento-card md:col-span-2 lg:col-span-3 bg-gradient-soft border-brand-subtle/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-2xl">
          <TrendingUp className="h-6 w-6 mr-3 text-brand-primary" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicSuggestions.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-white/80 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer border border-brand-subtle/10"
              onClick={() => onSectionChange("discussions")}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{topic.icon}</span>
                <span className="font-medium text-brand-dark">{topic.name}</span>
              </div>
              <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
                {topic.count}
              </Badge>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-6 py-3 rounded-xl border-brand-primary/30 hover:bg-brand-primary hover:text-white transition-colors"
          onClick={() => onSectionChange("discussions")}
        >
          Explore All Topics
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingTopicsCard;
