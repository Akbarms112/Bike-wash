// App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Userlogin from "./pages/Userlogin";
import Dashboard from "./pages/Dashboard";
import BookingConfirmation from "./pages/BookingConfirmation";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentFeedback from "./pages/PaymentFeedback";
import GalleryPage from "./pages/PhotoScroll";

// Context
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";

const GOOGLE_CLIENT_ID = "47356824477-4letta7fsgn6njh8g74sk5rh97jqbkgf.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <AuthProvider>
          <BookingProvider>
            <Toaster position="top-center" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/PhotoScroll" element={<GalleryPage />} />
           
              <Route path="/Login" element={<Login />} />
              <Route path="/Userlogin" element={<Userlogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/payment-feedback" element={<PaymentFeedback />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BookingProvider>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
