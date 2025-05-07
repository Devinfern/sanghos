
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface JournalInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onRefresh: () => void;
  onSubmit: () => void;
  isDisabled?: boolean;
}

const JournalInput = ({ 
  value, 
  placeholder, 
  onChange, 
  onRefresh,
  onSubmit,
  isDisabled = false
}: JournalInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().length > 10 && !isDisabled) {
      onSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div 
          className={`relative transition-all duration-300 rounded-lg border 
            ${isFocused 
              ? "border-brand-primary/60 shadow-lg shadow-brand-primary/10" 
              : "border-sage-200/40 shadow-sm"}`}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isDisabled}
            className="w-full resize-none p-5 outline-none rounded-lg min-h-[150px] bg-white/80 
              text-sage-800 placeholder:text-sage-500 font-light text-lg disabled:bg-sage-50"
            rows={5}
          />
          
          <div className={`absolute bottom-4 right-4 transition-opacity ${value.trim().length < 10 ? 'opacity-50' : 'opacity-100'}`}>
            <Button 
              type="submit"
              disabled={value.trim().length < 10 || isDisabled}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-5 rounded-full 
                shadow-md group transition-all duration-300 disabled:opacity-70"
            >
              <span className="flex items-center gap-2">
                <span>Analyze</span>
                <Sparkles className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            onClick={onRefresh}
            disabled={isDisabled}
            className="text-sage-600 hover:text-sage-800 hover:bg-sage-50 group"
          >
            <span className="flex items-center gap-1">
              Try Another Prompt
              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 
                group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default JournalInput;
