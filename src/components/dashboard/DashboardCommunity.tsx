
import React from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardCommunity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Participation</CardTitle>
        <CardDescription>
          Connect with other members and join the conversation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Join the Community</h3>
          <p className="text-muted-foreground mb-6">
            Connect with like-minded individuals on your wellness journey
          </p>
          <Button asChild>
            <Link to="/community">Go to Community</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCommunity;
