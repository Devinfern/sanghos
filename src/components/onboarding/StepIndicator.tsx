
import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: i + 1 === currentStep ? 1.1 : 1,
              backgroundColor: i + 1 <= currentStep ? "var(--primary)" : "var(--muted)"
            }}
            transition={{ duration: 0.3 }}
            className={`h-2.5 w-8 rounded-full ${
              i + 1 <= currentStep ? "bg-brand-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">Step {currentStep} of {totalSteps}</span>
    </div>
  );
};

export default StepIndicator;
