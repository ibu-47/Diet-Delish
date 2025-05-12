import { createClient } from '@supabase/supabase-js';

// These environment variables will need to be set in a .env file
// after connecting to Supabase via the UI button
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  user_id: string;
  full_name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  diet_preference: string;
  created_at: string;
  updated_at: string;
};

export type MealPlan = {
  id: string;
  name: string;
  description: string;
  calories: number;
  diet_type: string;
  price: number;
  image_url: string;
};

export type Order = {
  id: string;
  user_id: string;
  meal_plan_id: string;
  status: string;
  delivery_address: string;
  delivery_date: string;
  tracking_number: string;
  created_at: string;
};