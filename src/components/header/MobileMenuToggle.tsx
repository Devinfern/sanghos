
import { Menu } from "lucide-react";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle = ({ isOpen, onToggle }: MobileMenuToggleProps) => {
  return (
    <button 
      onClick={onToggle} 
      className="md:hidden flex items-center"
      aria-label="Open menu"
    >
      <Menu size={24} />
    </button>
  );
};

export default MobileMenuToggle;
