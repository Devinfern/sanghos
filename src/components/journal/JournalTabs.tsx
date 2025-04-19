
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Clock, Zap } from "lucide-react";
import { Dock, DockItem, DockIcon, DockLabel } from "@/components/ui/dock";

interface JournalTabsProps {
  hasRecommendations: boolean;
}

const JournalTabs = ({ hasRecommendations }: JournalTabsProps) => {
  const tabs = [
    {
      value: "write",
      label: "Write",
      icon: <Pencil className="h-full w-full text-sage-600 dark:text-sage-300" />
    },
    {
      value: "history",
      label: "History",
      icon: <Clock className="h-full w-full text-sage-600 dark:text-sage-300" />
    },
    {
      value: "recommendations",
      label: "Local Events",
      icon: <Zap className="h-full w-full text-sage-600 dark:text-sage-300" />,
      disabled: !hasRecommendations
    }
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      <Dock className="bg-sage-50/80 backdrop-blur-sm border border-sage-200/30">
        {tabs.map((tab) => (
          <DockItem
            key={tab.value}
            className={`aspect-square rounded-full ${
              tab.disabled 
                ? 'bg-sage-100/50 cursor-not-allowed' 
                : 'bg-white/80 hover:bg-white shadow-sm'
            }`}
          >
            <DockLabel>{tab.label}</DockLabel>
            <DockIcon>{tab.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
};

export default JournalTabs;
