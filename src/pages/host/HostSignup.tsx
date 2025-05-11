
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import HostHeader from "@/components/HostHeader";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const HostSignup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Simple validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app with Supabase integration
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName,
            is_host: true
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      // Create host profile - using custom table instead
      if (data.user) {
        try {
          // Create a custom table record - using user_profiles instead of host_profiles
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert([
              { 
                id: data.user.id,
                full_name: fullName,
                email: email.trim(),
                is_host: true,
                host_status: 'pending'
              }
            ]);
            
          if (profileError) throw profileError;
        } catch (err) {
          console.error("Error creating host profile:", err);
        }
      }
      
      toast.success("Account created! You can now sign in.");
      navigate("/host/login");
      
    } catch (err) {
      console.error("Signup error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create account");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-brand-light/20">
      <HostHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div 
          className="max-w-md w-full mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Become a Host</h1>
            <p className="text-muted-foreground mt-2">
              Create an account to list your retreats and spaces
            </p>
          </div>

          <div className="glass-morphism rounded-xl p-6 md:p-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <span className="block">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-brand-dark">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Maya Johnson"
                  className="bg-white/80"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-dark">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="bg-white/80"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-brand-dark">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-white/80"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-brand-dark">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/80"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary/90"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Host Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have a host account?{" "}
                <Link
                  to="/host/login"
                  className="text-brand-primary hover:underline font-medium"
                >
                  Sign In <ArrowRight className="inline h-3 w-3" />
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-brand-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-brand-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HostSignup;
