
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings, PlusCircle, LayoutGrid } from "lucide-react";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Admin Tools</CardTitle>
        <CardDescription>
          Access administrative tools and content management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Admin CMS</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage events, retreats, and community content
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/admin/cms")}
                >
                  Open Admin CMS
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Retreat Management</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create and manage retreat listings easily
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/retreat-management")}
                >
                  Manage Retreats
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/retreat-management")}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Retreat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAdmin;
