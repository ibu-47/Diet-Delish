import { ShoppingBag, Plus } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useToast } from './ui/toaster';
import type { MealPlan } from '../lib/supabase';
import { motion } from 'framer-motion';

interface MealPlanCardProps {
  mealPlan: MealPlan;
}

const MealPlanCard = ({ mealPlan }: MealPlanCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { addToast } = useToast();

  const handleAddToCart = () => {
    addItem(mealPlan);
    addToast(`Added ${mealPlan.name} to cart`, 'success');
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={mealPlan.image_url} 
          alt={mealPlan.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{mealPlan.name}</h3>
          <span className="bg-brand-100 text-brand-800 px-2 py-1 rounded-full text-xs font-medium">
            {mealPlan.diet_type}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{mealPlan.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-accent-600 font-semibold">₹{mealPlan.price}</span>
          <span className="text-sm text-gray-500">{mealPlan.calories} kcal</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-brand-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-brand-700 transition"
        >
          <ShoppingBag size={18} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default MealPlanCard;