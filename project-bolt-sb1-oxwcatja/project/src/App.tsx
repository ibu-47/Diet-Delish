import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DietPlans from './pages/DietPlans';
import Tracking from './pages/Tracking';
import Profile from './pages/Profile';
import Help from './pages/Help';
import ProtectedRoute from './components/ProtectedRoute';
import Billing from './pages/Billing';
import { supabase } from './lib/supabase';
import { useAuthStore } from './stores/authStore';

function App() {
  const location = useLocation();
  const { setUser } = useAuthStore();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Check for stored session on initial load
  useEffect(() => {
    const checkSession = async () => {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="plans" element={<DietPlans />} />
        <Route path="help" element={<Help />} />
        
        {/* Protected routes */}
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="tracking" element={
          <ProtectedRoute>
            <Tracking />
          </ProtectedRoute>
        } />
        <Route path="billing" element={
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;