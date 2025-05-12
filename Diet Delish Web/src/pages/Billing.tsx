import { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { useToast } from '../components/ui/toaster';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, X, CreditCard, Wallet, Check as BankCheck } from 'lucide-react';
import { motion } from 'framer-motion';

function Billing() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [paymentStep, setPaymentStep] = useState(items.length > 0 ? 1 : 0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Delivery details
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  
  const emptyCart = items.length === 0;
  const total = getTotal();
  const deliveryFee = 50;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + deliveryFee + tax;

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    addToast('Item removed from cart', 'info');
    
    // If cart becomes empty, reset to step 0
    if (items.length === 1) {
      setPaymentStep(0);
    }
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep(2);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length <= 2) {
      return v;
    }
    
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      addToast('Payment successful! Your order has been placed.', 'success');
      clearCart();
      setPaymentStep(3);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Checkout</h1>
        <p className="text-gray-600 text-center">Complete your order to start your healthy journey</p>
      </motion.div>

      {paymentStep === 0 ? (
        <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-md p-8">
          <div className="mb-6 flex justify-center">
            <ShoppingCart size={64} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            You don't have any meal plans in your cart. Browse our selection to get started.
          </p>
          <Link to="/plans" className="btn-primary inline-block">
            Explore Meal Plans
          </Link>
        </div>
      ) : paymentStep === 3 ? (
        <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-md p-8">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-4">
            <Link to="/tracking" className="btn-primary inline-block w-full">
              Track Your Order
            </Link>
            <Link to="/" className="btn-secondary inline-block w-full">
              Return to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment steps */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    paymentStep >= 1 ? 'text-brand-600' : 'text-gray-500'
                  }`}
                >
                  <span className={`inline-block w-6 h-6 rounded-full text-white text-sm leading-6 mr-2 ${
                    paymentStep >= 1 ? 'bg-brand-600' : 'bg-gray-400'
                  }`}>1</span>
                  Cart
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    paymentStep >= 2 ? 'text-brand-600' : 'text-gray-500'
                  }`}
                >
                  <span className={`inline-block w-6 h-6 rounded-full text-white text-sm leading-6 mr-2 ${
                    paymentStep >= 2 ? 'bg-brand-600' : 'bg-gray-400'
                  }`}>2</span>
                  Payment
                </button>
              </div>

              {paymentStep === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                  
                  {items.map((item) => (
                    <div key={item.mealPlan.id} className="flex border-b border-gray-200 py-4">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.mealPlan.image_url}
                          alt={item.mealPlan.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.mealPlan.name}</h3>
                          <button
                            onClick={() => handleRemoveItem(item.mealPlan.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">{item.mealPlan.diet_type}, {item.mealPlan.calories} kcal</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.mealPlan.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.mealPlan.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-medium">₹{item.mealPlan.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {!user ? (
                    <div className="mt-6 bg-brand-50 p-4 rounded-md">
                      <p className="text-brand-800 mb-2">Please log in to continue with checkout</p>
                      <Link to="/login" className="btn-primary inline-block">
                        Log In
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleContinueToPayment} className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          id="address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            id="state"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="input"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                            PIN Code
                          </label>
                          <input
                            id="pincode"
                            type="text"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="input"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button type="submit" className="btn-primary w-full">
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {paymentStep === 2 && (
                <form onSubmit={handlePayment} className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        className={`border rounded-md p-4 text-center cursor-pointer ${
                          paymentMethod === 'card' ? 'border-brand-500 bg-brand-50' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <CreditCard className="mx-auto mb-2" size={24} />
                        <span className="text-sm">Card</span>
                      </div>
                      <div 
                        className={`border rounded-md p-4 text-center cursor-pointer ${
                          paymentMethod === 'upi' ? 'border-brand-500 bg-brand-50' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('upi')}
                      >
                        <Wallet className="mx-auto mb-2" size={24} />
                        <span className="text-sm">UPI</span>
                      </div>
                      <div 
                        className={`border rounded-md p-4 text-center cursor-pointer ${
                          paymentMethod === 'bank' ? 'border-brand-500 bg-brand-50' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('bank')}
                      >
                        <BankCheck className="mx-auto mb-2" size={24} />
                        <span className="text-sm">Bank</span>
                      </div>
                    </div>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div>
                      <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          id="cardNumber"
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="•••• •••• •••• ••••"
                          maxLength={19}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            id="expiryDate"
                            type="text"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="input"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            id="cvv"
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                            placeholder="•••"
                            maxLength={3}
                            className="input"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'upi' && (
                    <div className="mb-4">
                      <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <input
                        id="upiId"
                        type="text"
                        placeholder="yourname@upi"
                        className="input"
                        required
                      />
                    </div>
                  )}
                  
                  {paymentMethod === 'bank' && (
                    <div>
                      <div className="mb-4">
                        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Account Number
                        </label>
                        <input
                          id="accountNumber"
                          type="text"
                          placeholder="Enter your account number"
                          className="input"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                          IFSC Code
                        </label>
                        <input
                          id="ifscCode"
                          type="text"
                          placeholder="ABCD0123456"
                          className="input"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button 
                      type="button" 
                      onClick={() => setPaymentStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className="btn-primary flex-1 flex justify-center items-center"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      ) : (
                        `Pay ₹${grandTotal}`
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span>₹{tax}</span>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
                  <p className="mb-2">
                    <span className="font-medium text-gray-700">Delivery Estimate:</span> 24-48 hours after payment
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Cancellation Policy:</span> Free cancellation up to 12 hours before scheduled delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;