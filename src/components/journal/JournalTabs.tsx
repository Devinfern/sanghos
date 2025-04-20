
import { Pencil, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface JournalTabsProps {
  hasRecommendations: boolean;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TABS = [
  {
    value: "write",
    label: "Write",
    icon: Pencil,
  },
  {
    value: "history",
    label: "History",
    icon: Clock,
  },
  {
    value: "recommendations",
    label: "Local Events",
    icon: Zap,
  },
];

const JournalTabs = ({
  hasRecommendations,
  activeTab,
  onTabChange,
}: JournalTabsProps) => {
  // Dynamically calculate width/offset for underline
  // (Simple method works with flexible layouts)
  const activeIdx = TABS.findIndex(tab => tab.value === activeTab);
  const actualTabs = TABS.map((tab, i) =>
    tab.value === "recommendations"
      ? { ...tab, disabled: !hasRecommendations }
      : tab
  );

  return (
    <nav
      className="relative flex justify-center items-center w-full max-w-lg mx-auto px-2 pt-2 pb-3 rounded-xl bg-white/80 shadow border border-sage-100"
      aria-label="Journal Tabs"
    >
      <div className="flex w-full">
        {actualTabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-2 py-3 px-3 transition font-semibold outline-none text-base rounded-lg",
                tab.disabled
                  ? "text-sage-400 cursor-not-allowed opacity-60"
                  : isActive
                  ? "text-brand-primary"
                  : "text-sage-700 hover:bg-brand-primary/10 hover:text-brand-primary"
              )}
              tabIndex={tab.disabled ? -1 : 0}
              type="button"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              role="tab"
              onClick={() => !tab.disabled && onTabChange(tab.value)}
            >
              <Icon
                size={20}
                className={
                  isActive
                    ? "text-brand-primary mr-1"
                    : tab.disabled
                    ? "text-sage-300 mr-1"
                    : "text-sage-500 mr-1"
                }
                aria-hidden="true"
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      {/* Animated Underline Indicator */}
      <div className="absolute bottom-0 left-2 right-2 h-0 flex">
        <motion.div
          layout
          layoutId="journal-tab-underline"
          className="bg-brand-primary h-[3px] rounded-full"
          style={{
            width: `calc((100% - 0.5rem) / ${TABS.length})`,
            marginLeft: `calc(${activeIdx} * ((100% - 0.5rem) / ${TABS.length}))`,
            boxShadow: "0 1px 8px 0 rgba(155, 135, 245, 0.10)",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        />
      </div>
    </nav>
  );
};

export default JournalTabs;

