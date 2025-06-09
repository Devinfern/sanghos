
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface EnhancedCommunityNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const EnhancedCommunityNavigation = ({
  activeSection,
  onSectionChange
}: EnhancedCommunityNavigationProps) => {
  const sections = [
    { id: "dashboard", label: "Dashboard", count: null },
    { id: "discussions", label: "Discussions", count: 24 },
    { id: "retreats", label: "Retreats", count: 8 },
    { id: "events", label: "Events", count: 12 },
    { id: "resources", label: "Resources", count: 156 },
    { id: "members", label: "Members", count: "2.4k" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-b border-brand-subtle/20 bg-white/98 backdrop-blur-lg sticky top-16 z-30 shadow-sm"
    >
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center py-4 gap-4">
          {/* Enhanced Navigation Tabs */}
          <div className="flex overflow-x-auto no-scrollbar w-full lg:w-auto">
            <div className="flex space-x-1 bg-brand-subtle/10 p-1 rounded-xl">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className={cn(
                    "min-w-[100px] px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg relative",
                    activeSection === section.id 
                      ? "bg-white text-brand-primary shadow-sm border border-brand-primary/20" 
                      : "text-brand-slate hover:text-brand-dark hover:bg-white/60"
                  )}
                  onClick={() => onSectionChange(section.id)}
                >
                  <span>{section.label}</span>
                  {section.count && (
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "ml-2 text-xs px-1.5 py-0.5 border-0",
                        activeSection === section.id 
                          ? "bg-brand-primary/10 text-brand-primary" 
                          : "bg-brand-subtle/30 text-muted-foreground"
                      )}
                    >
                      {section.count}
                    </Badge>
                  )}
                  
                  {/* Active indicator */}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Search Bar - Removed redundant search */}
          <div className="relative w-full lg:w-auto min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Quick search..." 
              className="pl-10 pr-4 bg-white/80 border-brand-subtle/30 focus:border-brand-primary rounded-xl hover:bg-white transition-all duration-300 focus:shadow-sm"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedCommunityNavigation;
