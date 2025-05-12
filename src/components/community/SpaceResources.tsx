
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

const SpaceResources = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resources</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Resource
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Popular Resources</h3>
        <div className="divide-y">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-slate-100 p-2 rounded">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Getting Started Guide</h4>
                  <p className="text-sm text-muted-foreground">An introduction to mindfulness practices</p>
                  <div className="text-xs text-muted-foreground mt-1">Added 3 days ago • PDF • 2.3 MB</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">Download</Button>
            </div>
          </div>
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-slate-100 p-2 rounded">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m9 9 6 6" />
                    <path d="m15 9-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Meditation Techniques Video</h4>
                  <p className="text-sm text-muted-foreground">Basic meditation practices for beginners</p>
                  <div className="text-xs text-muted-foreground mt-1">Added 1 week ago • Video • 15 min</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">Watch</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SpaceResources;
