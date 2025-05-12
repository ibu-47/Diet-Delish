/*
  # Create meal plans tables

  1. New Tables
    - `meal_plans` - Stores information about available meal plans
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `calories` (integer)
      - `diet_type` (text)
      - `price` (integer) - in cents/paisa
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `orders` - Stores user orders
      - `id` (uuid, primary key) 
      - `user_id` (uuid, references auth.users.id)
      - `status` (text)
      - `delivery_address` (text)
      - `delivery_date` (timestamptz)
      - `tracking_number` (text)
      - `created_at` (timestamptz)
    - `order_items` - Stores items within orders
      - `id` (uuid, primary key)
      - `order_id` (uuid, references orders.id)
      - `meal_plan_id` (uuid, references meal_plans.id)
      - `quantity` (integer)
      - `price` (integer) - price at time of order
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to meal plans
    - Add policies for authenticated users to read/write their own orders
*/

-- Meal Plans Table
CREATE TABLE IF NOT EXISTS meal_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  calories integer NOT NULL,
  diet_type text NOT NULL,
  price integer NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'processing',
  delivery_address text NOT NULL,
  delivery_date timestamptz,
  tracking_number text,
  total_amount integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  meal_plan_id uuid REFERENCES meal_plans(id) ON DELETE SET NULL,
  quantity integer NOT NULL DEFAULT 1,
  price integer NOT NULL -- Price at time of order
);

-- Update function for updated_at column
CREATE OR REPLACE FUNCTION update_meal_plans_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger for meal_plans table
CREATE TRIGGER update_meal_plans_updated_at
BEFORE UPDATE ON meal_plans
FOR EACH ROW
EXECUTE FUNCTION update_meal_plans_updated_at();

-- Enable Row Level Security
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies for meal_plans
CREATE POLICY "Anyone can view meal plans"
  ON meal_plans
  FOR SELECT
  TO public;

-- Policies for orders
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policies for order_items
CREATE POLICY "Users can view their own order items"
  ON order_items
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can create their own order items"
  ON order_items
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));

-- Insert sample meal plans
INSERT INTO meal_plans (name, description, calories, diet_type, price, image_url)
VALUES 
  ('Vegetarian Starter Plan', 'Perfect for those just starting their vegetarian journey. Balanced nutrition with delicious plant-based options.', 1500, 'Vegetarian', 1200, 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
  ('High Protein Non-Veg Plan', 'Protein-rich plan with lean meats, perfect for those looking to build muscle and stay fit.', 2000, 'Non-Vegetarian', 1500, 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
  ('Vegan Delight', 'A complete plant-based meal plan with all essential nutrients and protein sources.', 1800, 'Vegan', 1350, 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
  ('Weight Loss Special', 'Low-calorie meals that don't compromise on taste. Designed for effective weight management.', 1200, 'Vegetarian', 1400, 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
  ('Keto Non-Veg Plan', 'High-fat, low-carb meal plan with meat options for those following a ketogenic diet.', 2200, 'Non-Vegetarian', 1700, 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
  ('Athletic Performance', 'Balanced macros with higher calories for active individuals and athletes.', 2500, 'Non-Vegetarian', 1800, 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');