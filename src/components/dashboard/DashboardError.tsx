
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardError: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-muted-foreground mb-4">Unable to load user data</p>
        <Button onClick={() => navigate("/login")}>Back to Login</Button>
      </div>
    </div>
  );
};

export default DashboardError;
