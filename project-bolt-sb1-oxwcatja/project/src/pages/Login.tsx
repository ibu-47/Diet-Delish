import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useToast } from '../components/ui/toaster';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, isLoading } = useAuthStore();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await signIn(email, password);
      addToast('Successfully logged in!', 'success');
      navigate('/profile');
    } catch (error) {
      addToast('Failed to log in. Please check your credentials.', 'error');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <motion.div 
          className="md:w-1/2 bg-brand-600 text-white p-8 hidden md:flex md:flex-col md:justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
            <p className="mb-8">
              Log in to access your personalized meal plans, track your orders, and continue your health journey.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-brand-500 rounded-full p-2 mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Access your personalized meal plans</p>
            </div>
            <div className="flex items-center">
              <div className="bg-brand-500 rounded-full p-2 mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>Track your deliveries in real-time</p>
            </div>
            <div className="flex items-center">
              <div className="bg-brand-500 rounded-full p-2 mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p>View your order history and favorites</p>
            </div>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div 
          className="md:w-1/2 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-600">Please enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
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
                Password
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
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm text-brand-600 hover:text-brand-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-2 px-4 flex justify-center relative"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-brand-600 hover:text-brand-500">
                Register here
              </Link>
            </p>
          </form>

          <div className="mt-6">
            <Link
              to="/"
              className="block text-center text-sm text-gray-600 hover:text-gray-900"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;