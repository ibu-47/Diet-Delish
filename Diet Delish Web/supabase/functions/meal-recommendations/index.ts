import { createClient } from 'npm:@supabase/supabase-js@2.39.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface UserProfile {
  weight: number;
  height: number;
  age: number;
  gender: string;
  activity_level: string;
}

interface MealPlanRequest {
  profile: UserProfile;
  plan_type: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'general';
  diet_type: 'veg' | 'non-veg' | 'vegan';
}

// Calculate BMR using Mifflin-St Jeor Equation
function calculateBMR(profile: UserProfile): number {
  const { weight, height, age, gender } = profile;
  const bmr = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? bmr + 5 : bmr - 161;
}

// Calculate daily calorie needs
function calculateCalorieNeeds(bmr: number, activity_level: string): number {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return bmr * activityMultipliers[activity_level as keyof typeof activityMultipliers];
}

// Generate meal recommendations based on user profile and preferences
function generateMealRecommendations(request: MealPlanRequest, dailyCalories: number) {
  const { plan_type, diet_type } = request;
  
  // Adjust calories based on plan type
  let targetCalories = dailyCalories;
  switch (plan_type) {
    case 'weight_loss':
      targetCalories *= 0.8; // 20% deficit
      break;
    case 'weight_gain':
      targetCalories *= 1.2; // 20% surplus
      break;
    case 'muscle_gain':
      targetCalories *= 1.15; // 15% surplus with higher protein
      break;
  }

  // Calculate macronutrient distribution
  let proteinRatio, carbRatio, fatRatio;
  switch (plan_type) {
    case 'muscle_gain':
      proteinRatio = 0.35; // 35% protein
      carbRatio = 0.45; // 45% carbs
      fatRatio = 0.20; // 20% fat
      break;
    case 'weight_loss':
      proteinRatio = 0.40; // 40% protein
      carbRatio = 0.30; // 30% carbs
      fatRatio = 0.30; // 30% fat
      break;
    default:
      proteinRatio = 0.30; // 30% protein
      carbRatio = 0.40; // 40% carbs
      fatRatio = 0.30; // 30% fat
  }

  // Calculate grams of each macronutrient
  const proteinGrams = (targetCalories * proteinRatio) / 4; // 4 calories per gram of protein
  const carbGrams = (targetCalories * carbRatio) / 4; // 4 calories per gram of carbs
  const fatGrams = (targetCalories * fatRatio) / 9; // 9 calories per gram of fat

  return {
    daily_calories: Math.round(targetCalories),
    macros: {
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams),
      fats: Math.round(fatGrams),
    },
    meal_distribution: {
      breakfast: Math.round(targetCalories * 0.25),
      lunch: Math.round(targetCalories * 0.35),
      dinner: Math.round(targetCalories * 0.30),
      snacks: Math.round(targetCalories * 0.10),
    }
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profile, plan_type, diet_type } = await req.json() as MealPlanRequest;

    // Calculate base metabolic rate
    const bmr = calculateBMR(profile);
    
    // Calculate daily calorie needs
    const dailyCalories = calculateCalorieNeeds(bmr, profile.activity_level);
    
    // Generate personalized recommendations
    const recommendations = generateMealRecommendations(
      { profile, plan_type, diet_type },
      dailyCalories
    );

    return new Response(
      JSON.stringify(recommendations),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});