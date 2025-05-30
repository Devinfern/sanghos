
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Clock, Trash2, GripVertical } from 'lucide-react';
import { SelectedModule } from '@/types/wellness';

interface RetreatScheduleProps {
  selectedModules: SelectedModule[];
  onUpdateModule: (moduleId: string, updates: Partial<SelectedModule>) => void;
  onRemoveModule: (moduleId: string) => void;
  onReorderModules: (modules: SelectedModule[]) => void;
}

const RetreatSchedule: React.FC<RetreatScheduleProps> = ({
  selectedModules,
  onUpdateModule,
  onRemoveModule,
  onReorderModules
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  const getTotalDuration = () => {
    return selectedModules.reduce((total, module) => total + module.customDuration, 0);
  };

  if (selectedModules.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Retreat Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No modules selected yet. Add modules from the library to build your retreat schedule.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Retreat Schedule</CardTitle>
          <Badge variant="secondary">
            Total: {formatDuration(getTotalDuration())}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {selectedModules.map((module, index) => (
          <Card key={module.id} className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{module.name}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveModule(module.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor={`duration-${module.id}`}>Duration (minutes)</Label>
                      <Input
                        id={`duration-${module.id}`}
                        type="number"
                        min={module.min_duration}
                        max={module.max_duration}
                        value={module.customDuration}
                        onChange={(e) => onUpdateModule(module.id, { 
                          customDuration: parseInt(e.target.value) || module.default_duration 
                        })}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Range: {module.min_duration}-{module.max_duration} min
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`time-${module.id}`}>Start Time</Label>
                      <Input
                        id={`time-${module.id}`}
                        type="time"
                        value={module.startTime || ''}
                        onChange={(e) => onUpdateModule(module.id, { startTime: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`date-${module.id}`}>Date (optional)</Label>
                      <Input
                        id={`date-${module.id}`}
                        type="date"
                        value={module.date || ''}
                        onChange={(e) => onUpdateModule(module.id, { date: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(module.customDuration)}</span>
                    <Badge variant="outline" className="text-xs">
                      {module.difficulty_level}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ${module.base_price}/person
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default RetreatSchedule;
