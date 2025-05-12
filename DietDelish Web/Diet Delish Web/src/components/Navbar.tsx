import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const cartItems = useCartStore(state => state.items);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-brand-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            DietDelish
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-brand-100 transition">
              Home
            </Link>
            <Link to="/plans" className="font-medium hover:text-brand-100 transition">
              Diet Plans
            </Link>
            {user && (
              <Link to="/tracking" className="font-medium hover:text-brand-100 transition">
                Tracking
              </Link>
            )}
            <Link to="/help" className="font-medium hover:text-brand-100 transition">
              Support
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center font-medium hover:text-brand-100 transition">
                  <User size={18} className="mr-1" />
                  Account
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-brand-600 px-4 py-2 rounded-md hover:bg-brand-50 transition font-medium"
              >
                Login
              </Link>
            )}
            
            <Link to="/billing" className="relative">
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/billing" className="relative">
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white text-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-3 space-y-1">
              <Link 
                to="/" 
                className="block py-2 hover:bg-gray-100 rounded-md px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/plans" 
                className="block py-2 hover:bg-gray-100 rounded-md px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Diet Plans
              </Link>
              {user && (
                <Link 
                  to="/tracking" 
                  className="block py-2 hover:bg-gray-100 rounded-md px-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tracking
                </Link>
              )}
              <Link 
                to="/help" 
                className="block py-2 hover:bg-gray-100 rounded-md px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="block py-2 hover:bg-gray-100 rounded-md px-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left block py-2 hover:bg-gray-100 rounded-md px-3"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="block py-2 bg-brand-600 text-white rounded-md px-3 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;