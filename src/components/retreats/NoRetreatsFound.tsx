
import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NoRetreatsFoundProps {
  resetFilters: () => void;
  loadingError?: boolean;
}

const NoRetreatsFound: React.FC<NoRetreatsFoundProps> = ({ resetFilters, loadingError = false }) => {
  return (
    <Card className="text-center py-12 my-8 bg-white shadow-sm">
      <CardContent className="pt-0">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-sage-100 p-4 mb-4">
            <Info className="h-6 w-6 text-sage-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">No retreats found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {loadingError 
              ? "There was an issue loading some retreats. Some external event sources might be temporarily unavailable."
              : "We couldn't find any retreats matching your search criteria. Try adjusting your filters or search query."
            }
          </p>
          <Button 
            variant="default" 
            onClick={resetFilters}
          >
            Reset filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoRetreatsFound;
