
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user?.email) {
          console.log("No user session or email found");
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        const userEmail = session.session.user.email.trim();
        console.log("Checking admin status for email:", userEmail);

        // Use a direct database query with no RLS issues
        const { data, error } = await supabase
          .rpc('is_admin', { user_email: userEmail });

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          console.log("Admin check result:", data);
          setIsAdmin(!!data);
          
          if (data) {
            console.log("Admin access granted");
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      console.log("Auth state changed, rechecking admin status");
      checkAdminStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, isLoading };
};
