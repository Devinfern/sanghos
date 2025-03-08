
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const JoinNow = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1 && !name.trim()) {
      setError("Please enter your name");
      return;
    }
    
    if (step === 2 && !email.trim()) {
      setError("Please enter your email");
      return;
    }
    
    setError("");
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // This is a mock registration
      // In a real app, you would send the credentials to your backend
      toast.success("Welcome to Sanghos! Your journey begins now.");
      navigate("/");
    } catch (err) {
      setError("An error occurred while creating your account");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-lg font-medium">
                What's your name?
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 text-lg h-12"
                  required
                  autoFocus
                />
              </div>
            </div>
            <Button 
              type="button" 
              size="lg" 
              className="w-full flex items-center justify-center group"
              onClick={handleNext}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-lg font-medium">
                What's your email?
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 text-lg h-12"
                  required
                  autoFocus
                />
              </div>
            </div>
            <Button 
              type="button" 
              size="lg" 
              className="w-full flex items-center justify-center group"
              onClick={handleNext}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-lg font-medium">
                Create a password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 text-lg h-12"
                  required
                  minLength={8}
                  autoFocus
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-lg font-medium">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 text-lg h-12"
                  required
                  minLength={8}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating Your Account..." : "Join Sanghos"}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Join Sanghos | Begin Your Mindfulness Journey</title>
        <meta name="description" content="Join the Sanghos community and discover transformative mindfulness experiences" />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-[calc(100vh-64px)]">
        <div className="container max-w-lg px-4 md:px-6">
          {/* Back button */}
          <div className="mb-6">
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="group"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-8 mb-6">
            {/* Progress indicator */}
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      step > i ? "bg-primary" : step === i ? "bg-primary" : "bg-muted",
                      "transition-colors duration-200"
                    )}
                  >
                    {step > i ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span className={step === i ? "text-white" : "text-muted-foreground"}>
                        {i}
                      </span>
                    )}
                  </div>
                  <div className="text-xs mt-1 text-muted-foreground">
                    {i === 1 ? "Profile" : i === 2 ? "Contact" : "Password"}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold mb-2">Join Sanghos</h1>
              <p className="text-muted-foreground">
                Start your mindfulness journey with us
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-3 mb-6 flex items-center gap-2">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {renderStepContent()}
            </form>
          </div>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default JoinNow;
