
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CommunityNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const CommunityNavigation = ({
  activeSection,
  onSectionChange
}: CommunityNavigationProps) => {
  const sections = [
    { id: "dashboard", label: "Dashboard" },
    { id: "discussions", label: "Discussions" },
    { id: "retreats", label: "Retreats" },
    { id: "events", label: "Events" },
    { id: "resources", label: "Resources" },
    { id: "members", label: "Members" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-b border-brand-subtle/20 bg-white/95 backdrop-blur-md sticky top-16 z-30 shadow-sm"
    >
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
          <div className="flex overflow-x-auto no-scrollbar w-full md:w-auto">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className={cn(
                  "min-w-[100px] px-4 py-2 text-brand-slate hover:text-brand-dark transition-all duration-300",
                  activeSection === section.id 
                    ? "text-brand-primary font-medium border-b-2 border-brand-primary rounded-none bg-brand-primary/5" 
                    : ""
                )}
                onClick={() => onSectionChange(section.id)}
              >
                {section.label}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-auto min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Quick search..." 
              className="pl-10 pr-4 bg-transparent border-brand-subtle/30 focus:border-brand-primary rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityNavigation;
