import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Droplet } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Droplet className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">BikeWash</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional bike washing services at your doorstep. We care for your bike like it's our own.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-blue-400 mt-0.5" />
                <span>+91 9452345876</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-blue-400 mt-0.5" />
                <span>contact@bikewash.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-blue-400 mt-0.5" />
                <span>123 Wash Street, Bike City, BC 12345</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 text-blue-400 mt-0.5" />
                <div>
                  <p>Monday - Friday</p>
                  <p className="text-gray-300">8:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 text-blue-400 mt-0.5" />
                <div>
                  <p>Saturday - Sunday</p>
                  <p className="text-gray-300">9:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} BikeWash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;