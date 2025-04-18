
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DashboardAccountProps {
  userData: {
    name: string;
    email: string;
  };
}

const DashboardAccount = ({ userData }: DashboardAccountProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your profile and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Name</p>
                <p className="text-muted-foreground">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Email</p>
                <p className="text-muted-foreground">{userData.email}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-3">Preferences</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Email Notifications</p>
                <p className="text-muted-foreground">You are receiving all notifications</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAccount;
