
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingFlow from "@/components/OnboardingFlow";
import { toast } from "sonner";

const OnboardingPage = () => {
  const navigate = useNavigate();
  
  const handleOnboardingComplete = (userData: any) => {
    // In a real app, you would save this data to the user's profile
    console.log("Onboarding completed with data:", userData);
    
    // Update the user data in localStorage
    const existingUser = JSON.parse(localStorage.getItem("sanghos_user") || "{}");
    localStorage.setItem("sanghos_user", JSON.stringify({
      ...existingUser,
      preferences: userData.preferences,
      experience: userData.experience,
      onboarded: true
    }));
    
    toast.success("Your profile is all set up!");
    navigate("/dashboard");
  };
  
  const handleCancel = () => {
    // Skip onboarding
    const existingUser = JSON.parse(localStorage.getItem("sanghos_user") || "{}");
    localStorage.setItem("sanghos_user", JSON.stringify({
      ...existingUser,
      onboarded: true
    }));
    
    navigate("/dashboard");
  };

  return (
    <>
      <Helmet>
        <title>Welcome to Sanghos | Complete Your Profile</title>
        <meta name="description" content="Set up your Sanghos profile to get personalized retreat recommendations and wellness content." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16 flex-1 flex flex-col items-center justify-center">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to Sanghos</h1>
            <p className="text-muted-foreground">Let's personalize your experience</p>
          </div>
          
          <OnboardingFlow 
            onComplete={handleOnboardingComplete}
            onCancel={handleCancel}
          />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default OnboardingPage;
