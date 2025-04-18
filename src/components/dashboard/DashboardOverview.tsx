
import React from "react";
import { Calendar, BookOpen, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/data";

interface DashboardOverviewProps {
  userData: {
    name: string;
    joinDate: string;
    completedRetreats: number;
    points: number;
  };
  upcomingRetreats: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    image: string;
  }>;
}

const DashboardOverview = ({ userData, upcomingRetreats }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-sage-500" />
              Upcoming Retreats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{upcomingRetreats.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-sage-500" />
              Completed Retreats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userData.completedRetreats}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-sage-500" />
              Community Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Active discussions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Upcoming Retreats</CardTitle>
          <CardDescription>
            The next wellness experiences on your calendar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingRetreats.length > 0 ? (
            <div className="space-y-4">
              {upcomingRetreats.map((retreat) => (
                <div key={retreat.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={retreat.image} 
                      alt={retreat.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{retreat.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{formatDate(retreat.date)}</span>
                      <Clock className="ml-3 mr-1 h-4 w-4" />
                      <span>{retreat.time}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/retreat/${retreat.id}`}>
                      Details
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">You don't have any upcoming retreats</p>
              <Button asChild>
                <Link to="/retreats">Browse Retreats</Link>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-end">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/retreats" className="flex items-center">
              View all retreats
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Wellness Journey</CardTitle>
          <CardDescription>
            Track your progress and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Membership Status</h3>
              <div className="flex items-center space-x-2">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  Active
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Your membership is active and renewed monthly
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-3">Upcoming Milestones</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-sage-500 mr-2"></div>
                  <span className="text-sm">50 more points until Silver tier</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-sage-500 mr-2"></div>
                  <span className="text-sm">Complete 3 more retreats for a free session</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
