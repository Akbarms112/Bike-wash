import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, MapPin, Calendar, Truck, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="pt-16 bg-cover bg-center h-screen flex items-center"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Professional Bike Washing Service
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            We provide premium bike washing services at your doorstep. Your bike deserves the best care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Book a Wash Now
            </button>
            <button 
              onClick={() => {
                const howItWorksSection = document.getElementById('how-it-works');
                howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a range of professional bike washing services to keep your bike looking and performing at its best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Droplet className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Basic Wash</h3>
              <p className="text-gray-600 mb-4">
                A thorough exterior wash to remove dirt, dust, and grime from your bike's surface.
              </p>
              <p className="text-blue-500 font-semibold">Starting at $15</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Wash</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive cleaning including chain degreasing, polishing, and detailed attention to all components.
              </p>
              <p className="text-blue-500 font-semibold">Starting at $25</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pickup & Delivery</h3>
              <p className="text-gray-600 mb-4">
                We'll pick up your bike, wash it at our facility, and deliver it back to your doorstep.
              </p>
              <p className="text-blue-500 font-semibold">Starting at $35</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting your bike washed with us is simple and convenient. Just follow these easy steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <MapPin className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Book a Service</h3>
                <p className="text-gray-600">
                  Choose your preferred service and schedule a convenient time for pickup.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <Calendar className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">We Pick Up</h3>
                <p className="text-gray-600">
                  Our team arrives at your location to collect your bike at the scheduled time.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <Droplet className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professional Wash</h3>
                <p className="text-gray-600">
                  Your bike receives a thorough cleaning by our experienced professionals.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <Truck className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">We Deliver</h3>
                <p className="text-gray-600">
                  Your clean, shiny bike is delivered back to your doorstep ready to ride.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Book a Wash Now
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I was amazed at how clean my bike was after BikeWash's service. They picked it up and delivered it back looking brand new. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-bold">JD</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-gray-500 text-sm">Mountain Biker</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The premium wash service is worth every penny. My bike hasn't looked this good since I bought it. The team is professional and punctual."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-bold">JS</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-gray-500 text-sm">Road Cyclist</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Convenient booking process and excellent service. They took care of my expensive bike with the attention it deserves. Will definitely use again!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-bold">MJ</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Mike Johnson</p>
                  <p className="text-gray-500 text-sm">BMX Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;