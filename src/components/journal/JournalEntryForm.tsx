import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import LocationInput from './LocationInput';
import { Textarea } from "@/components/ui/textarea"

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
  return (
    <div className="relative space-y-4">
      <div className="absolute -top-16 left-0 right-0 z-10 flex justify-center">
        <div className="bg-brand-primary/10 rounded-xl p-2 text-center inline-flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-primary" />
          <span className="text-sm font-semibold text-brand-primary">
            Your Wellness Insight Starts Here
          </span>
          <Sparkles className="w-5 h-5 text-brand-primary" />
        </div>
      </div>

      <div className="mt-8">
        <LocationInput 
          location={userLocation}
          isLoading={isLocationLoading}
          onChange={onLocationChange}
          onDetect={onLocationDetect}
        />
        
        <div className="bg-sage-50/50 p-3 rounded-lg border border-sage-200/30 space-y-3">
          <label htmlFor="journal" className="text-sm font-medium text-sage-600">
            Journal Entry
          </label>
          <Textarea
            id="journal"
            value={journalEntry}
            onChange={(e) => onJournalChange(e.target.value)}
            placeholder={selectedPrompt}
            className="w-full px-3 py-2 text-xs border rounded-md h-32 text-sage-700 bg-white/50 border-sage-200 resize-none"
            disabled={isAnalyzing}
          />
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onNewPrompt}
              disabled={isAnalyzing}
              className="border-sage-200 text-sage-600 hover:bg-sage-50/30 text-xs"
            >
              New Prompt
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={onSave}
              disabled={isAnalyzing}
              className="bg-brand-primary hover:bg-brand-primary/80 text-white text-xs"
            >
              {isAnalyzing ? <><Spinner className="h-3 w-3 mr-2" /> Analyzing...</> : "Save & Analyze"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryForm;
