
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import OnboardingFlow from '@/components/OnboardingFlow';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    wellness: [],
    interests: [],
    goals: [],
    retreatPreferences: {
      location: [],
      duration: [],
      priceRange: null,
    },
    notificationPreferences: {
      retreatUpdates: true,
      communityMessages: true,
      practiceReminders: false,
    }
  });
  
  const navigate = useNavigate();

  const handleComplete = () => {
    // In a real app, this would save user preferences to the backend
    console.log("Onboarding completed with data:", userData);
    
    // Navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to Sanghos</h1>
        <p className="text-lg text-muted-foreground">
          Let's customize your experience to help you get the most out of our community.
        </p>
      </div>
      
      <Card className="p-6 md:p-8">
        <OnboardingFlow 
          currentStep={step}
          onStepChange={setStep}
          userData={userData}
          onUserDataChange={setUserData}
          onComplete={handleComplete}
        />
      </Card>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          You can always update your preferences later in your profile settings.
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
