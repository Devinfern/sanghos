import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreferences, setShowPreferences] = useState(false);
  const [step, setStep] = useState(1);
  
  // Initial preferences during signup
  const [initialPreferences, setInitialPreferences] = useState({
    mindfulness: false,
    yoga: false,
    fitness: false,
    spa: false,
    nutrition: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Sign up with Supabase auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name,
            username: email.split('@')[0]
          }
        }
      });

      if (signUpError) {
        console.error("Sign up error:", signUpError);
        throw new Error(signUpError.message);
      }
      
      // Store user in localStorage with the exact email entered
      localStorage.setItem("sanghos_user", JSON.stringify({
        email: email.trim(),
        name,
        onboarded: false,
        preferences: initialPreferences
      }));
      
      // Show preferences dialog
      setShowPreferences(true);
      
      // Send welcome email via Edge Function
      try {
        const { error: emailError } = await supabase.functions.invoke('send-welcome-email', {
          body: { 
            name, 
            email: email.trim() 
          }
        });
        
        if (emailError) {
          console.error("Welcome email error:", emailError);
        }
      } catch (emailErr) {
        console.error("Failed to send welcome email:", emailErr);
      }
      
      toast.success("Account created successfully!");
      
      // If email verification is disabled in Supabase, user will be logged in automatically
      if (data.session) {
        // Will redirect after preferences selection
      } else {
        // Otherwise show success message and redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while creating your account");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/onboarding`
        }
      });
      
      if (error) throw error;
      
    } catch (err) {
      console.error("Social auth error:", err);
      toast.error("Authentication failed. Please try again.");
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handlePreferenceChange = (key: string, value: boolean) => {
    setInitialPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const completeSignup = () => {
    setShowPreferences(false);
    navigate("/onboarding");
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Sanghos</title>
        <meta name="description" content="Create an account to start your wellness journey with Sanghos." />
      </Helmet>

      <Header />

      <main className="pt-16 pb-16 flex-1 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-brand-light/20">
        <div className="container px-4 md:px-6 max-w-md">
          <div className="glass-morphism rounded-xl p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-brand-dark">Join Sanghos</h1>
              <p className="text-muted-foreground">Start your wellness journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-brand-dark">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-white/80 border-brand-light focus-visible:ring-brand-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-dark">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-white/80 border-brand-light focus-visible:ring-brand-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-brand-dark">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="bg-white/80 border-brand-light focus-visible:ring-brand-primary"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2.5 top-2.5 h-auto px-1"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSocialSignup('google')}
                  disabled={isLoading}
                  className="border-gray-300"
                >
                  Google
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSocialSignup('facebook')}
                  disabled={isLoading}
                  className="border-gray-300"
                >
                  Facebook
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSocialSignup('apple')}
                  disabled={isLoading}
                  className="border-gray-300"
                >
                  Apple
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-primary font-medium hover:underline">
                  Log in <ArrowRight className="inline-block h-3 w-3 ml-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Quick Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to Sanghos, {name}!</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              What are you most interested in? This will help us personalize your experience.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'mindfulness', label: 'Mindfulness & Meditation' },
                { key: 'yoga', label: 'Yoga & Movement' },
                { key: 'fitness', label: 'Fitness & Adventure' },
                { key: 'spa', label: 'Spa & Relaxation' },
                { key: 'nutrition', label: 'Nutrition & Detox' }
              ].map(preference => (
                <div
                  key={preference.key}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    initialPreferences[preference.key as keyof typeof initialPreferences]
                      ? 'bg-brand-primary/10 border-brand-primary'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handlePreferenceChange(
                    preference.key,
                    !initialPreferences[preference.key as keyof typeof initialPreferences]
                  )}
                >
                  <p className="font-medium text-sm">{preference.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => completeSignup()}>
              Skip for now
            </Button>
            <Button onClick={() => completeSignup()}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUp;
