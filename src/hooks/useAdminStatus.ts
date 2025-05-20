
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (!sessionData.session) {
          console.log("No active session found");
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        const userEmail = sessionData.session.user.email;
        console.log("Checking admin status for:", userEmail);
        
        // Option 1: Check using database function directly
        const { data: isAdminData, error: funcError } = await supabase.rpc('is_admin', {
          user_email: userEmail
        });
        
        if (funcError) {
          console.error("Error with is_admin RPC:", funcError);
          
          // Option 2: Fall back to direct table query as backup
          const { data: adminData, error: queryError } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', userEmail)
            .maybeSingle();
            
          if (queryError) {
            console.error("Error querying admin table:", queryError);
            throw queryError;
          }
          
          const isAdminUser = !!adminData;
          console.log("Admin check via direct query:", isAdminUser, adminData);
          setIsAdmin(isAdminUser);
        } else {
          console.log("Admin check via RPC:", isAdminData);
          setIsAdmin(!!isAdminData);
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
        setError(err instanceof Error ? err : new Error('Unknown error checking admin status'));
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  return { isAdmin, isLoading, error };
}
