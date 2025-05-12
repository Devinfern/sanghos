
import { supabase } from "@/integrations/supabase/client";

// Demo login helper
export const createDemoUser = () => {
  const demoUser = {
    id: 'demo-user-id',
    name: 'Demo User',
    email: 'demo@example.com',
    avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  };
  
  localStorage.setItem('sanghos_user', JSON.stringify(demoUser));
  return demoUser;
};

export const getDemoUser = () => {
  const userString = localStorage.getItem('sanghos_user');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};
