
import React from "react";
import { Badge } from "@/components/ui/badge";
import SanghosIcon from "@/components/SanghosIcon";

interface RetreatResultsHeaderProps {
  filteredCount: number;
  activeTab: string;
  isLoadingEvents: boolean;
}

const RetreatResultsHeader: React.FC<RetreatResultsHeaderProps> = ({
  filteredCount,
  activeTab,
  isLoadingEvents
}) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="font-medium">
          Results
        </p>
        <Badge variant="outline" className="bg-white text-muted-foreground">
          {isLoadingEvents ? '...' : 
            `${filteredCount} ${filteredCount === 1 ? 'retreat' : 'retreats'}`
          }
        </Badge>
      </div>
      
      {activeTab === "sanghos" && (
        <div className="flex items-center text-sm text-muted-foreground">
          <SanghosIcon className="h-4 w-4 mr-1 text-sage-600" />
          <span>Sanghos organized retreats</span>
        </div>
      )}
      {activeTab === "thirdparty" && (
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Partner retreats</span>
        </div>
      )}
    </div>
  );
};

export default RetreatResultsHeader;
