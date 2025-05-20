
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) {
        console.log("No user, redirecting to login");
        toast.error("You must be logged in to access this page");
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        console.log("Admin check for:", user.email);
        
        // Ensure we get fresh data with no caching
        const { data: adminUser, error: queryError } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', user.email)
          .maybeSingle();
        
        if (queryError) {
          console.error("Admin query error:", queryError);
          throw queryError;
        }
        
        const adminStatus = !!adminUser;
        console.log("Admin status:", adminStatus, adminUser);
        setIsAdmin(adminStatus);
        
        if (!adminStatus) {
          console.log("User is not an admin, redirecting");
          toast.error("You don't have permission to access the admin area");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Admin check error:", err);
        setError(err instanceof Error ? err : new Error("Admin check failed"));
        toast.error("Error verifying admin status. Please try again.");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [user, navigate]);

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
