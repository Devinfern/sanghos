
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";
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
  onSave
}: JournalEntryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (journalEntry.trim().length < 10) return;
    setIsSubmitting(true);
    onSave();
    // Reset submitting state after a delay to allow animation to complete
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const handleJournalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onJournalChange(e.target.value);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <Spinner className="mx-auto mb-4 h-8 w-8 text-sage-600" />
          <p className="text-sage-600">Analyzing your wellness aspirations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-[60px]">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <PlaceholdersAndVanishInput
            placeholders={[selectedPrompt]}
            onChange={handleJournalChange}
            onSubmit={handleSubmit}
          />
          <Button
            variant="outline"
            onClick={onNewPrompt}
            disabled={isSubmitting}
            className="border-sage-300 text-sage-700 hover:bg-sage-50 mx-auto block 
              transition-all duration-300 
              hover:border-sage-400 
              hover:shadow-md 
              group"
          >
            <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
              Try Another Prompt
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300" />
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
  );
};

export default JournalEntryForm;
