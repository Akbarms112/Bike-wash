import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Bike, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import axios from 'axios';

// const BookingList = () => {
//     const [bookings, setBookings] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost/bikewash_backend/get_bookings.php')
//             .then(response => {
//                 if (response.data.status === "success") {
//                     setBookings(response.data.data);
//                 }
//             })
//             .catch(error => console.error('Error fetching bookings:', error));
//     }, []);

//     return (
//         <div>
//             <h2>Bookings</h2>
//             <ul>
//                 {bookings.map(booking => (
//                     <li key={booking.id}>{booking.user} - {booking.shop_name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default BookingList;

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { booking, cancelBooking } = useBooking();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!booking) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, booking, navigate]);

  const handleCancelBooking = () => {
    cancelBooking();
    navigate('/dashboard');
  };

  const handleProceedToPayment = () => {
    navigate('/payment-feedback');
  };

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">
              Your bike wash service has been booked successfully. Here are your booking details.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-blue-500 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Booking Details</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Name:</span> {booking.userDetails.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Phone:</span> {booking.userDetails.phone}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Address:</span> {booking.userDetails.address}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Bike Information</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Bike Model:</span> {booking.bikeDetails.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Bike Number:</span> {booking.bikeDetails.number}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Bike Color:</span> {booking.bikeDetails.color}
                    </p>
                  </div>
                </div>
              </div>
              
              <hr className="my-6" />
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Service Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium">Wash Center</p>
                      <p className="text-gray-600">{booking.washCenter?.name}</p>
                      <p className="text-gray-600">{booking.washCenter?.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Bike className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium">Service Type</p>
                      <p className="text-gray-600">Premium Bike Wash</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium">Estimated Pickup Time</p>
                      <p className="text-gray-600">Today, {booking.pickupTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium">Estimated Delivery Time</p>
                      <p className="text-gray-600">Today, {booking.dropoffTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium">Booking Date</p>
                      <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Our team will contact you shortly to confirm your booking. Please ensure your bike is accessible for pickup at the scheduled time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCancelBooking}
              className="px-6 py-3 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors duration-300"
            >
              Cancel Booking
            </button>
            <button
              onClick={handleProceedToPayment}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div> 
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;