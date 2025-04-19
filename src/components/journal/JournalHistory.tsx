
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Sparkles } from "lucide-react";

interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
  prompt?: string;
}

interface JournalHistoryProps {
  entries: JournalEntry[];
  onAnalyze: (content: string) => void;
  formatDate: (date: string) => string;
}

const JournalHistory = ({ entries, onAnalyze, formatDate }: JournalHistoryProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-sage-600">
        <Book className="mx-auto h-12 w-12 mb-4 text-sage-400" />
        <h3 className="text-lg font-medium mb-2">No journal entries yet</h3>
        <p>Start writing to create your wellness journey</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <Card key={entry.id} className="border-sage-200/20 hover:border-sage-300/50 transition-all">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-sage-500">
                {formatDate(entry.createdAt)}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-sage-600 hover:text-sage-700"
                onClick={() => onAnalyze(entry.content)}
              >
                <Sparkles className="h-4 w-4 mr-1" /> Analyze
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {entry.prompt && (
              <div className="mb-2 text-sm italic text-sage-600">
                Prompt: {entry.prompt}
              </div>
            )}
            <p className="text-sage-800 line-clamp-3">{entry.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JournalHistory;
