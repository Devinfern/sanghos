
import React from "react";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardRetreats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Retreat History</CardTitle>
        <CardDescription>
          View all your past and upcoming retreat experiences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Retreat History</h3>
          <p className="text-muted-foreground mb-6">
            This section will show all your retreat bookings and history
          </p>
          <Button>View All Bookings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardRetreats;
