
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationPillProps {
  navItems: Array<{
    id: string;
    label: string;
    hasDropdown: boolean;
    onClick?: (e: React.MouseEvent) => void;
  }>;
  activeMenu: string | null;
  onMouseEnter: (menu: string) => void;
}

export const NavigationPill = ({ navItems, activeMenu, onMouseEnter }: NavigationPillProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 shadow-xl shadow-black/5">
      <div className="flex items-center space-x-8">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => onMouseEnter(item.id)}
          >
            {item.hasDropdown ? (
              <button
                onClick={item.onClick}
                className={cn(
                  "flex items-center space-x-1 text-brand-slate hover:text-brand-primary transition-colors duration-200 font-medium py-2 px-3 rounded-full hover:bg-brand-primary/5",
                  activeMenu === item.id && "text-brand-primary bg-brand-primary/5"
                )}
              >
                <span>{item.label}</span>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeMenu === item.id && "rotate-180"
                  )} 
                />
              </button>
            ) : (
              <Link
                to={`/${item.id}`}
                className="text-brand-slate hover:text-brand-primary transition-colors duration-200 font-medium py-2 px-3 rounded-full hover:bg-brand-primary/5"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
