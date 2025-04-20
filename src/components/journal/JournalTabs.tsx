
import { Pencil, Clock, Zap } from "lucide-react";
import { Dock, DockItem, DockIcon, DockLabel } from "@/components/ui/dock";

interface JournalTabsProps {
  hasRecommendations: boolean;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const JournalTabs = ({
  hasRecommendations,
  activeTab,
  onTabChange,
}: JournalTabsProps) => {
  const tabs = [
    {
      value: "write",
      label: "Write",
      icon: <Pencil className="h-full w-full text-sage-600 dark:text-sage-300" />,
    },
    {
      value: "history",
      label: "History",
      icon: <Clock className="h-full w-full text-sage-600 dark:text-sage-300" />,
    },
    {
      value: "recommendations",
      label: "Local Events",
      icon: <Zap className="h-full w-full text-sage-600 dark:text-sage-300" />,
      disabled: !hasRecommendations,
    },
  ];

  return (
    <div className="flex items-center justify-center mb-8 md:mb-10 h-[90px] md:h-[95px]">
      <Dock
        className="bg-sage-50/90 backdrop-blur-lg border border-sage-200/30 px-20 md:px-24 py-6 rounded-2xl shadow-lg"
        distance={50}
        magnification={30}
        spring={{
          mass: 0.4,
          stiffness: 350,
          damping: 40,
        }}
      >
        {tabs.map((tab) => (
          <DockItem
            key={tab.value}
            className={`aspect-square rounded-full transition-all duration-200 cursor-pointer group mx-5 md:mx-7 w-[54px] h-[54px] md:w-[60px] md:h-[60px] ${
              activeTab === tab.value
                ? 'bg-white ring-2 ring-brand-primary shadow-md border border-sage-200'
                : tab.disabled
                  ? 'bg-sage-100/60 cursor-not-allowed opacity-60'
                  : 'bg-white/80 hover:bg-white shadow'
            }`}
            onClick={() => !tab.disabled && onTabChange(tab.value)}
          >
            <DockLabel className="mb-3 text-sage-700 group-hover:text-brand-primary text-xs md:text-sm">{tab.label}</DockLabel>
            <DockIcon>{tab.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
};

export default JournalTabs;
