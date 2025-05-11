
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

interface WelcomeStepProps {
  userData: {
    fullName: string;
    birthdate: string;
    experience: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExperienceChange: (value: string) => void;
}

const WelcomeStep = ({ userData, handleInputChange, handleExperienceChange }: WelcomeStepProps) => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
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
  );
};

export default WelcomeStep;
