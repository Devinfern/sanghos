
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";
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
      <div className="bg-sage-50 p-4 rounded-lg border border-sage-200/50 text-sage-800 my-0">
        <p className="font-medium mb-1">Today's Prompt</p>
        <p className="italic">{selectedPrompt}</p>
      </div>
      
      <Textarea 
        placeholder="Start writing your thoughts here..." 
        value={journalEntry} 
        onChange={(e) => onJournalChange(e.target.value)} 
        className="min-h-[200px] p-4 text-sage-900 border-sage-200" 
      />

      <LocationInput
        location={userLocation}
        isLoading={isLocationLoading}
        onChange={onLocationChange}
        onDetect={onLocationDetect}
      />

      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          onClick={onNewPrompt}
          className="border-sage-300 text-sage-700 hover:bg-sage-50"
        >
          New Prompt
        </Button>
        <Button 
          onClick={onSave} 
          className="bg-sage-700 hover:bg-sage-800 text-white flex items-center gap-2" 
          disabled={journalEntry.trim().length < 10}
        >
          <span>Save & Find Events</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default JournalEntryForm;
