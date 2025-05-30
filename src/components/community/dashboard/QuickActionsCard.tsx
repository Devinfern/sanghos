
import { Star, MessageSquare, Calendar, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionsCardProps {
  onSectionChange: (section: string) => void;
}

const QuickActionsCard = ({ onSectionChange }: QuickActionsCardProps) => {
  return (
    <Card className="bento-card md:col-span-1 lg:col-span-1 bg-white border-brand-subtle/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl">
          <Star className="h-5 w-5 mr-2 text-brand-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          className="w-full justify-start py-3 px-4 rounded-xl bg-brand-subtle/10 hover:bg-brand-primary hover:text-white transition-colors text-brand-dark border-0"
          variant="outline"
          onClick={() => onSectionChange("discussions")}
        >
          <MessageSquare className="h-4 w-4 mr-3" />
          Start Discussion
        </Button>
        <Button
          className="w-full justify-start py-3 px-4 rounded-xl bg-brand-subtle/10 hover:bg-brand-primary hover:text-white transition-colors text-brand-dark border-0"
          variant="outline"
          onClick={() => onSectionChange("events")}
        >
          <Calendar className="h-4 w-4 mr-3" />
          Browse Events
        </Button>
        <Button
          className="w-full justify-start py-3 px-4 rounded-xl bg-brand-subtle/10 hover:bg-brand-primary hover:text-white transition-colors text-brand-dark border-0"
          variant="outline"
          onClick={() => onSectionChange("retreats")}
        >
          <Users className="h-4 w-4 mr-3" />
          Join Retreat
        </Button>
        <Button
          className="w-full justify-start py-3 px-4 rounded-xl bg-brand-subtle/10 hover:bg-brand-primary hover:text-white transition-colors text-brand-dark border-0"
          variant="outline"
          onClick={() => onSectionChange("resources")}
        >
          <BookOpen className="h-4 w-4 mr-3" />
          Explore Resources
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
