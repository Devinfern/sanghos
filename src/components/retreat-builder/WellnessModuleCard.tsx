
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign, Plus } from 'lucide-react';
import { WellnessModule } from '@/hooks/useWellnessModules';

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
  const formatDuration = (minutes: number | null) => {
    if (!minutes) return 'N/A';
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
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
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
          {module.description || 'No description available'}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{formatDuration(module.duration_minutes)}</span>
          </div>
        </div>

        <div className="mt-3">
          <Badge variant="outline" className="text-xs">
            {module.difficulty_level || 'beginner'}
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
