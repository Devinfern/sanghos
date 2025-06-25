
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';

type HostStatus = Database['public']['Enums']['host_status'];
type Host = Database['public']['Tables']['hosts']['Row'];

export const useHostStatus = () => {
  const { user } = useAuth();
  const [hostProfile, setHostProfile] = useState<Host | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHostProfile();
    } else {
      setHostProfile(null);
      setIsLoading(false);
    }
  }, [user]);

  const fetchHostProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('hosts')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching host profile:', error);
        return;
      }

      setHostProfile(data);
    } catch (error) {
      console.error('Error fetching host profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isHost = hostProfile?.status === 'approved';
  const isPendingHost = hostProfile?.status === 'pending';

  return {
    hostProfile,
    isHost,
    isPendingHost,
    isLoading,
    refetch: fetchHostProfile
  };
};
