
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WellnessModule, ModuleCategory, DifficultyLevel, convertToWellnessModule } from '@/types/wellness';
import { toast } from 'sonner';

export const useWellnessModules = () => {
  const [modules, setModules] = useState<WellnessModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = async (category?: ModuleCategory, difficulty?: DifficultyLevel) => {
    try {
      setLoading(true);
      let query = supabase.from('wellness_modules').select('*');
      
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      
      if (difficulty && difficulty !== 'all') {
        query = query.eq('difficulty_level', difficulty);
      }
      
      const { data, error } = await query.order('category', { ascending: true });
      
      if (error) throw error;
      
      // Convert Supabase rows to WellnessModule interface
      const convertedModules = (data || []).map(convertToWellnessModule);
      setModules(convertedModules);
      setError(null);
    } catch (err) {
      console.error('Error fetching wellness modules:', err);
      setError('Failed to load wellness modules');
      toast.error('Failed to load wellness modules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return {
    modules,
    loading,
    error,
    refetch: fetchModules
  };
};
