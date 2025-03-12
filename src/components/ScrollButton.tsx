
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollButtonProps {
  className?: string;
  scrollTo?: string; // ID of element to scroll to
  color?: "light" | "dark"; // Light for dark backgrounds, dark for light backgrounds
}

const ScrollButton = ({ 
  className, 
  scrollTo, 
  color = "light" 
}: ScrollButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Hide the button when user has scrolled past a certain point
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Default scroll action - one viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  // Animation variants
  const buttonVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 1.2, 
        duration: 0.6 
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { 
        duration: 0.3 
      }
    }
  };

  const iconVariants = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };

  // Only show if visible state is true
  if (!isVisible) return null;

  return (
    <motion.div
      className={cn(
        "absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer flex flex-col items-center",
        className
      )}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={handleClick}
    >
      <p className={cn(
        "text-sm font-medium mb-2",
        color === "light" ? "text-white" : "text-sage-800"
      )}>
        Scroll Down
      </p>
      <motion.div
        className={cn(
          "p-2 rounded-full",
          color === "light" ? "bg-white/20 text-white" : "bg-sage-800/10 text-sage-800"
        )}
        variants={iconVariants}
        animate="animate"
      >
        <ChevronDown size={24} />
      </motion.div>
    </motion.div>
  );
};

export default ScrollButton;
