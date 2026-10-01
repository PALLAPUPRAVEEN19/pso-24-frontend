import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Wrench, Phone, Mail, MapPin, Shield } from 'lucide-react';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">PrecisionAuto Care</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                State-of-the-art auto maintenance, certified master technicians, and transparent real-time digital service tracking.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><a href="#services" className="hover:text-white">Services & Pricing</a></li>
                <li><a href="#features" className="hover:text-white">Why PrecisionAuto</a></li>
                <li><Link to="/login" className="hover:text-white">Customer Portal Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 text-xs">
                <li>Synthetic Oil Service</li>
                <li>Brake System Overhaul</li>
                <li>3D Laser Alignment</li>
                <li>Engine Computer Diagnostics</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Contact & Location</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>104 Precision Way, Motor City</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>+1 (800) 555-AUTO</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>support@precisionautocare.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} PrecisionAuto Care Inc. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-400 cursor-pointer">Warranty Details</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
