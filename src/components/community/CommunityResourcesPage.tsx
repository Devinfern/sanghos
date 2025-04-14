
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Users, PlayCircle, BookOpen, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const resourceCategories = [
  {
    title: "Meditation Guides",
    description: "Comprehensive guides for different meditation practices",
    icon: BookOpen,
    resources: [
      { title: "Beginner's Guide to Mindfulness", downloads: 234 },
      { title: "Advanced Meditation Techniques", downloads: 156 },
      { title: "Breathwork Fundamentals", downloads: 189 }
    ]
  },
  {
    title: "Workshop Materials",
    description: "Materials from past workshops and sessions",
    icon: FileText,
    resources: [
      { title: "Stress Management Workshop", downloads: 145 },
      { title: "Self-Care Practices Guide", downloads: 178 },
      { title: "Mindful Living Workbook", downloads: 203 }
    ]
  },
  {
    title: "Video Content",
    description: "Recorded sessions and guided practices",
    icon: PlayCircle,
    resources: [
      { title: "Morning Meditation Series", downloads: 167 },
      { title: "Yoga for Beginners", downloads: 198 },
      { title: "Mindful Movement Basics", downloads: 134 }
    ]
  }
];

const CommunityResourcesPage = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <Card key={idx} className="overflow-hidden border border-brand-subtle/30">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-primary/10">
                    <Icon className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-brand-dark">{category.title}</h3>
                    <p className="text-sm text-brand-slate">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {category.resources.map((resource, resourceIdx) => (
                    <div 
                      key={resourceIdx}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-subtle/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-brand-slate" />
                        <span className="text-sm text-brand-dark">{resource.title}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-brand-primary hover:text-brand-primary/90">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityResourcesPage;
