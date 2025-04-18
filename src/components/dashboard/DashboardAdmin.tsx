
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import EventURLInput from "@/components/admin/EventURLInput";
import { toast } from "sonner";

const DashboardAdmin = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Tools</CardTitle>
        <CardDescription>
          Quick tools for event and content management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <EventURLInput 
          onEventDataExtracted={(eventData) => {
            toast.success("Event data extracted successfully!");
          }} 
        />
      </CardContent>
    </Card>
  );
};

export default DashboardAdmin;
