import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, DollarSign, Star as StarIcon, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { booking } = useBooking();
  
  const [activeTab, setActiveTab] = useState<'payment' | 'feedback'>('payment');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!booking) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, booking, navigate]);

  const handlePaymentSubmit = () => {
    if (!paymentMethod) return;
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveTab('feedback');
    }, 1500);
  };

  const handleFeedbackSubmit = () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate feedback submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect to home after success
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-8">
                Your payment and feedback have been submitted successfully.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Return to Home
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('payment')}
                    className={`flex-1 py-4 px-6 text-center border-b-2 font-medium ${
                      activeTab === 'payment'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Payment
                  </button>
                  <button
                    onClick={() => setActiveTab('feedback')}
                    className={`flex-1 py-4 px-6 text-center border-b-2 font-medium ${
                      activeTab === 'feedback'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    disabled={activeTab === 'payment'}
                  >
                    Feedback
                  </button>
                </div>
              </div>
              
              {activeTab === 'payment' && (
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Service Charge</span>
                        <span className="font-medium">${booking.washCenter?.price || 0}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Pickup & Delivery</span>
                        <span className="font-medium">$10</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">${((booking.washCenter?.price || 0) + 10) * 0.1}</span>
                      </div>
                      <div className="border-t border-gray-200 my-2 pt-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Amount</span>
                        <span className="font-bold text-lg">${((booking.washCenter?.price || 0) + 10) * 1.1}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-3">Select Payment Method</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center p-4 border rounded-md ${
                          paymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <CreditCard className={`h-6 w-6 mr-3 ${paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-500'}`} />
                        <div className="text-left">
                          <p className={`font-medium ${paymentMethod === 'card' ? 'text-blue-700' : 'text-gray-700'}`}>
                            Credit/Debit Card
                          </p>
                          <p className="text-sm text-gray-500">Pay securely with your card</p>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('cash')}
                        className={`flex items-center p-4 border rounded-md ${
                          paymentMethod === 'cash'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <DollarSign className={`h-6 w-6 mr-3 ${paymentMethod === 'cash' ? 'text-blue-500' : 'text-gray-500'}`} />
                        <div className="text-left">
                          <p className={`font-medium ${paymentMethod === 'cash' ? 'text-blue-700' : 'text-gray-700'}`}>
                            Cash on Delivery
                          </p>
                          <p className="text-sm text-gray-500">Pay when your bike is delivered</p>
                        </div>
                      </button>
                    </div>
                    
                    <div className="text-center">
                      <button
                        onClick={handlePaymentSubmit}
                        disabled={!paymentMethod || isSubmitting}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Proceed to Feedback'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'feedback' && (
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Rate Your Experience</h2>
                    
                    <div className="flex justify-center mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1"
                        >
                          <StarIcon
                            className={`h-8 w-8 ${
                              (hoverRating || rating) >= star
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                        Share your feedback (optional)
                      </label>
                      <textarea
                        id="feedback"
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about your experience..."
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <button
                        onClick={handleFeedbackSubmit}
                        disabled={rating === 0 || isSubmitting}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Send className="h-5 w-5 mr-2" />
                            Submit Feedback
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentFeedback;