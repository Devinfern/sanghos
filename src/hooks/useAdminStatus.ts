
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
          return;
        }

        const { data, error } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', session.session.user.email)
          .single();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          return;
        }

        setIsAdmin(!!data);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, isLoading };
};

