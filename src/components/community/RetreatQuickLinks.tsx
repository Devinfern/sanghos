
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RetreatQuickLinks = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <div className="space-y-2">
        <Button 
          variant="ghost" 
          className="justify-start w-full text-left"
          asChild
        >
          <Link to="#">
            <span>Retreat Schedule</span>
            <ArrowRight className="ml-auto h-4 w-4" />
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          className="justify-start w-full text-left"
          asChild
        >
          <Link to="#">
            <span>Venue Information</span>
            <ArrowRight className="ml-auto h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default RetreatQuickLinks;
