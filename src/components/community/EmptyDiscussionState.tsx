
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyDiscussionStateProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onCreateSpace: () => void;
}

const EmptyDiscussionState = ({ isLoggedIn, isAdmin, onCreateSpace }: EmptyDiscussionStateProps) => {
  return (
    <Card className="p-8 text-center">
      <h3 className="text-lg font-medium mb-2">Discussion board coming soon</h3>
      <p className="text-muted-foreground mb-4">
        We're preparing a space for vibrant discussions about this retreat.
      </p>
      {isLoggedIn && isAdmin && (
        <Button onClick={onCreateSpace} className="mt-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Space
        </Button>
      )}
    </Card>
  );
};

export default EmptyDiscussionState;
