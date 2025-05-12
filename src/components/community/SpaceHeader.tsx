
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Users, Bell } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

// Helper function to render space icons
export const renderSpaceIcon = (iconName: string) => {
  switch (iconName) {
    case "MessageSquare":
      return <MessageSquare className="h-6 w-6 text-brand-primary" />;
    case "Calendar":
      return <Calendar className="h-6 w-6 text-brand-primary" />;
    case "Users":
      return <Users className="h-6 w-6 text-brand-primary" />;
    default:
      return <MessageSquare className="h-6 w-6 text-brand-primary" />;
  }
};

interface SpaceHeaderProps {
  spaceName: string;
  spaceIcon: string;
}

const SpaceHeader = ({ spaceName, spaceIcon }: SpaceHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Toggle follow state function
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed space" : "Following space");
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="link" className="p-0" onClick={() => window.history.back()}>
            Back to Community
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="bg-brand-subtle/20 p-3 rounded-full mr-4">
              {renderSpaceIcon(spaceIcon)}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{spaceName}</h1>
              <p className="text-muted-foreground mt-1">
                Discussions, posts, and resources for {spaceName}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Bell className="h-4 w-4" />
            </Button>
            <Button 
              variant={isFollowing ? "default" : "outline"}
              className={isFollowing ? "bg-brand-primary hover:bg-brand-primary/90" : ""}
              onClick={toggleFollow}
            >
              {isFollowing ? "Following" : "Follow Space"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpaceHeader;
