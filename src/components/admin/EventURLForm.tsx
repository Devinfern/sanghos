
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { extractEventDataFromUrl } from "@/lib/api/forum/events";
import { ExtractedEventData } from "@/lib/api/forum/events/types";

interface EventURLFormProps {
  onEventDataExtracted: (data: ExtractedEventData) => void;
}

export const EventURLForm = ({ onEventDataExtracted }: EventURLFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    console.log("Submitting URL for extraction:", url);

    try {
      const data = await extractEventDataFromUrl(url);
      onEventDataExtracted(data);
      toast.success("Event data extracted successfully!");
    } catch (error) {
      console.error("Error extracting event data:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to extract event data from URL";
        
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1 flex gap-2 items-center px-3 py-2 border rounded-md">
          <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <Input
            type="url"
            placeholder="Paste event URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border-0 p-0 focus-visible:ring-0"
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting...
            </>
          ) : (
            "Extract Event Data"
          )}
        </Button>
      </form>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600 text-sm">
          <p className="font-medium mb-1">Error extracting data:</p>
          <p>{error}</p>
          <p className="mt-2 text-xs">Please check the URL and try again, or ensure the event data is accessible.</p>
        </div>
      )}
    </div>
  );
};
