import { useState, useEffect, FormEvent } from 'react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/ui/toaster';
import { User, BarChart2, Calendar, History, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Profile } from '../lib/supabase';

function ProfilePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dietPreference, setDietPreference] = useState('');
  const [bmi, setBmi] = useState(0);
  
  const { addToast } = useToast();

  // Sample profile data (would be fetched from Supabase in a real implementation)
  const sampleProfile: Profile = {
    id: '1',
    user_id: user?.id || '',
    full_name: 'John Doe',
    age: 28,
    gender: 'Male',
    height: 175,
    weight: 70,
    diet_preference: 'Non-Vegetarian',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  useEffect(() => {
    if (user) {
      // In a real app, fetch profile from Supabase
      setTimeout(() => {
        setProfile(sampleProfile);
        setFullName(sampleProfile.full_name);
        setAge(sampleProfile.age.toString());
        setGender(sampleProfile.gender);
        setHeight(sampleProfile.height.toString());
        setWeight(sampleProfile.weight.toString());
        setDietPreference(sampleProfile.diet_preference);
        calculateBMI(sampleProfile.height, sampleProfile.weight);
        setIsLoading(false);
      }, 1000);
    }
  }, [user]);

  const calculateBMI = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(2)));
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // In a real app, update profile in Supabase
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the profile state with new values
      const updatedProfile = {
        ...profile!,
        full_name: fullName,
        age: Number(age),
        gender,
        height: Number(height),
        weight: Number(weight),
        diet_preference: dietPreference,
        updated_at: new Date().toISOString()
      };
      
      setProfile(updatedProfile);
      calculateBMI(Number(height), Number(weight));
      addToast('Profile updated successfully!', 'success');
    } catch (error) {
      addToast('Failed to update profile. Please try again.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">My Profile</h1>
        <p className="text-gray-600 text-center">Manage your account and track your progress</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-brand-100 rounded-full p-4 mb-3">
                <User size={40} className="text-brand-600" />
              </div>
              <h2 className="text-xl font-semibold">{profile?.full_name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center p-3 rounded-lg transition ${
                  activeTab === 'profile'
                    ? 'bg-brand-50 text-brand-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <User size={20} className="mr-3" />
                <span>Profile Details</span>
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`w-full flex items-center p-3 rounded-lg transition ${
                  activeTab === 'progress'
                    ? 'bg-brand-50 text-brand-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <BarChart2 size={20} className="mr-3" />
                <span>Progress Tracking</span>
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`w-full flex items-center p-3 rounded-lg transition ${
                  activeTab === 'schedule'
                    ? 'bg-brand-50 text-brand-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Calendar size={20} className="mr-3" />
                <span>Meal Schedule</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center p-3 rounded-lg transition ${
                  activeTab === 'history'
                    ? 'bg-brand-50 text-brand-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <History size={20} className="mr-3" />
                <span>Order History</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center p-3 rounded-lg transition ${
                  activeTab === 'settings'
                    ? 'bg-brand-50 text-brand-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Settings size={20} className="mr-3" />
                <span>Account Settings</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Profile Details</h2>
                
                <form onSubmit={handleSaveProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={user?.email || ''}
                        className="input"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <input
                        id="age"
                        type="number"
                        min="10"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="input"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700 mb-1">
                        Diet Preference
                      </label>
                      <select
                        id="dietPreference"
                        value={dietPreference}
                        onChange={(e) => setDietPreference(e.target.value)}
                        className="input"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                        Height (cm)
                      </label>
                      <input
                        id="height"
                        type="number"
                        min="50"
                        max="250"
                        value={height}
                        onChange={(e) => {
                          setHeight(e.target.value);
                          if (weight) {
                            calculateBMI(Number(e.target.value), Number(weight));
                          }
                        }}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg)
                      </label>
                      <input
                        id="weight"
                        type="number"
                        min="20"
                        max="300"
                        value={weight}
                        onChange={(e) => {
                          setWeight(e.target.value);
                          if (height) {
                            calculateBMI(Number(height), Number(e.target.value));
                          }
                        }}
                        className="input"
                        required
                      />
                    </div>
                  </div>
                  
                  {bmi > 0 && (
                    <div className="p-4 bg-brand-50 rounded-md mb-6">
                      <p className="font-medium text-brand-800 mb-1">Your BMI: {bmi}</p>
                      <p className="text-sm text-brand-700">
                        {bmi < 18.5
                          ? 'Underweight - Our nutritionist will help you gain healthy weight'
                          : bmi < 25
                          ? 'Normal weight - We\'ll help you maintain your healthy weight'
                          : bmi < 30
                          ? 'Overweight - Our plans can help you reach a healthier weight'
                          : 'Obese - We recommend consulting with a healthcare professional'}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="btn-primary flex items-center justify-center"
                    >
                      {isUpdating ? (
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {activeTab === 'progress' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Progress Tracking</h2>
                <div className="text-center py-12">
                  <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                    <BarChart2 size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
                  <p className="text-gray-600">
                    We're working on advanced progress tracking features to help you monitor your health journey.
                  </p>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'schedule' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Meal Schedule</h2>
                <div className="text-center py-12">
                  <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                    <Calendar size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Active Meal Plans</h3>
                  <p className="text-gray-600 mb-6">
                    You don't have any active meal plans yet. Subscribe to a plan to see your meal schedule.
                  </p>
                  <a href="/plans" className="btn-primary inline-block">
                    Browse Meal Plans
                  </a>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Order History</h2>
                <div className="text-center py-12">
                  <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                    <History size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't placed any orders yet. Start by exploring our meal plans.
                  </p>
                  <a href="/plans" className="btn-primary inline-block">
                    Browse Meal Plans
                  </a>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold mb-2">Change Password</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Update your password to keep your account secure.
                    </p>
                    <button className="btn-secondary">
                      Change Password
                    </button>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold mb-2">Email Notifications</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage your email preferences and notifications.
                    </p>
                    <button className="btn-secondary">
                      Manage Notifications
                    </button>
                  </div>
                  
                  <div className="p-4 border border-red-100 rounded-lg">
                    <h3 className="font-semibold text-red-600 mb-2">Delete Account</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Permanently delete your account and all associated data.
                    </p>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
                      Delete Account
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;