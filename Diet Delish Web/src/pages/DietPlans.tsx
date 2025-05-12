import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import MealPlanCard from '../components/MealPlanCard';
import { Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MealPlan } from '../lib/supabase';

function DietPlans() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<MealPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietType, setSelectedDietType] = useState('');
  const [calorieRange, setCalorieRange] = useState<[number, number]>([0, 5000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample meal plans (would be fetched from Supabase in a real application)
  const sampleMealPlans: MealPlan[] = [
    {
      id: '1',
      name: 'Vegetarian Starter Plan',
      description: 'Perfect for those just starting their vegetarian journey. Balanced nutrition with delicious plant-based options.',
      calories: 1500,
      diet_type: 'Vegetarian',
      price: 1200,
      image_url: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '2',
      name: 'High Protein Non-Veg Plan',
      description: 'Protein-rich plan with lean meats, perfect for those looking to build muscle and stay fit.',
      calories: 2000,
      diet_type: 'Non-Vegetarian',
      price: 1500,
      image_url: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '3',
      name: 'Vegan Delight',
      description: 'A complete plant-based meal plan with all essential nutrients and protein sources.',
      calories: 1800,
      diet_type: 'Vegan',
      price: 1350,
      image_url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '4',
      name: 'Weight Loss Special',
      description: 'Low-calorie meals that don\'t compromise on taste. Designed for effective weight management.',
      calories: 1200,
      diet_type: 'Vegetarian',
      price: 1400,
      image_url: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '5',
      name: 'Keto Non-Veg Plan',
      description: 'High-fat, low-carb meal plan with meat options for those following a ketogenic diet.',
      calories: 2200,
      diet_type: 'Non-Vegetarian',
      price: 1700,
      image_url: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '6',
      name: 'Athletic Performance',
      description: 'Balanced macros with higher calories for active individuals and athletes.',
      calories: 2500,
      diet_type: 'Non-Vegetarian',
      price: 1800,
      image_url: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch from Supabase
    // For now, we'll use the sample data
    setTimeout(() => {
      setMealPlans(sampleMealPlans);
      setFilteredPlans(sampleMealPlans);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterPlans();
  }, [searchQuery, selectedDietType, calorieRange]);

  const filterPlans = () => {
    let filtered = [...mealPlans];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(plan => 
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        plan.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by diet type
    if (selectedDietType) {
      filtered = filtered.filter(plan => plan.diet_type === selectedDietType);
    }

    // Filter by calorie range
    filtered = filtered.filter(plan => 
      plan.calories >= calorieRange[0] && plan.calories <= calorieRange[1]
    );

    setFilteredPlans(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDietTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDietType(e.target.value);
  };

  const handleCalorieMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = Number(e.target.value);
    setCalorieRange([min, calorieRange[1]]);
  };

  const handleCalorieMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = Number(e.target.value);
    setCalorieRange([calorieRange[0], max]);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDietType('');
    setCalorieRange([0, 5000]);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Diet Plans</h1>
        <p className="text-gray-600 text-center mb-8">
          Explore our range of nutritionally balanced meal plans tailored to your preferences.
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search meal plans..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="input pl-10"
            />
          </div>
          
          <button 
            onClick={toggleFilter}
            className="md:hidden flex items-center gap-2 btn-secondary py-2"
          >
            <Filter size={20} />
            Filter Options
          </button>
          
          <div className={`filter-options md:flex gap-4 items-end ${isFilterOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
            <div>
              <label htmlFor="dietType" className="block text-sm font-medium text-gray-700 mb-1">
                Diet Type
              </label>
              <select
                id="dietType"
                value={selectedDietType}
                onChange={handleDietTypeChange}
                className="input"
              >
                <option value="">All Types</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="calorieMin" className="block text-sm font-medium text-gray-700 mb-1">
                Min Calories
              </label>
              <input
                type="number"
                id="calorieMin"
                min="0"
                max="5000"
                step="100"
                value={calorieRange[0]}
                onChange={handleCalorieMinChange}
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="calorieMax" className="block text-sm font-medium text-gray-700 mb-1">
                Max Calories
              </label>
              <input
                type="number"
                id="calorieMax"
                min="0"
                max="5000"
                step="100"
                value={calorieRange[1]}
                onChange={handleCalorieMaxChange}
                className="input"
              />
            </div>
            
            <button 
              onClick={resetFilters}
              className="btn-secondary py-2 md:mt-0 mt-4"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
        </div>
      ) : filteredPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((plan) => (
            <MealPlanCard key={plan.id} mealPlan={plan} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No meal plans found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}

export default DietPlans;