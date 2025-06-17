
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { NavigationPill } from "./NavigationPill";
import { MegaMenuDropdown } from "./MegaMenuDropdown";

interface FloatingNavigationProps {
  isLoggedIn: boolean;
  onCommunityClick: (e: React.MouseEvent) => void;
}

export const FloatingNavigation = ({ isLoggedIn, onCommunityClick }: FloatingNavigationProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { id: "retreats", label: "Retreats", hasDropdown: true },
    { id: "insights", label: "Insights", hasDropdown: true },
    { id: "community", label: "Community", hasDropdown: true, onClick: onCommunityClick },
    { id: "about", label: "About", hasDropdown: true }
  ];

  return (
    <>
      <div className="hidden lg:flex items-center justify-center relative">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-50"
          onMouseLeave={handleMouseLeave}
        >
          <NavigationPill 
            navItems={navItems}
            activeMenu={activeMenu}
            onMouseEnter={handleMouseEnter}
          />
        </motion.nav>
      </div>

      <MegaMenuDropdown 
        activeMenu={activeMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );
};
