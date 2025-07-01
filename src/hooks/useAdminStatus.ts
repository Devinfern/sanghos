
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) {
        console.log("No user email available, cannot check admin status");
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        console.log("Checking admin status for email:", user.email);
        
        // Use the Edge Function for admin verification
        const response = await fetch(`https://raijubzrdhwizxtupguy.supabase.co/functions/v1/is_user_admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaWp1YnpyZGh3aXp4dHVwZ3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NjkxODgsImV4cCI6MjA2MDI0NTE4OH0.vx5h9SHjv5XQ29kYi9sKjNNHc2f6_Nv-3wV27nHh2K8`
          },
          body: JSON.stringify({ email: user.email })
        });
        
        if (!response.ok) {
          throw new Error(`Admin check failed with status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("Admin check response:", result);
        
        setIsAdmin(result.isAdmin);
      } catch (err) {
        console.error("Error checking admin status:", err);
        setError(err instanceof Error ? err : new Error('Unknown error checking admin status'));
        
        // Fallback to direct query if Edge Function fails
        try {
          console.log("Trying fallback admin check for:", user.email);
          const { data: adminData, error: queryError } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', user.email)
            .maybeSingle();
          
          if (queryError) {
            console.error("Fallback admin check failed:", queryError);
            throw queryError;
          }
          
          const isAdminUser = !!adminData;
          console.log("Fallback admin check result:", isAdminUser, adminData);
          setIsAdmin(isAdminUser);
        } catch (fallbackErr) {
          console.error("Fallback admin check also failed:", fallbackErr);
          // Default to not admin on all errors
          setIsAdmin(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) {
      checkAdminStatus();
    } else {
      setIsLoading(false);
      setIsAdmin(false);
    }
  }, [user]);

  return { isAdmin, isLoading, error };
}
