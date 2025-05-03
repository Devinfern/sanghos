
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users } from "lucide-react";
import { RetreatPhase } from "@/types/community";

interface PhaseTabsProps {
  activePhase: RetreatPhase;
  onPhaseChange: (phase: RetreatPhase) => void;
  retreatName?: string;
}

const PhaseTabs = ({ activePhase, onPhaseChange, retreatName }: PhaseTabsProps) => {
  return (
    <Tabs 
      defaultValue={activePhase} 
      onValueChange={(value) => onPhaseChange(value as RetreatPhase)}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pre" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Pre-Retreat</span>
        </TabsTrigger>
        <TabsTrigger value="post" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Post-Retreat</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pre" className="mt-4">
        <div className="bg-brand-subtle/10 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-medium mb-2">Pre-Retreat Discussion</h3>
          <p className="text-muted-foreground">
            Connect with fellow participants before your {retreatName || "retreat"} experience.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="post" className="mt-4">
        <div className="bg-brand-subtle/10 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-medium mb-2">Post-Retreat Discussion</h3>
          <p className="text-muted-foreground">
            Stay connected with your {retreatName || "retreat"} community.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PhaseTabs;
