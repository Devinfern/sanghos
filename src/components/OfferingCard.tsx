
import { cn } from "@/lib/utils";
import React from "react";

interface OfferingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string; // gradient
}

const OfferingCard: React.FC<OfferingCardProps> = ({
  icon,
  title,
  description,
  color = "from-sage-50 to-white",
}) => (
  <div
    className={cn(
      "flex flex-col items-center rounded-xl p-5 shadow-md min-w-[160px] min-h-[145px] bg-gradient-to-br hover:shadow-lg transition-shadow duration-300",
      color
    )}
    style={{ flex: "1 0 0" }}
  >
    <div className="mb-3 text-center">{icon}</div>
    <div className="text-base font-semibold text-sage-900 mb-1 text-center">{title}</div>
    <div className="text-xs text-sage-700 text-center">{description}</div>
  </div>
);

export default OfferingCard;
