
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to access this page");
        setIsAuthenticated(false);
        return;
      }
      
      setIsAuthenticated(true);
    };
    
    checkAuth();
  }, [navigate]);

  // Show loading state while checking
  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <div className="text-lg font-medium">Checking authentication...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};
