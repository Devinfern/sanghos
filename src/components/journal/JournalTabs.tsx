
import { Pencil, Clock, Zap } from "lucide-react";
import { Dock, DockItem, DockIcon, DockLabel } from "@/components/ui/dock";

interface JournalTabsProps {
  hasRecommendations: boolean;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const JournalTabs = ({ hasRecommendations, activeTab, onTabChange }: JournalTabsProps) => {
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
    <div className="flex items-center justify-center mb-8 h-[150px]">
      <Dock 
        className="bg-sage-50/80 backdrop-blur-sm border border-sage-200/30 px-12 py-4 rounded-2xl" 
        distance={160} 
        magnification={100}
        spring={{ mass: 0.1, stiffness: 150, damping: 12 }}
      >
        {tabs.map((tab) => (
          <DockItem
            key={tab.value}
            className={`aspect-square rounded-full cursor-pointer ${
              activeTab === tab.value
                ? 'bg-white shadow-md border border-sage-200/50'
                : tab.disabled
                  ? 'bg-sage-100/50 cursor-not-allowed opacity-60'
                  : 'bg-white/80 hover:bg-white shadow-sm'
            }`}
            onClick={() => !tab.disabled && onTabChange(tab.value)}
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
