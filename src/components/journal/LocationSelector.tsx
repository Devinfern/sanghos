
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";

interface LocationSelectorProps {
  location: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDetect: () => void;
  isDisabled?: boolean;
}

const LocationSelector = ({
  location,
  isLoading,
  onChange,
  onDetect,
  isDisabled = false
}: LocationSelectorProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <div className="flex items-center gap-2 text-sage-700 mb-2">
        <MapPin className="h-4 w-4" />
        <p className="text-sm font-medium">Your Location</p>
      </div>
      
      <div className="flex gap-2 items-center">
        <div 
          className={`flex-1 relative transition-all duration-300 rounded-md border 
            ${isFocused 
              ? "border-brand-primary/60 shadow-md shadow-brand-primary/5" 
              : "border-sage-200/40"}`}
        >
          <input
            type="text"
            value={location}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isDisabled || isLoading}
            placeholder="Enter your location"
            className="w-full py-2 px-3 outline-none rounded-md bg-white/90 
              text-sage-800 placeholder:text-sage-500 disabled:bg-sage-50"
          />
        </div>
        
        <Button
          type="button"
          variant="outline"
          disabled={isDisabled || isLoading}
          onClick={onDetect}
          className="border-sage-200 text-sage-700 hover:bg-sage-50 hover:text-sage-900"
        >
          {isLoading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <Navigation className="h-4 w-4" />
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default LocationSelector;
