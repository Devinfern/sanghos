
import React from "react";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/data";

interface UserData {
  name: string;
  email: string;
  joinDate: string;
  membershipStatus: string;
  points: number;
  avatar?: string;
}

interface DashboardHeaderProps {
  userData: UserData;
  isAdmin: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userData, isAdmin }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        {userData.avatar && (
          <img 
            src={userData.avatar} 
            alt={`${userData.name}'s avatar`} 
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}</h1>
          <p className="text-muted-foreground">Track your wellness journey and upcoming experiences</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex items-center space-x-2">
        <Badge variant="outline" className="text-sm">
          Member since {formatDate(userData.joinDate)}
        </Badge>
        <Badge variant="secondary" className="bg-sage-100 text-sage-800">
          {userData.points} Points
        </Badge>
        {isAdmin && (
          <Badge variant="destructive" className="flex items-center">
            <Shield className="h-3.5 w-3.5 mr-1" /> Admin
          </Badge>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
