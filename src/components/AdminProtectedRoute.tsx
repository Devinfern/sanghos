
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Shield } from "lucide-react";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading, error } = useAdminStatus();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("No user, redirecting to login");
      toast.error("You must be logged in to access this page");
      navigate("/login");
      return;
    }

    console.log("Admin route check:", { 
      email: user?.email, 
      isAdmin, 
      isLoading 
    });
    
    // Only redirect if admin check is complete and user is not an admin
    if (!isLoading && !isAdmin) {
      console.log("User is not an admin, redirecting");
      toast.error("You don't have permission to access the admin area");
      navigate("/dashboard");
    }
    
    if (error) {
      console.error("Admin check error:", error);
      toast.error("Error verifying admin status. Please try again.");
    }
  }, [isAdmin, isLoading, error, navigate, user]);

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
    console.log("Admin access granted, rendering admin content");
    return <>{children}</>;
  }
  
  // Return null during the redirect handled by useEffect
  return null;
};

export default AdminProtectedRoute;
