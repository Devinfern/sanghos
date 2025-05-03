
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RetreatQuickLinks = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <div className="space-y-2">
        <Button variant="ghost" className="justify-start w-full text-left">
          Retreat Schedule
        </Button>
        <Button variant="ghost" className="justify-start w-full text-left">
          Venue Information
        </Button>
        <Button variant="ghost" className="justify-start w-full text-left">
          Host Contact Details
        </Button>
        <Button variant="ghost" className="justify-start w-full text-left">
          Share Feedback
        </Button>
      </div>
    </Card>
  );
};

export default RetreatQuickLinks;
