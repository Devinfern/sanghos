
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { extractEventDataFromUrl } from "@/lib/api/forum/events";
import { ExtractedEventData } from "@/lib/api/forum/events/types";

interface EventURLFormProps {
  onDataExtracted: (data: ExtractedEventData) => void;
  onError: (error: string) => void;
}

const EventURLForm = ({ onDataExtracted, onError }: EventURLFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await extractEventDataFromUrl(url);
      onDataExtracted(data);
    } catch (error) {
      console.error("Error extracting event data:", error);
      onError(error instanceof Error ? error.message : "Failed to extract event data from URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input
        type="url"
        placeholder="Paste event URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
        required
      />
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
  );
};

export default EventURLForm;
