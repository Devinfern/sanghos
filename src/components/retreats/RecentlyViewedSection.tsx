
import React from "react";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RetreatCard from "@/components/RetreatCard";
import { useRetreatContext } from "@/contexts/RetreatContext";

const RecentlyViewedSection: React.FC = () => {
  const { recentlyViewed } = useRetreatContext();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Clock className="h-5 w-5 mr-2 text-sage-600" />
          Recently Viewed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {recentlyViewed.slice(0, 5).map((retreat, index) => (
            <div key={retreat.id} className="transform scale-90">
              <RetreatCard 
                retreat={retreat} 
                index={index}
                comingSoon={retreat.isSanghos}
                viewMode="grid"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentlyViewedSection;
