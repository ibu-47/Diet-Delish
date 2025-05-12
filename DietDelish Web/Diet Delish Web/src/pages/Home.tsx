import { Link } from 'react-router-dom';
import { ArrowRight, Salad, ShoppingBag, TrendingUp, ChefHat, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-100 to-brand-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-brand-800 mb-6 leading-tight">
                Healthy Meals, Delivered.<br/>Personalized For You.
              </h1>
              <p className="text-xl text-brand-600 mb-8">
                Your diet journey starts here. Clean, simple, delicious meals tailored to your health goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/plans" 
                  className="btn-primary text-center flex items-center justify-center"
                >
                  Explore Meal Plans
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link 
                  to="/register" 
                  className="btn-secondary text-center"
                >
                  Create Account
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Healthy meal plates" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose DietDelish?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We combine nutrition science with culinary expertise to deliver meals that are both healthy and delicious.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-brand-50 p-6 rounded-lg"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Salad size={40} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Personalized Plans</h3>
              <p className="text-gray-600">
                Tailored meal plans based on your health goals, preferences, and dietary restrictions.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-brand-50 p-6 rounded-lg"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <ShoppingBag size={40} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Real-time Tracking</h3>
              <p className="text-gray-600">
                Track your deliveries in real-time and know exactly when your meals will arrive.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-brand-50 p-6 rounded-lg"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <ChefHat size={40} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Healthy & Fresh</h3>
              <p className="text-gray-600">
                All meals are prepared fresh with high-quality, locally-sourced ingredients.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-brand-50 p-6 rounded-lg"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <TrendingUp size={40} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your health journey with our integrated progress tracking tools.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Getting started with DietDelish is simple and straightforward. We've designed our service to fit seamlessly into your lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-brand-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Pick Your Plan</h3>
              <p className="text-gray-600">
                Choose from our variety of meal plans designed for different health goals and dietary preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-brand-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Receive Fresh Meals</h3>
              <p className="text-gray-600">
                We deliver your meals right to your doorstep, freshly prepared and ready to eat.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-brand-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Track & Progress</h3>
              <p className="text-gray-600">
                Monitor your health journey and see the positive changes in your body and overall well-being.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/plans" className="btn-primary inline-flex items-center">
              Get Started Today
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers who have transformed their lives with DietDelish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Priya S" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Priya S.</h4>
                  <p className="text-gray-500 text-sm">Lost 10kg in 3 months</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I've never felt better. These meals make dieting so easy! The food is delicious and I don't feel like I'm on a diet at all."
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Arjun M" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Arjun M.</h4>
                  <p className="text-gray-500 text-sm">Fitness enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "My fitness journey finally has structure and flavor! The meal plans perfectly complement my workout routine."
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="Nisha R" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Nisha R.</h4>
                  <p className="text-gray-500 text-sm">Busy professional</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a busy professional, I never had time to prepare healthy meals. DietDelish solved this problem completely!"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Healthy Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their eating habits and improved their health with DietDelish.
          </p>
          <Link to="/register" className="bg-white text-brand-600 px-8 py-3 rounded-md font-semibold hover:bg-brand-50 transition inline-block">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;