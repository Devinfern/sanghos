
import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { toast } from "sonner";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading } = useAdminStatus();

  // Show loading state while checking
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mr-3"></div>
      <div>Verifying admin access...</div>
    </div>;
  }

  // If not admin, redirect to dashboard with a message
  if (!isAdmin) {
    toast.error("You don't have permission to access the admin area");
    return <Navigate to="/dashboard" />;
  }

  // If admin, render the children
  return <>{children}</>;
};

export default AdminProtectedRoute;
