
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useHost } from "@/contexts/HostContext";

interface HostProtectedRouteProps {
  children: React.ReactNode;
}

const HostProtectedRoute = ({ children }: HostProtectedRouteProps) => {
  const { host, isLoading } = useHost();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !host) {
      toast.error("You must be logged in as a host to access this page");
    }
  }, [host, isLoading]);

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <div className="text-lg font-medium">Checking host authentication...</div>
      </div>
    );
  }

  // If not authenticated, redirect to host login
  if (!host) {
    return <Navigate to="/host/login" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default HostProtectedRoute;
