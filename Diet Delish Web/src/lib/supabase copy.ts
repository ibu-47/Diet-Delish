import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type MealPlan = {
  id: string;
  name: string;
  type: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'general';
  description: string;
  price: number;
};

export type MealOption = {
  id: string;
  meal_plan_id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  diet_type: 'veg' | 'non-veg' | 'vegan';
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  image_url: string;
};

export type UserMealPreference = {
  id: string;
  user_id: string;
  meal_plan_id: string;
  meal_options: Record<string, string[]>; // Day -> meal option IDs
  diet_type: 'veg' | 'non-veg' | 'vegan';
};