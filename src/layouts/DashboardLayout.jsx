import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import { Avatar } from '../components/common/Avatar';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = (path) => {
    if (path.includes('dashboard')) return 'Dashboard Overview';
    if (path.includes('book-service') || path.includes('book')) return 'Schedule New Service';
    if (path.includes('my-bookings') || path.includes('bookings')) return 'My Scheduled Bookings';
    if (path.includes('service-history') || path.includes('history')) return 'Vehicle Service Log';
    if (path.includes('billing-management') || path.includes('billing')) return 'Billing & Invoices';
    if (path.includes('assigned-jobs') || path.includes('jobs')) return 'Assigned Work Orders';
    if (path.includes('update-service') || path.includes('update')) return 'Service Progress & Inspection';
    if (path.includes('earnings')) return 'My Earnings';
    if (path.includes('transactions')) return 'All System Transactions';
    if (path.includes('all-bookings')) return 'Customer Service Requests';
    if (path.includes('service-records') || path.includes('records')) return 'System Repair Audit Log';
    return 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#0F172A]">
      {/* Role-based Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar Header */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs backdrop-blur-md">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
              {getPageTitle(location.pathname)}
            </h1>
          </div>

          {/* Topbar Right Actions */}
          <div className="flex items-center gap-4">
            {/* User Profile Info */}
            {(() => {
              const displayName = (user?.fullName && user.fullName.trim() !== '')
                ? user.fullName
                : (user?.name && !user.name.match(/^\d+$/) && user.name !== user?.email?.split('@')[0] ? user.name : user?.email);
              const formattedRole = user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
                : '';

              return (
                <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60 shadow-2xs">
                  <Avatar name={displayName} role={user?.role} size="sm" />
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-[#0F172A] leading-none">{displayName}</p>
                    <span className="text-[10px] font-bold text-[#64748B] capitalize">{formattedRole}</span>
                  </div>
                </div>
              );
            })()}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content Workspace */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
