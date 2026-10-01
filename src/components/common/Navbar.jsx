import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Wrench, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#1C2430] text-white border-b border-[#2D3848] shadow-soft font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#385E72] flex items-center justify-center shadow-soft group-hover:bg-[#2C4B5B] transition-colors">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white font-heading block leading-none">
                PrecisionAuto <span className="text-[#6495ED]">Care</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#8A96A8] block mt-0.5">
                Service & Maintenance
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors hover:text-white ${isActive ? 'text-[#6495ED] font-extrabold' : 'text-[#A0ACC0]'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `transition-colors hover:text-white ${isActive ? 'text-[#6495ED] font-extrabold' : 'text-[#A0ACC0]'}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl bg-[#385E72] hover:bg-[#2C4B5B] text-white font-bold transition-all shadow-soft ${
                  isActive ? 'ring-2 ring-[#6495ED]/40' : ''
                }`
              }
            >
              Register
            </NavLink>
          </div>

          {/* User Logged In Portal Link */}
          {user && (() => {
            const displayName = (user.fullName && user.fullName.trim() !== '')
              ? user.fullName
              : (user.name && !user.name.match(/^\d+$/) && user.name !== user.email?.split('@')[0] ? user.name : user.email);
            const formattedRole = user.role
              ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
              : '';

            return (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to={`/${user.role}/dashboard`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#253040] hover:bg-[#2F3D50] text-xs font-bold text-white border border-[#374558]"
                >
                  <User className="w-3.5 h-3.5 text-[#6495ED]" />
                  {displayName} · {formattedRole}
                </Link>
              </div>
            );
          })()}

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#A0ACC0] hover:text-white hover:bg-[#253040]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1C2430] border-b border-[#2D3848] px-4 py-3 space-y-2 text-xs font-bold">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#A0ACC0] hover:text-white">
            Home
          </Link>
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#A0ACC0] hover:text-white">
            Login
          </Link>
          <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#6495ED] font-extrabold">
            Register Account
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
