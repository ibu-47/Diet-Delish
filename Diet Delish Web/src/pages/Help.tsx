import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useToast } from '../components/ui/toaster';
import { ChevronDown, ChevronUp, MessageSquare, Phone, HelpCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

type FAQ = {
  question: string;
  answer: string;
};

function Help() {
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [name, setName] = useState(user ? '' : '');
  const [email, setEmail] = useState(user ? user.email || '' : '');
  const [issue, setIssue] = useState('login');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs: FAQ[] = [
    {
      question: 'How do I change my diet plan?',
      answer: 'You can go to your profile and select "Edit Plan" to update your diet preferences. Changes to your meal plan will take effect from your next order.'
    },
    {
      question: 'How do I track my delivery?',
      answer: 'Go to the "Tracking" section in your account and select the order you want to track. You\'ll be able to see real-time updates on your delivery status.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, UPI, and major digital wallets like PayTM and Google Pay. All payments are processed securely through our payment gateway.'
    },
    {
      question: 'Can I customize my meals?',
      answer: 'Yes, we offer meal customization options. You can specify your preferences, allergies, and dietary restrictions in your profile, and our chefs will prepare your meals accordingly.'
    },
    {
      question: 'How far in advance should I place my order?',
      answer: 'For the best selection and availability, we recommend placing your orders at least 24 hours in advance. This gives us time to source fresh ingredients and prepare your meals.'
    },
    {
      question: 'What if I need to cancel or modify my order?',
      answer: 'You can cancel or modify your order up to 12 hours before the scheduled delivery time without any charges. After that, cancellation fees may apply depending on the preparation status.'
    }
  ];

  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter(i => i !== index));
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Your support request has been submitted successfully. We\'ll get back to you soon!', 'success');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Help & Support</h1>
        <p className="text-gray-600 text-center">Get answers to your questions and connect with our support team</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {/* FAQs */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full p-4 text-left font-medium"
                  >
                    {faq.question}
                    {openFaqs.includes(index) ? (
                      <ChevronUp className="flex-shrink-0 ml-2" size={20} />
                    ) : (
                      <ChevronDown className="flex-shrink-0 ml-2" size={20} />
                    )}
                  </button>
                  
                  {openFaqs.includes(index) && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Contact Support</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Type
                </label>
                <select
                  id="issue"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="input"
                >
                  <option value="login">Login Problem</option>
                  <option value="order">Order Issue</option>
                  <option value="payment">Payment Problem</option>
                  <option value="delivery">Delivery Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  What do you need help with?
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:w-1/3">
          {/* Contact information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="bg-brand-100 p-3 rounded-full mr-4">
                  <Mail className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-gray-600 text-sm mb-1">For general inquiries:</p>
                  <a href="mailto:support@dietdelish.com" className="text-brand-600 hover:text-brand-700">
                    support@dietdelish.com
                  </a>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-brand-100 p-3 rounded-full mr-4">
                  <Phone className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-gray-600 text-sm mb-1">Mon-Sat, 9 AM - 6 PM:</p>
                  <a href="tel:+919876543210" className="text-brand-600 hover:text-brand-700">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-brand-100 p-3 rounded-full mr-4">
                  <MessageSquare className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="font-medium">Live Chat</h3>
                  <p className="text-gray-600 text-sm mb-1">Available on weekdays:</p>
                  <button className="text-brand-600 hover:text-brand-700">
                    Start a Live Chat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-step guides */}
          <div className="bg-brand-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <HelpCircle className="text-brand-600 mr-2" size={24} />
              <h2 className="text-xl font-semibold">Help Guides</h2>
            </div>
            
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-brand-700 hover:text-brand-800 flex items-center">
                  <span className="mr-2">→</span>
                  How to set up your profile
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-700 hover:text-brand-800 flex items-center">
                  <span className="mr-2">→</span>
                  Selecting the right meal plan
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-700 hover:text-brand-800 flex items-center">
                  <span className="mr-2">→</span>
                  Understanding your nutrition stats
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-700 hover:text-brand-800 flex items-center">
                  <span className="mr-2">→</span>
                  Managing payment methods
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-700 hover:text-brand-800 flex items-center">
                  <span className="mr-2">→</span>
                  Tracking your order status
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;