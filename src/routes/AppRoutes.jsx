import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Protected Route Guard
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';

// Customer Pages
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import BookServicePage from '../pages/customer/BookServicePage';
import MyBookingsPage from '../pages/customer/MyBookingsPage';
import ServiceHistoryPage from '../pages/customer/ServiceHistoryPage';
import BillingPage from '../pages/customer/BillingPage';

// Technician Pages
import TechnicianDashboard from '../pages/technician/TechnicianDashboard';
import AssignedJobsPage from '../pages/technician/AssignedJobsPage';
import UpdateServicePage from '../pages/technician/UpdateServicePage';
import TechnicianEarningsPage from '../pages/technician/TechnicianEarningsPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AllBookingsPage from '../pages/admin/AllBookingsPage';
import ServiceRecordsPage from '../pages/admin/ServiceRecordsPage';
import BillingManagementPage from '../pages/admin/BillingManagementPage';
import AdminTransactionsPage from '../pages/admin/AdminTransactionsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with PublicLayout (Navbar: Home, Login, Register) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Direct Role Base Redirects */}
      <Route path="/customer" element={<Navigate to="/customer/dashboard" replace />} />
      <Route path="/technician" element={<Navigate to="/technician/dashboard" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Customer Protected Routes & Aliases */}
      <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/book-service" element={<BookServicePage />} />
          <Route path="/customer/book" element={<Navigate to="/customer/book-service" replace />} />
          <Route path="/customer/my-bookings" element={<MyBookingsPage />} />
          <Route path="/customer/bookings" element={<Navigate to="/customer/my-bookings" replace />} />
          <Route path="/customer/service-history" element={<ServiceHistoryPage />} />
          <Route path="/customer/history" element={<Navigate to="/customer/service-history" replace />} />
          <Route path="/customer/billing" element={<BillingPage />} />
        </Route>
      </Route>

      {/* Technician Protected Routes & Aliases */}
      <Route element={<ProtectedRoute allowedRoles={['technician']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
          <Route path="/technician/assigned-jobs" element={<AssignedJobsPage />} />
          <Route path="/technician/jobs" element={<Navigate to="/technician/assigned-jobs" replace />} />
          <Route path="/technician/update-service" element={<UpdateServicePage />} />
          <Route path="/technician/update" element={<Navigate to="/technician/update-service" replace />} />
          <Route path="/technician/earnings" element={<TechnicianEarningsPage />} />
        </Route>
      </Route>

      {/* Admin Protected Routes & Aliases */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/all-bookings" element={<AllBookingsPage />} />
          <Route path="/admin/bookings" element={<Navigate to="/admin/all-bookings" replace />} />
          <Route path="/admin/service-records" element={<ServiceRecordsPage />} />
          <Route path="/admin/records" element={<Navigate to="/admin/service-records" replace />} />
          <Route path="/admin/billing-management" element={<BillingManagementPage />} />
          <Route path="/admin/billing" element={<Navigate to="/admin/billing-management" replace />} />
          <Route path="/admin/transactions" element={<AdminTransactionsPage />} />
        </Route>
      </Route>

      {/* Fallback wildcard redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
