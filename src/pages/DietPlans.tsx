import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { useToast } from '../components/ui/toaster';
import { Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MealPlan, MealOption } from '../lib/supabase';

function DietPlans() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [dietType, setDietType] = useState<'veg' | 'non-veg' | 'vegan'>('veg');
  const [mealOptions, setMealOptions] = useState<MealOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCustomization, setShowCustomization] = useState(false);

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    try {
      const { data: mealPlans, error } = await supabase
        .from('meal_plans')
        .select('*');

      if (error) throw error;

      if (mealPlans?.length > 0) {
        setSelectedPlan(mealPlans[0]);
      }

      setIsLoading(false);
    } catch (error) {
      addToast('Failed to load meal plans', 'error');
      setIsLoading(false);
    }
  };

  const fetchMealOptions = async (planId: string) => {
    try {
      const { data: options, error } = await supabase
        .from('meal_options')
        .select('*')
        .eq('meal_plan_id', planId)
        .eq('diet_type', dietType);

      if (error) throw error;
      setMealOptions(options || []);
    } catch (error) {
      addToast('Failed to load meal options', 'error');
    }
  };

  const handlePlanSelect = async (plan: MealPlan) => {
    setSelectedPlan(plan);
    await fetchMealOptions(plan.id);
  };

  const handleDietTypeChange = async (type: 'veg' | 'non-veg' | 'vegan') => {
    setDietType(type);
    if (selectedPlan) {
      await fetchMealOptions(selectedPlan.id);
    }
  };

  const handleCustomize = () => {
    if (!user) {
      addToast('Please login to customize your meal plan', 'info');
      navigate('/login');
      return;
    }
    setShowCustomization(true);
  };

  const getPlanIcon = (type: string) => {
    switch (type) {
      case 'weight_loss':
        return '⚖️';
      case 'weight_gain':
        return '💪';
      case 'muscle_gain':
        return '🏋️';
      default:
        return '🥗';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Choose Your Meal Plan</h1>
        <p className="text-gray-600 text-center mb-8">
          Select a plan and customize it to your preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {['weight_loss', 'weight_gain', 'muscle_gain', 'general'].map((type) => (
          <motion.div
            key={type}
            className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
              selectedPlan?.type === type ? 'ring-2 ring-brand-500' : ''
            }`}
            whileHover={{ y: -5 }}
            onClick={() => handlePlanSelect(selectedPlan!)}
          >
            <div className="text-4xl mb-4">{getPlanIcon(type)}</div>
            <h3 className="text-xl font-semibold mb-2">
              {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Plan
            </h3>
            <p className="text-gray-600 mb-4">
              {type === 'weight_loss' && 'Scientifically designed for effective weight loss'}
              {type === 'weight_gain' && 'Balanced nutrition for healthy weight gain'}
              {type === 'muscle_gain' && 'High-protein diet for muscle building'}
              {type === 'general' && 'Well-balanced diet for overall health'}
            </p>
            <div className="text-2xl font-bold text-brand-600">
              ₹{type === 'weight_loss' ? '2000' : type === 'weight_gain' ? '2200' : type === 'muscle_gain' ? '2500' : '1800'}
              <span className="text-sm font-normal text-gray-600">/month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Customize Your Plan</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diet Preference
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['veg', 'non-veg', 'vegan'].map((type) => (
              <button
                key={type}
                className={`p-4 rounded-lg border ${
                  dietType === type 
                    ? 'bg-brand-50 border-brand-500 text-brand-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleDietTypeChange(type as 'veg' | 'non-veg' | 'vegan')}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCustomize}
          className="w-full btn-primary py-3 text-lg"
        >
          Customize Your Meals
        </button>
      </div>

      {showCustomization && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Your Personalized Meal Options</h2>
          
          {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
            <div key={mealType} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 capitalize">{mealType}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mealOptions
                  .filter(option => option.meal_type === mealType)
                  .map(option => (
                    <div key={option.id} className="border rounded-lg p-4">
                      <img 
                        src={option.image_url} 
                        alt={option.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h4 className="font-semibold mb-2">{option.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                      <div className="text-sm">
                        <span className="font-medium">Calories:</span> {option.calories} kcal
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Protein:</span> {option.protein}g
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Carbs:</span> {option.carbs}g
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Fats:</span> {option.fats}g
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DietPlans;