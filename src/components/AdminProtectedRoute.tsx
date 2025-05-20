
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { toast } from "sonner";
import { Shield } from "lucide-react";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading } = useAdminStatus();
  const navigate = useNavigate();

  useEffect(() => {
    // Only show toast and redirect when admin status is definitively determined as false
    if (!isLoading && !isAdmin) {
      toast.error("You don't have permission to access the admin area");
      navigate("/dashboard");
    }
  }, [isAdmin, isLoading, navigate]);

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <div className="text-lg font-medium">Verifying admin access...</div>
        <div className="text-sm text-muted-foreground">This may take a moment</div>
      </div>
    );
  }

  // If user is admin, render the children (admin content)
  if (isAdmin) {
    return <>{children}</>;
  }
  
  // Return null during the redirect handled by useEffect
  return null;
};

export default AdminProtectedRoute;
