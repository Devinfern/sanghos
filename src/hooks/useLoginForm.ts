
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type ConnectionStatus = "checking" | "connected" | "error" | "project_not_found";

export const useLoginForm = (connectionStatus: ConnectionStatus) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (connectionStatus === "error") {
      setError("Cannot log in while database connection is unavailable.");
      return;
    }
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        console.error("Login error:", signInError);
        throw new Error(signInError.message);
      }

      if (!data.user) {
        throw new Error("No user returned from login");
      }

      localStorage.setItem("sanghos_user", JSON.stringify({
        email: data.user.email,
        name: data.user.email?.split('@')[0] || 'User'
      }));
      
      toast.success("Login successful!");
      
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (err.message.includes("Email not confirmed")) {
          setError("Your email has not been confirmed. Please check your inbox for a confirmation email.");
        } else if (err.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else if (err.message.includes("connection") || err.message.includes("network")) {
          setError("Connection issue. Please check your internet and try again.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    error,
    handleSubmit
  };
};
