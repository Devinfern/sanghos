
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import ForumCMS from "@/components/ForumCMS";

interface CommunityManagementProps {
  onBack: () => void;
}

const CommunityManagement = ({ onBack }: CommunityManagementProps) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-dark">Community Management</h1>
        <Button onClick={onBack} className="bg-brand-primary hover:bg-brand-primary/90 text-white">
          Back to Community
        </Button>
      </div>
      <ForumCMS />
    </div>
  );
};

export default CommunityManagement;

