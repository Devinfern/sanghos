
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  isLastStep: boolean;
  isFirstStep: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCancel?: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StepNavigation = ({ 
  currentStep, 
  isLastStep, 
  isFirstStep,
  isSubmitting, 
  onPrevious, 
  onNext, 
  onCancel,
  onSubmit 
}: StepNavigationProps) => {
  return (
    <div className="flex justify-between">
      {!isFirstStep ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious} 
          disabled={isSubmitting}
          className="border-brand-light"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel} 
          disabled={isSubmitting}
          className="border-brand-light"
        >
          Cancel
        </Button>
      )}
      
      {!isLastStep ? (
        <Button 
          type="button" 
          onClick={onNext} 
          disabled={isSubmitting}
          className="bg-brand-primary hover:bg-brand-primary/90"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-brand-primary hover:bg-brand-primary/90"
        >
          {isSubmitting ? "Saving..." : "Complete Setup"}
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
