
import { Tables } from '@/integrations/supabase/types';

// Base Supabase type for wellness modules
export type WellnessModuleRow = Tables<'wellness_modules'>;

// Wellness module and retreat builder types
export interface WellnessModule {
  id: string;
  name: string;
  category: string;
  description: string;
  default_duration: number;
  min_duration: number;
  max_duration: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  equipment_needed: string[];
  space_requirements: string;
  max_participants: number | null;
  base_price: number;
  instructor_specialties: string[];
  tags: string[];
  image_url: string | null;
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
    name: row.name,
    category: row.category,
    description: row.description,
    default_duration: row.default_duration,
    min_duration: row.min_duration,
    max_duration: row.max_duration,
    difficulty_level: isValidDifficultyLevel(row.difficulty_level) ? row.difficulty_level : 'beginner',
    equipment_needed: row.equipment_needed || [],
    space_requirements: row.space_requirements || '',
    max_participants: row.max_participants,
    base_price: row.base_price,
    instructor_specialties: row.instructor_specialties || [],
    tags: row.tags || [],
    image_url: row.image_url,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
