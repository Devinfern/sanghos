
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
