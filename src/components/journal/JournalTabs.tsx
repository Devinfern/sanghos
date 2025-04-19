
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Clock, Zap } from "lucide-react";

interface JournalTabsProps {
  hasRecommendations: boolean;
}

const JournalTabs = ({ hasRecommendations }: JournalTabsProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <TabsList className="grid grid-cols-3 gap-4 p-1 bg-transparent">
        <TabsTrigger
          value="write"
          className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white p-3 shadow-md hover:bg-sage-50 data-[state=active]:bg-sage-700 data-[state=active]:text-white"
        >
          <Pencil className="h-5 w-5" />
          <span className="text-sm font-medium">Write</span>
        </TabsTrigger>
        <TabsTrigger
          value="history"
          className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white p-3 shadow-md hover:bg-sage-50 data-[state=active]:bg-sage-700 data-[state=active]:text-white"
        >
          <Clock className="h-5 w-5" />
          <span className="text-sm font-medium">History</span>
        </TabsTrigger>
        <TabsTrigger
          value="recommendations"
          disabled={!hasRecommendations}
          className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white p-3 shadow-md hover:bg-sage-50 data-[state=active]:bg-sage-700 data-[state=active]:text-white disabled:opacity-50 disabled:cursor-not-allowed my-0 py-[14px]"
        >
          <Zap className="h-5 w-5" />
          <span className="text-sm font-medium">Local Events</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default JournalTabs;
