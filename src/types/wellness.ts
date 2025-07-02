
import { Tables } from '@/integrations/supabase/types';

// Base Supabase type for wellness modules
export type WellnessModuleRow = Tables<'wellness_modules'>;

// Use the actual database schema for WellnessModule
export interface WellnessModule {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  difficulty_level: string | null;
  duration_minutes: number | null;
  content?: string | null;
  video_url?: string | null;
  materials?: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface RetreatModule {
  id: string;
  retreat_id: string;
  module_id: string;
  custom_name: string | null;
  custom_description: string | null;
  custom_duration: number;
  scheduled_start_time: string | null;
  scheduled_date: string | null;
  sort_order: number;
  custom_price: number | null;
  created_at: string;
  updated_at: string;
  wellness_module?: WellnessModule;
}

export interface RetreatTemplate {
  id: string;
  creator_id: string;
  name: string;
  description: string | null;
  category: string | null;
  is_public: boolean;
  total_duration: number | null;
  estimated_price: number | null;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

export interface RetreatTemplateModule {
  id: string;
  template_id: string;
  module_id: string;
  custom_duration: number;
  scheduled_start_time: string | null;
  scheduled_date: string | null;
  sort_order: number;
  created_at: string;
  wellness_module?: WellnessModule;
}

export interface SelectedModule extends WellnessModule {
  customDuration: number;
  startTime?: string;
  date?: string;
  sortOrder: number;
}

export type ModuleCategory = 'yoga' | 'meditation' | 'sound_healing' | 'breathwork' | 'cooking' | 'nature' | 'all';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

// Type guard to validate difficulty level
export function isValidDifficultyLevel(level: string): level is 'beginner' | 'intermediate' | 'advanced' {
  return ['beginner', 'intermediate', 'advanced'].includes(level);
}

// Function to convert Supabase row to WellnessModule
export function convertToWellnessModule(row: WellnessModuleRow): WellnessModule {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    difficulty_level: row.difficulty_level,
    duration_minutes: row.duration_minutes,
    content: row.content,
    video_url: row.video_url,
    materials: row.materials,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
