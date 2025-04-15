
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
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        console.log("Checking admin status for email:", session.session.user.email);

        const { data, error } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', session.session.user.email.trim())
          .maybeSingle();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          const isUserAdmin = !!data;
          console.log("Is admin:", isUserAdmin, "Data:", data);
          setIsAdmin(isUserAdmin);
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
      checkAdminStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, isLoading };
};
