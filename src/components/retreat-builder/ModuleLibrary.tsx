import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { useWellnessModules, WellnessModule, ModuleCategory, DifficultyLevel } from '@/hooks/useWellnessModules';
import { SelectedModule } from '@/types/wellness';
import WellnessModuleCard from './WellnessModuleCard';

interface ModuleLibraryProps {
  selectedModules: SelectedModule[];
  onAddModule: (module: WellnessModule) => void;
}

const ModuleLibrary: React.FC<ModuleLibraryProps> = ({ selectedModules, onAddModule }) => {
  const { modules, loading, refetch } = useWellnessModules();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ModuleCategory>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel>('all');

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (module.description && module.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || module.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || module.difficulty_level === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const applyFilters = () => {
    refetch(categoryFilter, difficultyFilter);
  };

  const isModuleSelected = (moduleId: string) => {
    return selectedModules.some(selected => selected.id === moduleId);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wellness Module Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading modules...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Wellness Module Library
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search modules by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={(value: ModuleCategory) => setCategoryFilter(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="meditation">Meditation</SelectItem>
                <SelectItem value="sound_healing">Sound Healing</SelectItem>
                <SelectItem value="breathwork">Breathwork</SelectItem>
                <SelectItem value="cooking">Cooking</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={difficultyFilter} onValueChange={(value: DifficultyLevel) => setDifficultyFilter(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={applyFilters} variant="outline">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Modules Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading modules...</p>
            </div>
          </div>
        ) : filteredModules.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No modules found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <WellnessModuleCard
                key={module.id}
                module={module}
                onAdd={onAddModule}
                isSelected={isModuleSelected(module.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModuleLibrary;
