
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign, Plus } from 'lucide-react';
import { WellnessModule } from '@/types/wellness';

interface WellnessModuleCardProps {
  module: WellnessModule;
  onAdd: (module: WellnessModule) => void;
  isSelected?: boolean;
}

const WellnessModuleCard: React.FC<WellnessModuleCardProps> = ({ 
  module, 
  onAdd, 
  isSelected = false 
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  const categoryColors: Record<string, string> = {
    yoga: 'bg-purple-100 text-purple-800',
    meditation: 'bg-blue-100 text-blue-800',
    sound_healing: 'bg-green-100 text-green-800',
    breathwork: 'bg-orange-100 text-orange-800',
    cooking: 'bg-yellow-100 text-yellow-800',
    nature: 'bg-emerald-100 text-emerald-800',
  };

  return (
    <Card className={`h-full transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      {module.image_url && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={module.image_url} 
            alt={module.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{module.name}</CardTitle>
          <Badge 
            variant="secondary" 
            className={`shrink-0 ${categoryColors[module.category] || 'bg-gray-100 text-gray-800'}`}
          >
            {module.category.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {module.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{formatDuration(module.default_duration)} (flexible: {formatDuration(module.min_duration)}-{formatDuration(module.max_duration)})</span>
          </div>
          
          {module.max_participants && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>Max {module.max_participants} participants</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span>${module.base_price}/person</span>
          </div>
        </div>

        <div className="mt-3">
          <Badge variant="outline" className="text-xs">
            {module.difficulty_level}
          </Badge>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={() => onAdd(module)} 
          className="w-full"
          disabled={isSelected}
          variant={isSelected ? "secondary" : "default"}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isSelected ? 'Added' : 'Add to Retreat'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WellnessModuleCard;
