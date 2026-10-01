import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarCheck,
  History,
  CreditCard,
  Wrench,
  FileCheck2,
  DollarSign,
  LogOut,
  ChevronRight,
  Receipt
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from './Badge';
import { SidebarItem } from './SidebarItem';
import { Avatar } from './Avatar';

const roleMenus = {
  customer: [
    { label: "Dashboard", path: "/customer/dashboard", icon: LayoutDashboard },
    { label: "Book Service", path: "/customer/book-service", icon: CalendarPlus },
    { label: "My Bookings", path: "/customer/my-bookings", icon: CalendarCheck },
    { label: "Service History", path: "/customer/service-history", icon: History },
    { label: "Billing & Invoices", path: "/customer/billing", icon: CreditCard },
  ],
  technician: [
    { label: "Dashboard", path: "/technician/dashboard", icon: LayoutDashboard },
    { label: "Assigned Jobs", path: "/technician/assigned-jobs", icon: Wrench },
    { label: "Update Service", path: "/technician/update-service", icon: FileCheck2 },
    { label: "My Earnings", path: "/technician/earnings", icon: DollarSign },
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "All Bookings", path: "/admin/all-bookings", icon: CalendarCheck },
    { label: "Service Records", path: "/admin/service-records", icon: History },
    { label: "Billing Management", path: "/admin/billing-management", icon: DollarSign },
    { label: "All Transactions", path: "/admin/transactions", icon: Receipt },
  ]
};

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const currentRole = user.role || 'customer';
  const menuItems = roleMenus[currentRole] || roleMenus.customer;

  return (
    <aside className="w-64 bg-[#1C2430] text-[#B0B9C6] flex flex-col h-screen sticky top-0 shadow-soft-card select-none z-40 border-r border-[#2D3848]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#2D3848] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#385E72] flex items-center justify-center shadow-soft">
          <Wrench className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-white tracking-tight leading-none text-base font-heading">
            PrecisionAuto <span className="text-[#6495ED]">Care</span>
          </h1>
          <p className="text-[10px] uppercase font-semibold tracking-wider text-[#8A96A8] mt-1 font-sans">
            Service & Maintenance
          </p>
        </div>
      </div>

      {/* User Profile Banner */}
      {(() => {
        const displayName = (user.fullName && user.fullName.trim() !== '')
          ? user.fullName
          : (user.name && !user.name.match(/^\d+$/) && user.name !== user.email?.split('@')[0] ? user.name : user.email);
        const formattedRole = user.role
          ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
          : '';

        return (
          <div className="p-3.5 mx-3 my-3 rounded-xl bg-[#253040] border border-[#2D3848] flex items-center gap-3">
            <Avatar name={displayName} role={user.role} size="md" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate font-sans">{displayName}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Badge status={user.role} className="text-[9px] py-0 px-2 uppercase font-extrabold tracking-wider">
                  {formattedRole}
                </Badge>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Navigation List */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto font-sans">
        <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-[#728096] mb-2">
          {user.role} Navigation
        </p>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Footer Sign Out */}
      <div className="p-3 border-t border-[#2D3848] font-sans">
        <button
          onClick={logout}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#E59898] hover:text-[#F0B3B3] hover:bg-[#342424] transition-all duration-200 cursor-pointer group"
        >
          <span className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
