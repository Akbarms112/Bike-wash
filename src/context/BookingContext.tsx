import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BikeDetails {
  name: string;
  number: string;
  color: string;
}

interface UserDetails {
  name: string;
  phone: string;
  address: string;
}

interface WashCenter {
  id: string;
  name: string;
  address: string;
  rating: number;
  distance: string;
  price: number;
}

interface Booking {
  id: string;
  userDetails: UserDetails;
  bikeDetails: BikeDetails;
  washCenter: WashCenter | null;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  pickupTime: string;
  dropoffTime: string;
  createdAt: string;
}

interface BookingContextType {
  userDetails: UserDetails;
  bikeDetails: BikeDetails;
  selectedCenter: WashCenter | null;
  booking: Booking | null;
  updateUserDetails: (details: Partial<UserDetails>) => void;
  updateBikeDetails: (details: Partial<BikeDetails>) => void;
  selectWashCenter: (center: WashCenter) => void;
  createBooking: () => void;
  cancelBooking: () => void;
  getBookings: () => Booking[];
  updateBookingStatus: (id: string, status: Booking['status']) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
    address: '',
  });

  const [bikeDetails, setBikeDetails] = useState<BikeDetails>({
    name: '',
    number: '',
    color: '',
  });

  const [selectedCenter, setSelectedCenter] = useState<WashCenter | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const updateUserDetails = (details: Partial<UserDetails>) => {
    setUserDetails({ ...userDetails, ...details });
  };

  const updateBikeDetails = (details: Partial<BikeDetails>) => {
    setBikeDetails({ ...bikeDetails, ...details });
  };

  const selectWashCenter = (center: WashCenter) => {
    setSelectedCenter(center);
  };

  const createBooking = () => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      userDetails,
      bikeDetails,
      washCenter: selectedCenter,
      status: 'pending',
      pickupTime: new Date(Date.now() + 30 * 60000).toLocaleTimeString(),
      dropoffTime: new Date(Date.now() + 120 * 60000).toLocaleTimeString(),
      createdAt: new Date().toISOString(),
    };
    
    setBooking(newBooking);
    setBookings([...bookings, newBooking]);
  };

  const cancelBooking = () => {
    if (booking) {
      const updatedBookings = bookings.map(b => 
        b.id === booking.id ? { ...b, status: 'cancelled' } : b
      );
      setBookings(updatedBookings);
      setBooking(null);
    }
  };

  const getBookings = () => {
    return bookings;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, status } : b
    );
    setBookings(updatedBookings);
    
    if (booking && booking.id === id) {
      setBooking({ ...booking, status });
    }
  };

  return (
    <BookingContext.Provider 
      value={{ 
        userDetails, 
        bikeDetails, 
        selectedCenter, 
        booking,
        updateUserDetails, 
        updateBikeDetails, 
        selectWashCenter, 
        createBooking,
        cancelBooking,
        getBookings,
        updateBookingStatus
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};