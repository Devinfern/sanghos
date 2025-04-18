
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EventURLFormProps {
  onEventDataExtracted: (data: any) => void;
}

export const EventURLForm = ({ onEventDataExtracted }: EventURLFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://ordomvdrqjthpzfyrrzp.supabase.co/functions/v1/extract-event-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to extract event data");
      }

      const data = await response.json();
      onEventDataExtracted(data);
      toast.success("Event data extracted successfully!");
    } catch (error) {
      console.error("Error extracting event data:", error);
      toast.error(error instanceof Error ? error.message : "Failed to extract event data from URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};
