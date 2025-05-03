
import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Participant {
  id: number | string;
  name: string;
  avatar: string;
}

interface RetreatParticipantsProps {
  participants: Participant[];
}

const RetreatParticipants = ({ participants = [] }: RetreatParticipantsProps) => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Participants</h3>
        <Users className="h-5 w-5 text-muted-foreground" />
      </div>

      {participants.length > 0 ? (
        <div className="space-y-4">
          {participants.map(participant => (
            <div key={participant.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <img src={participant.avatar} alt={participant.name} />
              </Avatar>
              <span>{participant.name}</span>
            </div>
          ))}
          <div className="text-center pt-2">
            <Button variant="ghost" size="sm" className="text-brand-primary">
              View all participants
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          <p>No participants have joined yet.</p>
        </div>
      )}
    </Card>
  );
};

export default RetreatParticipants;
