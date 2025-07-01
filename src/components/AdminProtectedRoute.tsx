
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
        
        // Use Edge Function for more reliable admin check with correct URL and key
        const response = await fetch(`https://raijubzrdhwizxtupguy.supabase.co/functions/v1/is_user_admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaWp1YnpyZGh3aXp4dHVwZ3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NjkxODgsImV4cCI6MjA2MDI0NTE4OH0.vx5h9SHjv5XQ29kYi9sKjNNHc2f6_Nv-3wV27nHh2K8`
          },
          body: JSON.stringify({ email: user.email })
        });
        
        if (!response.ok) {
          throw new Error(`Edge function call failed with status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("Edge function admin check result:", result);
        
        const adminStatus = result.isAdmin;
        setIsAdmin(adminStatus);
        
        if (!adminStatus) {
          console.log("User is not an admin, redirecting");
          toast.error("You don't have permission to access the admin area");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Edge function admin check error:", err);
        
        // Fallback to direct query if edge function fails
        try {
          console.log("Trying fallback admin check for:", user.email);
          const { data: adminUser, error: queryError } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', user.email)
            .maybeSingle();
          
          if (queryError) {
            console.error("Fallback admin query error:", queryError);
            throw queryError;
          }
          
          const adminStatus = !!adminUser;
          console.log("Fallback admin status:", adminStatus, adminUser);
          setIsAdmin(adminStatus);
          
          if (!adminStatus) {
            console.log("User is not an admin (fallback check), redirecting");
            toast.error("You don't have permission to access the admin area");
            navigate("/dashboard");
          }
        } catch (fallbackErr) {
          console.error("Admin check failed completely:", fallbackErr);
          setError(fallbackErr instanceof Error ? fallbackErr : new Error("Admin check failed"));
          toast.error("Error verifying admin status. Please try again.");
          navigate("/dashboard");
        }
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
