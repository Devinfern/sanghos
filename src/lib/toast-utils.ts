
import { toast } from "@/hooks/use-toast";

/**
 * Utility functions for displaying toast notifications
 */
export const showToast = {
  /**
   * Display a success toast notification
   */
  success: (message: string, title = "Success") => {
    toast({
      title,
      description: message,
    });
  },

  /**
   * Display an error toast notification
   */
  error: (message: string, title = "Error") => {
    toast({
      variant: "destructive",
      title,
      description: message,
    });
  },

  /**
   * Display an info toast notification
   */
  info: (message: string, title = "Information") => {
    toast({
      title,
      description: message,
    });
  }
};
