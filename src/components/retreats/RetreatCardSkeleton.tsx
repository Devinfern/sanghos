
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface RetreatCardSkeletonProps {
  viewMode?: "grid" | "list";
}

const RetreatCardSkeleton: React.FC<RetreatCardSkeletonProps> = ({ viewMode = "grid" }) => {
  const isList = viewMode === "list";

  return (
    <div className={cn(
      "bg-white rounded-xl overflow-hidden shadow-sm border border-sage-100/50",
      isList ? "flex flex-col md:flex-row w-full" : "flex flex-col h-full"
    )}>
      <div className={cn(
        "relative overflow-hidden",
        isList ? "md:w-2/5 h-60 md:h-auto" : "h-52"
      )}>
        <Skeleton className="w-full h-full" />
      </div>
      
      <div className={cn(
        "flex flex-col p-5",
        isList ? "md:w-3/5" : "",
        "flex-grow justify-between"
      )}>
        <div className="space-y-3 mb-auto">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />

          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap text-sm text-gray-500 gap-y-2 mb-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetreatCardSkeleton;
