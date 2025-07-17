import { motion } from "framer-motion";
import { MessageCircle, Home, Users, Calendar, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileBottomNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNewPost: () => void;
}

const MobileBottomNavigation = ({
  activeSection,
  onSectionChange,
  onNewPost
}: MobileBottomNavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "discussions", label: "Chat", icon: MessageCircle },
    { id: "create", label: "Create", icon: Plus, isAction: true },
    { id: "members", label: "People", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-brand-subtle/20 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isCreateButton = item.isAction;

          if (isCreateButton) {
            return (
              <Button
                key={item.id}
                onClick={onNewPost}
                className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full h-12 w-12 p-0 shadow-lg"
              >
                <Icon className="h-6 w-6" />
              </Button>
            );
          }

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl",
                isActive 
                  ? "text-brand-primary bg-brand-primary/10" 
                  : "text-muted-foreground hover:text-brand-primary"
              )}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full"
                />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNavigation;