
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface FinalStepProps {
  notifications: boolean;
  handleNotificationChange: (checked: boolean) => void;
}

const FinalStep = ({ notifications, handleNotificationChange }: FinalStepProps) => {
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
            checked={notifications}
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
  );
};

export default FinalStep;
