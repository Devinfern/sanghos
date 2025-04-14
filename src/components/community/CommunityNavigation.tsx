
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CommunityNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const CommunityNavigation = ({
  activeSection,
  onSectionChange
}: CommunityNavigationProps) => {
  const sections = [
    { id: "discussions", label: "Discussions" },
    { id: "events", label: "Events" },
    { id: "resources", label: "Resources" },
    { id: "members", label: "Members" }
  ];

  return (
    <div className="border-b border-brand-subtle/30 bg-white sticky top-16 z-30">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
          <div className="flex overflow-x-auto no-scrollbar">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className={cn(
                  "px-4 py-2 text-brand-slate hover:text-brand-dark",
                  activeSection === section.id && "text-brand-primary font-medium"
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
              placeholder="Search discussions..." 
              className="pl-10 pr-4 bg-transparent border-brand-subtle/50 focus:border-brand-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityNavigation;
