
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

const SpaceMembers = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Members</h2>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" /> Invite
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Active Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
              <Avatar className="h-10 w-10">
                <img 
                  src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`} 
                  alt="Member" 
                />
              </Avatar>
              <div>
                <div className="font-medium">Member Name</div>
                <div className="text-xs text-muted-foreground">Active 1 day ago</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SpaceMembers;
