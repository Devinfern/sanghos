
import React, { createContext, useContext, useState } from 'react';

interface OnboardingContextType {
  userData: any;
  updateUserData: (data: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const defaultContext: OnboardingContextType = {
  userData: {},
  updateUserData: () => {},
  currentStep: 1,
  setCurrentStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
};

const OnboardingContext = createContext<OnboardingContextType>(defaultContext);

export const useOnboarding = () => useContext(OnboardingContext);

interface OnboardingProviderProps {
  children: React.ReactNode;
  initialData?: any;
  initialStep?: number;
}

export const OnboardingProvider = ({ 
  children, 
  initialData = {}, 
  initialStep = 1 
}: OnboardingProviderProps) => {
  const [userData, setUserData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(initialStep);

  const updateUserData = (data: any) => {
    setUserData((prev: any) => ({
      ...prev,
      ...data,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <OnboardingContext.Provider value={{
      userData,
      updateUserData,
      currentStep,
      setCurrentStep,
      nextStep,
      prevStep
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};
