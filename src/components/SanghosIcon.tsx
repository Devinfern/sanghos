
import React from "react";
import { cn } from "@/lib/utils";

interface SanghosIconProps {
  className?: string;
  opacity?: number;
}

const SanghosIcon = ({ className, opacity = 1 }: SanghosIconProps) => {
  return (
    <img 
      src="/lovable-uploads/27908c1c-5758-4ca7-a499-bc78d166cf2c.png" 
      alt="Sanghos"
      className={cn("w-4 h-4", className)}
      style={{ opacity }}
    />
  );
};

export default SanghosIcon;
