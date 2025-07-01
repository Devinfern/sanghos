
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown, Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

// Temporary type until Supabase types regenerate
type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise';

interface PremiumFeatureCardProps {
  title: string;
  description: string;
  requiredTier: SubscriptionTier;
  children: React.ReactNode;
  className?: string;
}

const PremiumFeatureCard = ({ 
  title, 
  description, 
  requiredTier, 
  children, 
  className = "" 
}: PremiumFeatureCardProps) => {
  const { hasAccess } = useSubscription();
  const userHasAccess = hasAccess(requiredTier);

  const getTierIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'basic': return <Sparkles className="w-4 h-4" />;
      case 'premium': return <Crown className="w-4 h-4" />;
      case 'enterprise': return <Crown className="w-4 h-4 text-purple-600" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-amber-100 text-amber-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {!userHasAccess && (
        <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center p-6">
            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <Badge className={getTierColor(requiredTier)}>
              {getTierIcon(requiredTier)}
              <span className="ml-1 capitalize">{requiredTier} Required</span>
            </Badge>
          </div>
        </div>
      )}
      <div className={userHasAccess ? '' : 'blur-sm'}>
        {children}
      </div>
    </Card>
  );
};

export default PremiumFeatureCard;
