
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RetreatDiscussions from "@/components/community/RetreatDiscussions";

interface RetreatTabsProps {
  retreatId?: string;
  retreatName: string;
  isLoggedIn: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const RetreatTabs = ({ 
  retreatId, 
  retreatName, 
  isLoggedIn, 
  activeTab, 
  setActiveTab 
}: RetreatTabsProps) => {
  return (
    <Tabs defaultValue="discussions" onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="discussions">Discussions</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>
      
      <TabsContent value="discussions" className="space-y-6">
        {retreatId && <RetreatDiscussions retreatId={retreatId} />}
      </TabsContent>
      
      <TabsContent value="resources">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Retreat Resources</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="text-md font-medium">Packing List</h3>
              <p className="text-sm text-muted-foreground">
                Essential items to bring for your retreat experience
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Download PDF
              </Button>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="text-md font-medium">Meditation Guide</h3>
              <p className="text-sm text-muted-foreground">
                Basic meditation techniques we'll practice during the retreat
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                View Guide
              </Button>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="text-md font-medium">Location & Directions</h3>
              <p className="text-sm text-muted-foreground">
                How to find the retreat venue including maps and directions
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Open Map
              </Button>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default RetreatTabs;
