
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface EnhancedGlassButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  className?: string;
  onClick?: () => void;
}

const EnhancedGlassButton = ({ 
  children, 
  variant = "primary", 
  size = "default", 
  className = "",
  onClick 
}: EnhancedGlassButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const baseClasses = variant === "primary" 
    ? "bg-brand-primary/80 hover:bg-brand-primary/90 text-white border-2 border-white/30" 
    : "bg-white/20 hover:bg-white/30 text-brand-dark border-2 border-white/40";

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Ripple effect container */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        {isPressed && (
          <motion.div
            className="absolute w-full h-full rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
            }}
          />
        )}
      </div>

      {/* Magnetic glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 182, 164, 0.3) 0%, transparent 70%)`,
        }}
      />

      <Button
        ref={buttonRef}
        size={size}
        className={`
          relative backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 rounded-full overflow-hidden group
          ${baseClasses}
          ${className}
        `}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
        style={{
          transform: isHovered 
            ? `perspective(500px) rotateY(${(mousePosition.x - 100) * 0.1}deg) rotateX(${(mousePosition.y - 25) * -0.1}deg)`
            : 'perspective(500px) rotateY(0deg) rotateX(0deg)',
        }}
      >
        {/* Internal liquid animation */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)`,
            transform: `translateX(${mousePosition.x * 0.1 - 10}px) translateY(${mousePosition.y * 0.1 - 2.5}px)`,
          }}
        />

        {/* Light refraction */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.5) 0%, transparent 60%)`,
          }}
        />

        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  );
};

export default EnhancedGlassButton;
