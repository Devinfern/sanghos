
import { useState, useEffect } from 'react';
import { supabase, SUPABASE_PROJECT_URL } from '@/integrations/supabase/client';

type ConnectionStatus = "checking" | "connected" | "error" | "project_not_found";

export const useSupabaseConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("Checking Supabase connection to:", SUPABASE_PROJECT_URL);
        const { error } = await supabase.from('forum_posts').select('count', { count: 'exact', head: true });
        
        if (error) {
          console.error("Supabase connection error:", error);
          if (error.message.includes("The resource was not found") || error.message.includes("does not exist")) {
            setConnectionStatus("project_not_found");
            setError("The Supabase project does not exist or is no longer accessible. Please check your project configuration.");
          } else if (error.message.includes("connection") || error.message.includes("network") || error.message.includes("fetch")) {
            setConnectionStatus("error");
            setError("Unable to connect to Supabase. Please check your internet connection.");
          } else {
            setConnectionStatus("error");
            setError(error.message);
          }
        } else {
          setConnectionStatus("connected");
          console.log("Successfully connected to Supabase");
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
        setConnectionStatus("error");
        setError("Unable to establish a connection to the database.");
      }
    };

    checkConnection();
  }, []);

  return { connectionStatus, error };
};
