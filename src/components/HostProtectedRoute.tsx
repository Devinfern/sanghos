
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useHost } from "@/contexts/HostContext";

const HostProtectedRoute = () => {
  const { host, isLoading } = useHost();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!host) {
    return <Navigate to="/host/login" />;
  }
  
  // If authenticated, render the child routes
  return <Outlet />;
};

export default HostProtectedRoute;
