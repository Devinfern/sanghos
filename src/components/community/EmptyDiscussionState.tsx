
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyDiscussionStateProps {
  category?: string;
  onCreatePost: () => void;
}

const EmptyDiscussionState = ({ category, onCreatePost }: EmptyDiscussionStateProps) => {
  const categoryText = category ? `${category}` : "discussions";

  return (
    <div className="p-8 text-center border rounded-lg border-dashed bg-white/50">
      <div className="mx-auto w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mb-4">
        <Frown className="h-6 w-6 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-medium mb-2">No {categoryText} yet</h3>
      
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Be the first to start a conversation in this category!
      </p>
      
      <Button onClick={onCreatePost}>
        Start a Conversation
      </Button>
    </div>
  );
};

export default EmptyDiscussionState;
