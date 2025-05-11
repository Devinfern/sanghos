
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Import our new components
import StepIndicator from "./onboarding/StepIndicator";
import WelcomeStep from "./onboarding/WelcomeStep";
import PreferencesStep from "./onboarding/PreferencesStep";
import FinalStep from "./onboarding/FinalStep";
import StepNavigation from "./onboarding/StepNavigation";

interface OnboardingFlowProps {
  currentStep?: number;
  onStepChange?: (step: number) => void;
  userData?: any;
  onUserDataChange?: (userData: any) => void;
  onComplete: (userData: any) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const OnboardingFlow = ({ 
  currentStep: externalStep, 
  onStepChange: externalSetStep,
  userData: externalUserData,
  onUserDataChange: externalSetUserData,
  onComplete, 
  onCancel,
  isSubmitting = false
}: OnboardingFlowProps) => {
  const [internalStep, setInternalStep] = useState(1);
  const [internalUserData, setInternalUserData] = useState({
    fullName: "",
    birthdate: "",
    experience: "beginner",
    preferences: {
      yoga: false,
      meditation: false,
      nature: false,
      wellness: false,
      workshops: false
    },
    goals: "",
    notifications: true
  });

  // Use either external or internal state depending on what's provided
  const step = externalStep !== undefined ? externalStep : internalStep;
  const setStep = externalSetStep || setInternalStep;
  
  // Ensure userData has all required properties by merging with default structure
  const userData = externalUserData ? {
    ...internalUserData,
    ...externalUserData,
    preferences: {
      ...internalUserData.preferences,
      ...(externalUserData.preferences || {})
    }
  } : internalUserData;
  
  const setUserData = externalSetUserData || setInternalUserData;

  // Event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (value: string) => {
    console.log("OnboardingFlow updating experience to:", value);
    setUserData((prev: any) => ({ ...prev, experience: value }));
  };

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    setUserData((prev: any) => ({
      ...prev,
      preferences: {
        ...(prev.preferences || {}),
        [preference]: checked
      }
    }));
  };

  const handleGoalsChange = (goals: string) => {
    setUserData((prev: any) => ({ ...prev, goals }));
  };

  const handleNotificationChange = (checked: boolean) => {
    setUserData((prev: any) => ({ ...prev, notifications: checked }));
  };

  const nextStep = () => {
    if (step === 1 && !userData.fullName) {
      toast.error("Please enter your full name to continue");
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the onComplete callback with the collected data
    onComplete(userData);
  };

  // Determine which step content to show
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <WelcomeStep 
            userData={userData}
            handleInputChange={handleInputChange}
            handleExperienceChange={handleExperienceChange}
          />
        );
      case 2:
        return (
          <PreferencesStep
            preferences={userData.preferences || {}}
            goals={userData.goals || ""}
            handlePreferenceChange={handlePreferenceChange}
            handleGoalsChange={handleGoalsChange}
          />
        );
      case 3:
        return (
          <FinalStep
            notifications={userData.notifications}
            handleNotificationChange={handleNotificationChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-morphism border-none">
      <CardHeader>
        <StepIndicator currentStep={step} totalSteps={3} />
        <CardTitle className="text-2xl text-center text-brand-dark">
          {step === 1 && "Welcome to Sanghos"}
          {step === 2 && "Your Wellness Preferences"}
          {step === 3 && "Complete Your Profile"}
        </CardTitle>
        <CardDescription className="text-center">
          {step === 1 && "Let's get to know you better"}
          {step === 2 && "Tell us what interests you"}
          {step === 3 && "Just a few more details"}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
        </form>
      </CardContent>
      
      <CardFooter>
        <StepNavigation
          currentStep={step}
          isFirstStep={step === 1}
          isLastStep={step === 3}
          isSubmitting={isSubmitting}
          onPrevious={prevStep}
          onNext={nextStep}
          onCancel={onCancel}
          onSubmit={handleSubmit}
        />
      </CardFooter>
    </Card>
  );
};

export default OnboardingFlow;
