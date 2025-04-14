
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus } from "lucide-react";

const members = [
  {
    id: 1,
    name: "Sarita Walsh",
    role: "Being° Coach",
    avatar: "/lovable-uploads/91da0c1f-b9f1-4310-aea3-1afbfe1358f7.png",
    bio: "Mindfulness practitioner and wellness guide with 10+ years of experience",
    joined: "2 years ago"
  },
  {
    id: 2,
    name: "Maya Johnson",
    role: "Retreat Host",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Dedicated to creating transformative retreat experiences",
    joined: "1 year ago"
  },
  {
    id: 3,
    name: "David Chen",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Exploring mindfulness and personal growth through community",
    joined: "6 months ago"
  }
];

const CommunityMembersPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="overflow-hidden border border-brand-subtle/30">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12 border-2 border-brand-subtle/30">
                    <img src={member.avatar} alt={member.name} />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-brand-dark">{member.name}</h3>
                    <p className="text-sm text-brand-primary">{member.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-brand-slate hover:text-brand-primary">
                  <UserPlus className="h-5 w-5" />
                </Button>
              </div>
              
              <p className="text-sm text-brand-slate">{member.bio}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-brand-subtle/30">
                <span className="text-xs text-brand-slate">Joined {member.joined}</span>
                <Button variant="ghost" size="sm" className="text-brand-slate hover:text-brand-primary">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityMembersPage;
