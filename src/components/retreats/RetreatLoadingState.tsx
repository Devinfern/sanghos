
import React from "react";
import { Loader2 } from "lucide-react";

const RetreatLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-10 w-10 text-sage-600 animate-spin mb-4" />
      <p className="text-lg text-sage-600">Loading retreats from InsightLA...</p>
    </div>
  );
};

export default RetreatLoadingState;
