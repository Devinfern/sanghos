
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Temporary types until Supabase types regenerate
type HostStatus = 'pending' | 'approved' | 'suspended' | 'rejected';

interface Host {
  id: string;
  user_id: string;
  business_name: string;
  business_email: string;
  phone?: string;
  bio?: string;
  specialties?: string[];
  years_experience?: number;
  verification_documents?: string[];
  status: HostStatus;
  commission_rate?: number;
  stripe_account_id?: string;
  created_at: string;
  updated_at: string;
}

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
      // Use type assertion temporarily until types regenerate
      const { data, error } = await (supabase as any)
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
