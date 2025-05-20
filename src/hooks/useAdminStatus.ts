
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
        
        // Direct query using the fixed RLS policy
        const { data: adminData, error: queryError } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', user.email)
          .maybeSingle();
        
        if (queryError) {
          console.error("Error querying admin table:", queryError);
          throw queryError;
        }
        
        const isAdminUser = !!adminData;
        console.log("Admin check result:", isAdminUser, adminData);
        setIsAdmin(isAdminUser);
      } catch (err) {
        console.error("Error checking admin status:", err);
        setError(err instanceof Error ? err : new Error('Unknown error checking admin status'));
        // Default to not admin on error
        setIsAdmin(false);
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
