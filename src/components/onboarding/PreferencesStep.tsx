
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

interface PreferencesStepProps {
  preferences: {
    yoga?: boolean;
    meditation?: boolean;
    nature?: boolean;
    wellness?: boolean;
    workshops?: boolean;
  };
  goals: string;
  handlePreferenceChange: (preference: string, checked: boolean) => void;
  handleGoalsChange: (goals: string) => void;
}

const PreferencesStep = ({ 
  preferences, 
  goals,
  handlePreferenceChange, 
  handleGoalsChange 
}: PreferencesStepProps) => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Function to handle preference changes safely
  const togglePreference = (id: string) => {
    const currentValue = preferences[id as keyof typeof preferences] || false;
    handlePreferenceChange(id, !currentValue);
  };

  return (
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
          ].map((item) => {
            const isChecked = preferences[item.id as keyof typeof preferences] || false;
            
            return (
              <label 
                key={item.id}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  isChecked ? "border-brand-primary bg-brand-primary/5" : "border-gray-200"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  togglePreference(item.id);
                }}
              >
                <Checkbox 
                  id={`pref-${item.id}`}
                  checked={isChecked}
                  className="mr-2"
                />
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{item.icon}</span>
                  <span className="cursor-pointer">{item.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="goals">Your Wellness Goals (Optional)</Label>
        <textarea
          id="goals"
          rows={3}
          className="w-full min-h-24 p-3 border rounded-md bg-white/80"
          placeholder="What do you hope to achieve on your wellness journey?"
          value={goals}
          onChange={(e) => handleGoalsChange(e.target.value)}
        />
      </div>
    </motion.div>
  );
};

export default PreferencesStep;
