/*
  # Update meal plans schema for personalized diets

  1. Modified Tables
    - `meal_plans` - Updated to support subscription types
    - Added `meal_options` table for customizable meals
    - Added `user_meal_preferences` table for personalized selections

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Meal Plans Table
CREATE TABLE IF NOT EXISTS meal_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL, -- 'weight_loss', 'weight_gain', 'muscle_gain', 'general'
  description text,
  price integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Meal Options Table
CREATE TABLE IF NOT EXISTS meal_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id uuid REFERENCES meal_plans(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  calories integer NOT NULL,
  protein float NOT NULL,
  carbs float NOT NULL,
  fats float NOT NULL,
  diet_type text NOT NULL, -- 'veg', 'non-veg', 'vegan'
  meal_type text NOT NULL, -- 'breakfast', 'lunch', 'dinner', 'snack'
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- User Meal Preferences
CREATE TABLE IF NOT EXISTS user_meal_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_plan_id uuid REFERENCES meal_plans(id) ON DELETE CASCADE,
  meal_options jsonb NOT NULL, -- Store selected meal options for each day
  diet_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_meal_preferences ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view meal plans"
  ON meal_plans FOR SELECT TO public;

CREATE POLICY "Anyone can view meal options"
  ON meal_options FOR SELECT TO public;

CREATE POLICY "Users can manage their meal preferences"
  ON user_meal_preferences
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert base meal plans
INSERT INTO meal_plans (name, type, description, price) VALUES 
  ('Weight Loss Plan', 'weight_loss', 'Scientifically designed meal plan for effective weight loss', 2000),
  ('Weight Gain Plan', 'weight_gain', 'Balanced nutrition plan for healthy weight gain', 2200),
  ('Muscle Gain Plan', 'muscle_gain', 'High-protein diet plan for muscle building', 2500),
  ('General Health Plan', 'general', 'Well-balanced diet for maintaining overall health', 1800);