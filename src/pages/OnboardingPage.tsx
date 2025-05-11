
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingFlow from "@/components/OnboardingFlow";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialUserData, setInitialUserData] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  useEffect(() => {
    // Try to get existing user data from localStorage
    const storedUser = localStorage.getItem("sanghos_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setInitialUserData({
          fullName: userData.name || "",
          preferences: userData.preferences || {},
          experience: userData.experience || "beginner"
        });
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    
    // Check if user is authenticated
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        // Check if they have signed up but just aren't authenticated yet
        const storedUserData = localStorage.getItem("sanghos_user");
        
        if (!storedUserData) {
          // No stored user data, redirect to signup
          toast.error("Please sign up to continue");
          navigate("/signup");
        } else {
          // They have user data but no session - might be waiting for email verification
          toast("Please complete your signup process first. Check your email or sign in directly.");
          navigate("/login");
        }
      }
      
      setIsCheckingAuth(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  const handleOnboardingComplete = async (userData: any) => {
    setIsSubmitting(true);
    
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Update the user's profile in Supabase
        const { error } = await supabase
          .from('user_profiles')
          .update({
            full_name: userData.fullName,
            preferences: userData.preferences,
            experience_level: userData.experience,
            wellness_goals: userData.goals,
            notifications_enabled: userData.notifications,
            onboarded: true
          })
          .eq('id', session.user.id);
        
        if (error) {
          console.error("Error updating user profile:", error);
          toast.error("Failed to save your preferences");
        } else {
          // Also update localStorage for compatibility with existing code
          const existingUser = JSON.parse(localStorage.getItem("sanghos_user") || "{}");
          localStorage.setItem("sanghos_user", JSON.stringify({
            ...existingUser,
            name: userData.fullName,
            preferences: userData.preferences,
            experience: userData.experience,
            goals: userData.goals,
            onboarded: true
          }));
          
          toast.success("Profile updated successfully!");
          navigate("/dashboard");
        }
      } else {
        // Handle case where session is not available
        toast.error("Please sign in to save your preferences");
        navigate("/login");
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
        // Set a flag in localStorage for compatibility with existing code
        const existingUser = JSON.parse(localStorage.getItem("sanghos_user") || "{}");
        localStorage.setItem("sanghos_user", JSON.stringify({
          ...existingUser,
          onboarded: true
        }));
      }
    } catch (err) {
      console.error("Error skipping onboarding:", err);
    }
    
    navigate("/dashboard");
  };

  if (isCheckingAuth) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 flex-1 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Welcome to Sanghos | Complete Your Profile</title>
        <meta name="description" content="Set up your Sanghos profile to get personalized retreat recommendations and wellness content." />
      </Helmet>
      
      <Header />
      
      <motion.main 
        className="pt-24 pb-16 flex-1 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-brand-light/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 md:px-6 max-w-4xl">
          <motion.div 
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2 text-brand-dark">Welcome to Sanghos</h1>
            <p className="text-muted-foreground">Let's personalize your experience to find retreats perfect for you</p>
          </motion.div>
          
          {initialUserData && (
            <OnboardingFlow 
              onComplete={handleOnboardingComplete}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
              userData={initialUserData}
            />
          )}
        </div>
        
        <motion.div 
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>You can always update your preferences later in your profile settings</p>
        </motion.div>
      </motion.main>
      
      <Footer />
    </>
  );
};

export default OnboardingPage;
