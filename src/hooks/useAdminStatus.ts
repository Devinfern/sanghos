
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

        const { data, error } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', userEmail)
          .maybeSingle();

        if (error) {
          console.error('Error checking admin status:', error);
          // Don't show error toast, just log to console
          setIsAdmin(false);
        } else {
          const isUserAdmin = !!data;
          console.log("Is admin:", isUserAdmin, "Data:", data);
          
          // If user is admin, let them know, but only once
          if (isUserAdmin) {
            console.log("Admin access granted");
          }
          
          setIsAdmin(isUserAdmin);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        // Don't show error toast, just log to console
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
