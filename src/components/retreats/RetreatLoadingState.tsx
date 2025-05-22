
import React from "react";
import { Loader2 } from "lucide-react";

interface RetreatLoadingStateProps {
  message?: string;
}

const RetreatLoadingState: React.FC<RetreatLoadingStateProps> = ({ 
  message = "Loading retreats from InsightLA..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-10 w-10 text-sage-600 animate-spin mb-4" />
      <p className="text-lg text-sage-600">{message}</p>
      <p className="text-sm text-sage-400 mt-2">
        This may take a moment while we connect to external data sources
      </p>
    </div>
  );
};

export default RetreatLoadingState;
