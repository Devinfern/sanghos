
import { useState } from "react";
import { CheckCircle2, User, Calendar, Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface OnboardingFlowProps {
  onComplete: (userData: any) => void;
  onCancel: () => void;
}

const OnboardingFlow = ({ onComplete, onCancel }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (value: string) => {
    setUserData(prev => ({ ...prev, experience: value }));
  };

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: checked
      }
    }));
  };

  const handleNotificationChange = (checked: boolean) => {
    setUserData(prev => ({ ...prev, notifications: checked }));
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
    setIsLoading(true);
    
    // Simulate API call to save user preferences
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Call the onComplete callback with the collected data
    onComplete(userData);
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="space-x-1">
            {[1, 2, 3].map((i) => (
              <span 
                key={i} 
                className={`inline-block w-2 h-2 rounded-full ${
                  i <= step ? "bg-sage-500" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">Step {step} of 3</span>
        </div>
        <CardTitle>
          {step === 1 && "Welcome to Sanghos"}
          {step === 2 && "Your Wellness Preferences"}
          {step === 3 && "Complete Your Profile"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Let's get to know you better"}
          {step === 2 && "Tell us what interests you"}
          {step === 3 && "Just a few more details"}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Your Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={userData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
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
                />
              </div>
              
              <div className="space-y-2">
                <Label>Your Experience Level</Label>
                <RadioGroup 
                  value={userData.experience} 
                  onValueChange={handleExperienceChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>What are you interested in?</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {[
                    { id: "yoga", label: "Yoga" },
                    { id: "meditation", label: "Meditation" },
                    { id: "nature", label: "Nature Retreats" },
                    { id: "wellness", label: "Wellness & Spa" },
                    { id: "workshops", label: "Workshops" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={item.id} 
                        checked={userData.preferences[item.id]}
                        onCheckedChange={(checked) => 
                          handlePreferenceChange(item.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={item.id}>{item.label}</Label>
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
                  className="w-full min-h-24 p-2 border rounded-md"
                  placeholder="What do you hope to achieve on your wellness journey?"
                  value={userData.goals}
                  onChange={(e) => setUserData(prev => ({ ...prev, goals: e.target.value }))}
                />
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-sage-500" />
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
              
              <div className="rounded-lg bg-sage-50 p-4">
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
                      <CheckCircle2 className="h-4 w-4 mr-2 text-sage-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        
        {step < 3 ? (
          <Button type="button" onClick={nextStep}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Complete Setup"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OnboardingFlow;
