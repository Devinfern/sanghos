
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
        
        // Try the direct table query first as it's more reliable
        const { data: adminData, error: queryError } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', user.email)
          .maybeSingle();
        
        if (queryError) {
          console.error("Error querying admin table:", queryError);
          
          // Only fall back to RPC if the direct query fails
          const { data: isAdminData, error: funcError } = await supabase.rpc('is_admin', {
            user_email: user.email
          });
          
          if (funcError) {
            console.error("Error with is_admin RPC:", funcError);
            throw funcError;
          }
          
          console.log("Admin check via RPC:", isAdminData);
          setIsAdmin(!!isAdminData);
        } else {
          const isAdminUser = !!adminData;
          console.log("Admin check via direct query:", isAdminUser, adminData);
          setIsAdmin(isAdminUser);
        }
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
