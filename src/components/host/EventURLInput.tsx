
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface EventURLInputProps {
  onEventDataExtracted: (eventData: any) => void;
}

const EventURLInput = ({ onEventDataExtracted }: EventURLInputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/functions/v1/extract-event-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to extract event data");
      }

      const data = await response.json();
      onEventDataExtracted(data);
      toast.success("Event data extracted successfully!");
    } catch (error) {
      console.error("Error extracting event data:", error);
      toast.error("Failed to extract event data from URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Quick Event Creation</CardTitle>
      </CardHeader>
      <CardContent>
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
            {isLoading ? "Extracting..." : "Extract Event Data"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventURLInput;
