
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface FloatingMenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const FloatingMenuToggle = ({ isOpen, onClick }: FloatingMenuToggleProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("FloatingMenuToggle clicked, isOpen:", isOpen);
    onClick();
  };

  return (
    <motion.button 
      onClick={handleClick}
      className="lg:hidden fixed top-6 right-6 z-[2001] bg-white/95 backdrop-blur-lg border border-white/30 rounded-full w-12 h-12 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center touch-manipulation"
      style={{ 
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <X size={20} className="text-brand-slate" />
        ) : (
          <Menu size={20} className="text-brand-slate" />
        )}
      </motion.div>
    </motion.button>
  );
};
