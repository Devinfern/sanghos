
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Sparkles, MessageCircle, FileText, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RetreatDiscussions from "./RetreatDiscussions";

interface EnhancedRetreatTabsProps {
  retreatId?: string;
  retreatName: string;
  isLoggedIn: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  retreatPhase?: "pre" | "during" | "post";
}

const EnhancedRetreatTabs = ({ 
  retreatId, 
  retreatName, 
  isLoggedIn, 
  activeTab, 
  setActiveTab,
  retreatPhase = "pre"
}: EnhancedRetreatTabsProps) => {
  const [selectedPhase, setSelectedPhase] = useState(retreatPhase);

  const getPhaseDescription = (phase: string) => {
    switch (phase) {
      case "pre":
        return "Connect with fellow participants before your retreat begins. Share excitement, coordinate travel, and prepare together.";
      case "during":
        return "Stay connected during your retreat experience. Share moments, insights, and support each other's journey.";
      case "post":
        return "Continue your journey together after the retreat. Share reflections, maintain connections, and plan future adventures.";
      default:
        return "";
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case "pre":
        return Calendar;
      case "during":
        return Sparkles;
      case "post":
        return Users;
      default:
        return MessageCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Phase Selection */}
      <div className="flex flex-wrap gap-2">
        {["pre", "during", "post"].map((phase) => {
          const Icon = getPhaseIcon(phase);
          const isActive = selectedPhase === phase;
          
          return (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase as "pre" | "during" | "post")}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                ${isActive 
                  ? "bg-brand-primary text-white shadow-lg" 
                  : "bg-white border border-brand-subtle/20 text-brand-dark hover:bg-brand-subtle/10"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium capitalize">{phase}-Retreat</span>
              {phase === "pre" && <Badge variant="secondary" className="ml-1 text-xs">Active</Badge>}
            </button>
          );
        })}
      </div>

      {/* Phase Description */}
      <Card className="border-l-4 border-l-brand-primary">
        <CardContent className="p-4">
          <p className="text-muted-foreground">
            {getPhaseDescription(selectedPhase)}
          </p>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="discussions" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:w-auto">
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Discussions</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Members</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="space-y-6">
          {retreatId && (
            <RetreatDiscussions 
              retreatId={retreatId} 
              phase={selectedPhase}
            />
          )}
        </TabsContent>
        
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Retreat Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Registration Opens</h4>
                    <p className="text-sm text-muted-foreground">Early bird pricing available</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Welcome Package Sent</h4>
                    <p className="text-sm text-muted-foreground">Pre-retreat materials and packing list</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Travel Coordination</h4>
                    <p className="text-sm text-muted-foreground">Connect with other participants for carpooling</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Retreat Begins</h4>
                    <p className="text-sm text-muted-foreground">Check-in and welcome ceremony</p>
                    <p className="text-xs text-muted-foreground">In 2 weeks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Retreat Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:bg-brand-subtle/5 transition-colors">
                  <h3 className="font-medium text-lg">Pre-Retreat Preparation Guide</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Everything you need to know to prepare for your retreat experience
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">PDF</Badge>
                    <Badge variant="outline">Essential</Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-brand-subtle/5 transition-colors">
                  <h3 className="font-medium text-lg">Packing Checklist</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive list of items to bring for your comfort and practice
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">PDF</Badge>
                    <Badge variant="outline">Practical</Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-brand-subtle/5 transition-colors">
                  <h3 className="font-medium text-lg">Meditation & Mindfulness Primer</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Introduction to techniques we'll explore during the retreat
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Video</Badge>
                    <Badge variant="outline">Preparation</Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-brand-subtle/5 transition-colors">
                  <h3 className="font-medium text-lg">Location & Travel Information</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Detailed directions, local amenities, and travel tips
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Web</Badge>
                    <Badge variant="outline">Logistics</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Community Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Connect with your fellow retreat participants and build meaningful relationships.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mock member data */}
                  {[
                    { name: "Sarah Johnson", role: "Retreat Leader", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
                    { name: "Michael Chen", role: "Participant", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
                    { name: "Emma Wilson", role: "Participant", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
                    { name: "David Rodriguez", role: "Assistant", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-brand-subtle/5 transition-colors">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedRetreatTabs;
