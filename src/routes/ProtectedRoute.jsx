import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, token, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1C2430] text-[#8A96A8] font-sans">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#6495ED] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold">Validating session...</span>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
