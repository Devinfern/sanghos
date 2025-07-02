
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

export interface SelectedModule extends WellnessModule {
  customDuration: number;
  startTime?: string;
  date?: string;
  sortOrder: number;
  // Add missing properties that components expect
  name?: string; // For display purposes, can fall back to title
  default_duration?: number; // Default duration for calculations
  min_duration?: number; // Minimum allowed duration
  max_duration?: number; // Maximum allowed duration
  base_price?: number; // Base price for pricing calculations
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

// Helper function to convert WellnessModule to SelectedModule with defaults
export function convertToSelectedModule(module: WellnessModule, sortOrder: number = 0): SelectedModule {
  return {
    ...module,
    customDuration: module.duration_minutes || 60,
    sortOrder,
    name: module.title, // Use title as name
    default_duration: module.duration_minutes || 60,
    min_duration: Math.max((module.duration_minutes || 60) - 30, 15), // 30 minutes less, minimum 15
    max_duration: (module.duration_minutes || 60) + 60, // 60 minutes more
    base_price: 50, // Default base price since it's not in the database
  };
}
