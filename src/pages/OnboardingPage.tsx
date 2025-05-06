
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingFlow from "@/components/OnboardingFlow";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  preferences?: string[];
  experience_level?: string;
  onboarded?: boolean;
}

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleOnboardingComplete = async (userData: any) => {
    setIsSubmitting(true);
    
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Your session has expired. Please log in again.");
        navigate("/login");
        return;
      }
      
      // Update the user's profile in Supabase
      const { error } = await supabase
        .from('user_profiles')
        .update({
          // Only include fields that are defined in the user_profiles table
          experience_level: userData.experience
        })
        .eq('id', session.user.id);
      
      if (error) {
        console.error("Error updating user profile:", error);
        toast.error("Failed to save your preferences");
      } else {
        // Store preferences in localStorage for client-side use
        const existingUser = JSON.parse(localStorage.getItem("sanghos_user") || "{}");
        localStorage.setItem("sanghos_user", JSON.stringify({
          ...existingUser,
          preferences: userData.preferences,
          experience: userData.experience,
          onboarded: true
        }));
        
        toast.success("Your profile is all set up!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error in onboarding:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = async () => {
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // We don't need to update onboarded status in the database
        // since that field doesn't exist in the user_profiles table
      }
      
      // Update localStorage for client-side tracking
      const existingUser = JSON.parse(localStorage.getItem("sanghos_user") || "{}");
      localStorage.setItem("sanghos_user", JSON.stringify({
        ...existingUser,
        onboarded: true
      }));
    } catch (err) {
      console.error("Error skipping onboarding:", err);
    }
    
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
            isSubmitting={isSubmitting}
          />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default OnboardingPage;
