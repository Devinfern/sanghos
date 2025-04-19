
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, Sparkles } from "lucide-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import LocationInput from "./LocationInput";

interface JournalEntryFormProps {
  isAnalyzing: boolean;
  journalEntry: string;
  selectedPrompt: string;
  userLocation: string;
  isLocationLoading: boolean;
  onJournalChange: (value: string) => void;
  onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLocationDetect: () => void;
  onNewPrompt: () => void;
  onSave: () => void;
}

const JournalEntryForm = ({
  isAnalyzing,
  journalEntry,
  selectedPrompt,
  userLocation,
  isLocationLoading,
  onJournalChange,
  onLocationChange,
  onLocationDetect,
  onNewPrompt,
  onSave,
}: JournalEntryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (journalEntry.trim().length < 10) return;
    setIsSubmitting(true);
    onSave();
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const handleJournalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onJournalChange(e.target.value);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-white/50 rounded-lg border border-sage-200/30 shadow-lg backdrop-blur-sm">
        <div className="text-center space-y-3">
          <Spinner className="mx-auto h-8 w-8 text-brand-primary" />
          <p className="text-sage-700 font-medium">
            Analyzing your wellness aspirations...
          </p>
          <p className="text-sage-600 text-sm">
            Finding personalized recommendations just for you
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sage-200/30 shadow-lg p-6 space-y-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-full max-w-2xl space-y-6">
            <PlaceholdersAndVanishInput
              placeholders={[selectedPrompt]}
              onChange={handleJournalChange}
              onSubmit={handleSubmit}
            />

            <Button
              variant="outline"
              onClick={onNewPrompt}
              disabled={isSubmitting}
              className="mx-auto block transition-all duration-300 
                border-sage-300 text-sage-700 hover:bg-sage-50 
                hover:border-sage-400 hover:shadow-md group"
            >
              <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                Try Another Prompt
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </span>
            </Button>
          </div>
        </div>

        <LocationInput
          location={userLocation}
          isLoading={isLocationLoading}
          onChange={onLocationChange}
          onDetect={onLocationDetect}
        />
      </div>
    </div>
  );
};

export default JournalEntryForm;
