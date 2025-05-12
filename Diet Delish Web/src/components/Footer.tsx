import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-brand-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-brand-100 mb-4">
              DietDelish is your partner in building healthy habits. We deliver personalized 
              meal plans, tasty food, and provide smart tracking to help you reach your health goals.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/plans" className="text-brand-100 hover:text-white transition">
                  Diet Plans
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="text-brand-100 hover:text-white transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-brand-100 hover:text-white transition">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-brand-100 hover:text-white transition">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-brand-400" />
                <a href="mailto:support@dietdelish.com" className="text-brand-100 hover:text-white transition">
                  support@dietdelish.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-brand-400" />
                <a href="tel:+919876543210" className="text-brand-100 hover:text-white transition">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center hover:bg-brand-600 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center hover:bg-brand-600 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center hover:bg-brand-600 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-700 mt-8 pt-6">
          <p className="text-center text-brand-200 text-sm">
            © {new Date().getFullYear()} DietDelish. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;