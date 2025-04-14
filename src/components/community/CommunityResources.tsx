
import { Card } from "@/components/ui/card";
import { MessageSquare, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Resource {
  icon: typeof MessageSquare | typeof Calendar | typeof Users;
  name: string;
  count?: number;
}

interface CategoryResources {
  name: string;
  resources: Resource[];
}

const communityResources: CategoryResources[] = [
  {
    name: "Learning",
    resources: [
      { icon: MessageSquare, name: "Meditation Guides", count: 12 },
      { icon: Calendar, name: "Workshop Materials", count: 8 },
      { icon: Users, name: "Practice Groups", count: 5 }
    ]
  },
  {
    name: "Practices",
    resources: [
      { icon: MessageSquare, name: "Guided Meditations", count: 15 },
      { icon: Calendar, name: "Weekly Challenges", count: 4 },
      { icon: Users, name: "Study Groups", count: 7 }
    ]
  }
];

const CommunityResources = () => {
  const renderIcon = (Icon: typeof MessageSquare) => (
    <Icon className="h-4 w-4 mr-2 text-muted-foreground" />
  );

  return (
    <Card className="overflow-hidden border border-brand-subtle/30 shadow-sm">
      <div className="p-4 border-b border-brand-subtle/30 bg-brand-subtle/10">
        <h3 className="font-semibold text-brand-dark">Resources</h3>
      </div>
      <div className="p-4 space-y-6">
        {communityResources.map((category, index) => (
          <div key={index} className="space-y-2">
            <h4 className="text-sm font-medium text-brand-slate">{category.name}</h4>
            <div className="space-y-1">
              {category.resources.map((resource, resourceIndex) => (
                <Link 
                  key={resourceIndex}
                  to={`/community/resources/${resource.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between rounded-md p-2 hover:bg-brand-subtle/10"
                >
                  <div className="flex items-center">
                    {renderIcon(resource.icon)}
                    <span className="text-sm text-brand-slate">{resource.name}</span>
                  </div>
                  {resource.count !== undefined && (
                    <span className="text-xs text-brand-slate">{resource.count}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CommunityResources;
