
import React from "react";
import { cn } from "@/lib/utils";

interface SanghosIconProps {
  className?: string;
  fill?: string;
}

const SanghosIcon = ({ className, fill = "currentColor" }: SanghosIconProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512" 
      className={cn("w-4 h-4", className)}
      fill={fill}
    >
      <path d="M256,43C138.1,43,43,138.1,43,256s95.1,213,213,213s213-95.1,213-213S373.9,43,256,43z M367.9,262.8
        c-31.2,16.2-36.9,24.8-44.8,44.6c-8,19.7-45.5,31.8-75.9,15.6c-30.4-16.2-36.9-52.1-29-71.8c8-19.7,30.8-44.4,62-60.6
        c31.2-16.2,59.7-13.1,67.6,6.7C356,212.9,399.1,246.6,367.9,262.8z M264.9,178.5c-7.9,19.7-36.3,16.7-67.5,32.9
        c-31.2,16.2-42.2,48.9-34.2,68.7c7.9,19.7,53.6,33.2,84.8,17c31.2-16.2,36.3-52.3,44.2-72c7.9-19.7,38.3-33.9,7.1-50.1
        C268.1,159,272.8,158.8,264.9,178.5z"/>
    </svg>
  );
};

export default SanghosIcon;
