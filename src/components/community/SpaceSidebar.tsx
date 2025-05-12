
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Calendar } from "lucide-react";
import { ForumCategory, ForumSpace } from "@/lib/types/community";
import { motion } from "framer-motion";
import { renderSpaceIcon } from "./SpaceHeader";

interface SpaceSidebarProps {
  spaceName: string;
  spacePosts: any[];
  forumSpaces: ForumCategory[];
}

const SpaceSidebar = ({ spaceName, spacePosts, forumSpaces }: SpaceSidebarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">About this Space</h3>
        <p className="text-sm text-muted-foreground mb-6">
          This is a dedicated space for discussions about {spaceName}. 
          Share your thoughts, ask questions, and connect with others interested in this topic.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>Total posts</span>
            </div>
            <span className="font-medium">{spacePosts.length}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>Members</span>
            </div>
            <span className="font-medium">{Math.floor(Math.random() * 80) + 20}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Created</span>
            </div>
            <span className="font-medium">Jan 12, 2025</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Related Spaces</h3>
        <div className="space-y-4">
          {forumSpaces.flatMap(category => category.spaces)
            .filter(s => s.name !== spaceName)
            .slice(0, 3)
            .map((relatedSpace) => (
              <div key={relatedSpace.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  {renderSpaceIcon(relatedSpace.icon)}
                  <span className="ml-2">{relatedSpace.name}</span>
                </div>
                <Badge variant="outline">{relatedSpace.count || 0} posts</Badge>
              </div>
            ))
          }
          <Button variant="link" className="w-full mt-2">View More Spaces</Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default SpaceSidebar;
