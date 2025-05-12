import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useToast } from '../components/ui/toaster';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

function Register() {
  const [step, setStep] = useState(1);
  
  // Account details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Profile details
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dietPreference, setDietPreference] = useState('');
  
  const [bmi, setBmi] = useState(0);
  const [accountCreated, setAccountCreated] = useState(false);
  
  const { signUp, isLoading } = useAuthStore();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = Number(height) / 100;
      const weightInKg = Number(weight);
      const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBmi.toFixed(2)));
    }
  };

  const validateStep1 = () => {
    if (!email || !password || !confirmPassword) {
      addToast('Please fill all required fields', 'error');
      return false;
    }
    
    if (password !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return false;
    }

    if (password.length < 6) {
      addToast('Password must be at least 6 characters long', 'error');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!fullName || !age || !gender || !height || !weight || !dietPreference) {
      addToast('Please fill all required fields', 'error');
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const createUserProfile = async (userId: string) => {
    try {
      const { error } = await supabase.from('profiles').insert([
        { 
          user_id: userId,
          full_name: fullName,
          age: Number(age),
          gender,
          height: Number(height),
          weight: Number(weight),
          diet_preference: dietPreference
        }
      ]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error creating profile:', error);
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    try {
      const { data, error } = await signUp(email, password);
      
      if (error) throw error;
      
      if (data.user) {
        const profileCreated = await createUserProfile(data.user.id);
        
        if (profileCreated) {
          setAccountCreated(true);
          addToast('Account created successfully!', 'success');
          // We don't navigate yet because the user needs to verify their email
        } else {
          addToast('Account created but profile setup failed. Please complete your profile later.', 'info');
        }
      }
    } catch (error) {
      addToast('Failed to create account. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Image and Info */}
          <motion.div 
            className="md:w-1/2 bg-brand-600 text-white p-8 hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Join DietDelish</h2>
            <p className="mb-8">
              Create your account to get personalized meal plans, track your progress, and reach your health goals.
            </p>
            
            <div className="mt-auto">
              <div className="border-t border-brand-500 pt-4 mt-8">
                <h3 className="font-semibold mb-2">Benefits of joining:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-brand-500 rounded-full p-1 mr-2 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Personalized meal plans based on your preferences</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-500 rounded-full p-1 mr-2 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Track your nutritional intake and health progress</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-500 rounded-full p-1 mr-2 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Exclusive offers and promotions for members</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            className="md:w-1/2 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {accountCreated ? (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your account has been created. Check your email to confirm your registration.
                </p>
                <Link 
                  to="/login"
                  className="btn-primary inline-block"
                >
                  Proceed to Login
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                  <p className="text-gray-600">Step {step} of 2</p>
                </div>

                <div className="mb-6 w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-brand-600 h-2.5 rounded-full" style={{ width: step === 1 ? '50%' : '100%' }}></div>
                </div>

                <form onSubmit={handleSubmit}>
                  {step === 1 ? (
                    // Step 1: Account details
                    <>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address*
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="input"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password*
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input pr-10"
                            placeholder="•••••••••"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Password must be at least 6 characters long
                        </p>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password*
                        </label>
                        <div className="relative">
                          <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="input pr-10"
                            placeholder="•••••••••"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full btn-primary py-2 px-4"
                      >
                        Continue
                      </button>
                    </>
                  ) : (
                    // Step 2: Profile details
                    <>
                      <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name*
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="input"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                            Age*
                          </label>
                          <input
                            id="age"
                            type="number"
                            min="10"
                            max="100"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            className="input"
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender*
                          </label>
                          <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                            className="input"
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                            Height (cm)*
                          </label>
                          <input
                            id="height"
                            type="number"
                            min="50"
                            max="250"
                            value={height}
                            onChange={(e) => {
                              setHeight(e.target.value);
                              if (weight) calculateBMI();
                            }}
                            required
                            className="input"
                            placeholder="170"
                          />
                        </div>
                        <div>
                          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                            Weight (kg)*
                          </label>
                          <input
                            id="weight"
                            type="number"
                            min="20"
                            max="300"
                            value={weight}
                            onChange={(e) => {
                              setWeight(e.target.value);
                              if (height) calculateBMI();
                            }}
                            required
                            className="input"
                            placeholder="70"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700 mb-1">
                          Diet Preference*
                        </label>
                        <select
                          id="dietPreference"
                          value={dietPreference}
                          onChange={(e) => setDietPreference(e.target.value)}
                          required
                          className="input"
                        >
                          <option value="">Select</option>
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non-Vegetarian">Non-Vegetarian</option>
                          <option value="Vegan">Vegan</option>
                        </select>
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

                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={handlePreviousStep}
                          className="w-1/2 btn-secondary py-2 px-4"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-1/2 btn-primary py-2 px-4 flex justify-center"
                        >
                          {isLoading ? (
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                          ) : (
                            'Create Account'
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Register;