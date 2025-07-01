
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Temporary types until Supabase types regenerate
export type ModuleCategory = 'meditation' | 'yoga' | 'breathwork' | 'mindfulness' | 'movement' | 'nutrition' | 'all';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

export interface WellnessModule {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficulty_level: string;
  duration_minutes: number;
  content?: string;
  video_url?: string;
  materials?: string[];
  created_at: string;
  updated_at: string;
}

export const useWellnessModules = () => {
  const [modules, setModules] = useState<WellnessModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = async (category?: ModuleCategory, difficulty?: DifficultyLevel) => {
    try {
      setLoading(true);
      // Use type assertion temporarily until types regenerate
      let query = (supabase as any).from('wellness_modules').select('*');
      
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      
      if (difficulty && difficulty !== 'all') {
        query = query.eq('difficulty_level', difficulty);
      }
      
      const { data, error } = await query.order('category', { ascending: true });
      
      if (error) throw error;
      
      setModules(data || []);
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
