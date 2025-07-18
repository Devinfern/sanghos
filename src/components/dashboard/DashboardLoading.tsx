
import React from "react";

const DashboardLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardLoading;
