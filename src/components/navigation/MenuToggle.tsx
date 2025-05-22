
import { Menu, X } from "lucide-react";

interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MenuToggle = ({ isOpen, onClick }: MenuToggleProps) => {
  return (
    <button 
      onClick={onClick}
      className="md:hidden flex items-center justify-center z-[1003] bg-white rounded-full w-10 h-10 shadow-sm relative"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <X size={24} className="text-slate-800" />
      ) : (
        <Menu size={24} className="text-slate-800" />
      )}
    </button>
  );
};
