
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';

type SubscriptionTier = Database['public']['Enums']['subscription_tier'];
type Subscriber = Database['public']['Tables']['subscribers']['Row'];

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscriber | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setSubscription(null);
      setIsLoading(false);
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasAccess = (requiredTier: SubscriptionTier): boolean => {
    if (!subscription || !subscription.subscribed) {
      return requiredTier === 'free';
    }

    const tierHierarchy = ['free', 'basic', 'premium', 'enterprise'];
    const userTierIndex = tierHierarchy.indexOf(subscription.subscription_tier);
    const requiredTierIndex = tierHierarchy.indexOf(requiredTier);

    return userTierIndex >= requiredTierIndex;
  };

  const createSubscription = async (email: string, tier: SubscriptionTier) => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .insert([
          {
            user_id: user?.id,
            email,
            subscription_tier: tier,
            subscribed: tier !== 'free'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      
      setSubscription(data);
      return data;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  };

  return {
    subscription,
    isLoading,
    hasAccess,
    createSubscription,
    refetch: fetchSubscription
  };
};
