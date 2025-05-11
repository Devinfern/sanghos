
import { useState } from "react";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (value: string) => {
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

  // Ensure preferences object exists
  const preferences = userData.preferences || {};
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-morphism border-none">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: i === step ? 1.1 : 1,
                  backgroundColor: i <= step ? "var(--primary)" : "var(--muted)"
                }}
                transition={{ duration: 0.3 }}
                className={`h-2.5 w-8 rounded-full ${
                  i <= step ? "bg-brand-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">Step {step} of 3</span>
        </div>
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
          {step === 1 && (
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="space-y-2">
                <Label htmlFor="fullName">Your Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={userData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="bg-white/80"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate">Birthdate (Optional)</Label>
                <Input 
                  id="birthdate" 
                  name="birthdate" 
                  type="date"
                  value={userData.birthdate}
                  onChange={handleInputChange}
                  className="bg-white/80"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Your Experience Level</Label>
                <RadioGroup 
                  value={userData.experience} 
                  onValueChange={handleExperienceChange}
                  className="grid grid-cols-1 gap-2 pt-2"
                >
                  {[
                    { value: "beginner", label: "Beginner", desc: "New to wellness practices" },
                    { value: "intermediate", label: "Intermediate", desc: "Some prior experience" },
                    { value: "advanced", label: "Advanced", desc: "Experienced practitioner" }
                  ].map((level) => (
                    <div 
                      key={level.value}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        userData.experience === level.value 
                          ? "border-brand-primary bg-brand-primary/5" 
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <RadioGroupItem 
                        value={level.value} 
                        id={level.value}
                        className="mr-3"
                      />
                      <div>
                        <Label htmlFor={level.value} className="font-medium cursor-pointer">{level.label}</Label>
                        <p className="text-xs text-muted-foreground">{level.desc}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="space-y-2">
                <Label>What are you interested in?</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {[
                    { id: "yoga", label: "Yoga", icon: "🧘" },
                    { id: "meditation", label: "Meditation", icon: "🧠" },
                    { id: "nature", label: "Nature Retreats", icon: "🌲" },
                    { id: "wellness", label: "Wellness & Spa", icon: "💆" },
                    { id: "workshops", label: "Workshops", icon: "🤝" }
                  ].map((item) => (
                    <div 
                      key={item.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        preferences[item.id] ? "border-brand-primary bg-brand-primary/5" : "border-gray-200"
                      }`}
                      onClick={() => handlePreferenceChange(item.id, !preferences[item.id])}
                    >
                      <Checkbox 
                        id={item.id} 
                        checked={preferences[item.id] || false}
                        onCheckedChange={(checked) => 
                          handlePreferenceChange(item.id, checked as boolean)
                        }
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        <span className="mr-2 text-xl">{item.icon}</span>
                        <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goals">Your Wellness Goals (Optional)</Label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={3}
                  className="w-full min-h-24 p-3 border rounded-md bg-white/80"
                  placeholder="What do you hope to achieve on your wellness journey?"
                  value={userData.goals}
                  onChange={(e) => setUserData((prev: any) => ({ ...prev, goals: e.target.value }))}
                />
              </div>
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="rounded-lg border p-4 bg-white/50">
                <h3 className="font-medium mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-brand-primary" />
                  Almost Done!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We'll use your preferences to personalize your Sanghos experience and recommend retreats tailored to your interests.
                </p>
                
                <div className="flex items-start space-x-2 mb-4">
                  <Checkbox 
                    id="notifications" 
                    checked={userData.notifications}
                    onCheckedChange={(checked) => 
                      handleNotificationChange(checked as boolean)
                    }
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new retreats, special offers, and wellness insights
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-brand-light/30 p-4">
                <h3 className="font-medium mb-2">Your Sanghos Membership</h3>
                <p className="text-sm text-muted-foreground">
                  As a Sanghos member, you'll get:
                </p>
                <ul className="mt-2 space-y-1">
                  {[
                    "Early access to retreat bookings",
                    "Exclusive community access",
                    "Special member pricing",
                    "Personal wellness tracking"
                  ].map((benefit, i) => (
                    <li key={i} className="text-sm flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-brand-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button 
            type="button" 
            variant="outline" 
            onClick={prevStep} 
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
        
        {step < 3 ? (
          <Button 
            type="button" 
            onClick={nextStep} 
            disabled={isSubmitting}
            className="bg-brand-primary hover:bg-brand-primary/90"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-brand-primary hover:bg-brand-primary/90"
          >
            {isSubmitting ? "Saving..." : "Complete Setup"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OnboardingFlow;
