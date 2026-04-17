import ReviewPage from "./pages/ReviewPage";
import AdminReviewsPage from "./pages/AdminReviewsPage";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/shared/Navbar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/admin-orthonexis" element={<AdminLogin />} />
          <Route path="/admin-orthonexis/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
