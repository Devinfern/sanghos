import { motion } from "framer-motion";
import { Star, Shield, Users, Clock, Award, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustSignalProps {
  className?: string;
}

export const TrustSignals = ({ className }: TrustSignalProps) => {
  const signals = [
    {
      icon: Star,
      text: "4.9/5 Rating",
      subtitle: "from 2,000+ members",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      text: "Verified Instructors",
      subtitle: "Background checked",
      color: "text-green-500"
    },
    {
      icon: Users,
      text: "50,000+ Participants",
      subtitle: "Join the community",
      color: "text-blue-500"
    },
    {
      icon: CheckCircle,
      text: "Satisfaction Guarantee",
      subtitle: "100% money back",
      color: "text-emerald-500"
    }
  ];

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-6", className)}>
      {signals.map((signal, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="flex items-center space-x-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white"
        >
          <signal.icon className={cn("h-5 w-5", signal.color)} />
          <div className="text-sm">
            <div className="font-semibold">{signal.text}</div>
            <div className="text-white/70 text-xs">{signal.subtitle}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

interface BookingProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  className?: string;
}

export const BookingProgress = ({ 
  currentStep, 
  totalSteps, 
  steps, 
  className 
}: BookingProgressProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-brand-slate">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-brand-slate/70">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      
      <div className="w-full bg-sage-100 rounded-full h-2 mb-4">
        <motion.div 
          className="bg-gradient-to-r from-brand-primary to-brand-primary/80 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-brand-slate/70">
        {steps.map((step, index) => (
          <span 
            key={index}
            className={cn(
              "transition-colors duration-200",
              index < currentStep ? "text-brand-primary font-medium" : ""
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

interface UrgencyIndicatorProps {
  spotsLeft: number;
  className?: string;
}

export const UrgencyIndicator = ({ spotsLeft, className }: UrgencyIndicatorProps) => {
  const isUrgent = spotsLeft <= 3;
  
  return (
    <motion.div 
      className={cn(
        "inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium",
        isUrgent 
          ? "bg-red-50 text-red-700 border border-red-200" 
          : "bg-orange-50 text-orange-700 border border-orange-200",
        className
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Clock className="h-4 w-4" />
      <span>
        {spotsLeft === 1 ? "Last spot!" : `Only ${spotsLeft} spots left`}
      </span>
    </motion.div>
  );
};

interface SocialProofProps {
  recentBookings: Array<{
    name: string;
    retreat: string;
    time: string;
  }>;
  className?: string;
}

export const SocialProof = ({ recentBookings, className }: SocialProofProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center space-x-2 text-sm font-medium text-brand-slate mb-3">
        <Users className="h-4 w-4" />
        <span>Recent Bookings</span>
      </div>
      
      <div className="space-y-2">
        {recentBookings.slice(0, 3).map((booking, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center space-x-3 text-sm text-brand-slate/70"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>
              <span className="font-medium">{booking.name}</span> booked "{booking.retreat}" {booking.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface InstructorBadgeProps {
  instructor: {
    name: string;
    rating: number;
    certifications: string[];
    yearsExperience: number;
  };
  className?: string;
}

export const InstructorBadge = ({ instructor, className }: InstructorBadgeProps) => {
  return (
    <div className={cn("p-4 bg-white rounded-lg shadow-sm border border-sage-200", className)}>
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
          <Award className="h-5 w-5 text-brand-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-brand-dark">{instructor.name}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{instructor.rating}</span>
            </div>
          </div>
          <div className="text-sm text-brand-slate/70 mb-2">
            {instructor.yearsExperience} years experience
          </div>
          <div className="flex flex-wrap gap-1">
            {instructor.certifications.slice(0, 2).map((cert, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};