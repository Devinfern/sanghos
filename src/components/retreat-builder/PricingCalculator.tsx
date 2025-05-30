
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Clock, Calculator } from 'lucide-react';
import { SelectedModule } from '@/types/wellness';

interface PricingCalculatorProps {
  selectedModules: SelectedModule[];
  capacity?: number;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ 
  selectedModules, 
  capacity = 20 
}) => {
  const calculateTotalPrice = () => {
    return selectedModules.reduce((total, module) => {
      // Calculate price based on duration ratio if different from default
      const durationRatio = module.customDuration / module.default_duration;
      const adjustedPrice = module.base_price * durationRatio;
      return total + adjustedPrice;
    }, 0);
  };

  const getTotalDuration = () => {
    return selectedModules.reduce((total, module) => total + module.customDuration, 0);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  const totalPrice = calculateTotalPrice();
  const totalDuration = getTotalDuration();
  const estimatedRevenue = totalPrice * capacity;

  if (selectedModules.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Pricing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Add modules to see pricing breakdown
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Pricing Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            Module Breakdown
          </h4>
          {selectedModules.map((module) => {
            const durationRatio = module.customDuration / module.default_duration;
            const adjustedPrice = module.base_price * durationRatio;
            
            return (
              <div key={module.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex-1">
                  <p className="font-medium text-sm">{module.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(module.customDuration)}</span>
                    {durationRatio !== 1 && (
                      <Badge variant="outline" className="text-xs">
                        {durationRatio > 1 ? '+' : ''}{Math.round((durationRatio - 1) * 100)}%
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${adjustedPrice.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="space-y-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Duration</span>
              </div>
              <p className="text-lg font-bold">{formatDuration(totalDuration)}</p>
            </div>
            
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Per Person</span>
              </div>
              <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Estimated Revenue</span>
            </div>
            <p className="text-2xl font-bold text-primary">${estimatedRevenue.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {capacity} participants
            </p>
          </div>
        </div>

        {/* Pricing Notes */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Prices adjust automatically based on module duration</p>
          <p>• Final pricing may include additional fees and taxes</p>
          <p>• Revenue estimate assumes full capacity</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCalculator;
