import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Zap,
  UserCheck,
  ShieldCheck,
  Activity,
  ArrowRight,
  Clock,
  ChevronRight,
  Sparkles,
  CalendarPlus,
  FileText,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { initialServices } from '../../data/mockData';
import { Button } from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatters';

export const LandingPage = () => {
  return (
    <div className="bg-[#F8F6F0] min-h-screen font-sans text-[#1A2332]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#2A3644] text-white py-20 lg:py-28 border-b border-[#3B4A5A]">
        {/* Radial ambient glow & subtle pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#385E72]/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b4a5a_1px,transparent_1px),linear-gradient(to_bottom,#3b4a5a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#385E72]/40 border border-[#4E7991]/50 text-[#A8D0E6] text-xs font-semibold uppercase tracking-wider font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#A8D0E6]" /> Certified Auto Service & Maintenance
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight font-heading">
              Complete Auto Care Built on <span className="bg-gradient-to-r from-[#A8D0E6] via-[#B8E0D2] to-[#E8D5C4] bg-clip-text text-transparent">Precision & Trust</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#C5D0DE] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
              From routine oil changes and multi-point inspections to master engine diagnostics — experience dealership-grade craftsmanship with total digital transparency and guaranteed upfront pricing.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center pt-2">
              <Link to="/customer/book-service" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" icon={ArrowRight} className="w-full sm:w-auto shadow-soft bg-[#385E72] hover:bg-[#2C4B5B] text-sm">
                  Book Service Appointment
                </Button>
              </Link>
              <a href="#services" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-[#364556] text-white border-[#4D5D70] hover:bg-[#435467] text-sm">
                  Explore Maintenance Packages
                </Button>
              </a>
            </div>

            {/* Quick Metrics Banner */}
            <div className="pt-10 border-t border-[#3B4A5A] grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#A0ACC0] text-xs font-semibold max-w-2xl mx-auto font-sans">
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-white font-heading">15,000+</p>
                <p className="text-[#A0ACC0] mt-0.5">Vehicles Maintained</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-white font-heading">4.9 / 5.0</p>
                <p className="text-[#A0ACC0] mt-0.5">Customer Satisfaction</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-white font-heading">100%</p>
                <p className="text-[#A0ACC0] mt-0.5">ASE Certified Technicians</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Grid Section */}
      <section id="services" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#1E4854] uppercase tracking-wider bg-[#EAF2F5] px-3.5 py-1 rounded-full border border-[#C6DDE4]">
            Service Directory
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1A2332] tracking-tight font-heading">
            Maintenance Packages & Diagnostics
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6578]">
            Engineered maintenance routines performed with state-of-the-art diagnostic equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-[#EAE5DD] shadow-soft-card hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F2ECE1] text-[#5A6578]">
                    {service.category}
                  </span>
                  <span className="text-lg font-bold text-[#385E72] font-heading">{formatCurrency(service.price)}</span>
                </div>
                <h3 className="text-base font-bold text-[#1A2332] mb-2 group-hover:text-[#385E72] transition-colors font-heading">
                  {service.name}
                </h3>
                <p className="text-xs text-[#5A6578] leading-relaxed mb-4 font-sans">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE3] flex items-center justify-between text-xs font-sans">
                <span className="text-[#5A6578] font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#385E72]" />
                  Est. {service.duration}
                </span>
                <Link
                  to={`/customer/book-service?serviceId=${service.id}`}
                  className="font-bold text-[#385E72] hover:text-[#2C4B5B] flex items-center gap-1"
                >
                  Book Service <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Features Showcase Section */}
      <section className="py-16 sm:py-20 bg-[#2A3644] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-[#A8D0E6] uppercase tracking-wider bg-[#385E72]/40 px-3.5 py-1 rounded-full border border-[#4E7991]/50">
              The PrecisionAuto Experience
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-heading">
              Designed For Transparency & Convenience
            </h2>
            <p className="text-[#A0ACC0] text-xs sm:text-sm font-sans">
              We combine old-school mechanical craftsmanship with a seamless digital service portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 - Dusty Blue Accent */}
            <div className="bg-[#344252] p-6 rounded-2xl border border-[#425265] space-y-4 hover:border-[#385E72] transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#385E72]/30 border border-[#4E7991]/50 flex items-center justify-center text-[#A8D0E6] group-hover:scale-110 transition-transform">
                <CalendarPlus className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">Seamless Online Booking</h3>
              <p className="text-xs text-[#A0ACC0] leading-relaxed font-sans">
                Schedule your appointment in under 60 seconds. Choose your preferred time slot and assigned master technician.
              </p>
            </div>

            {/* Feature 2 - Sage Green Accent */}
            <div className="bg-[#344252] p-6 rounded-2xl border border-[#425265] space-y-4 hover:border-[#5B8A72] transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#5B8A72]/30 border border-[#6F9E85]/50 flex items-center justify-center text-[#B8E0D2] group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">Digital Health Audit Trail</h3>
              <p className="text-xs text-[#A0ACC0] leading-relaxed font-sans">
                Access permanent online service logs, diagnostic reports, and parts replacement records anytime for your vehicle history.
              </p>
            </div>

            {/* Feature 3 - Terracotta Accent */}
            <div className="bg-[#344252] p-6 rounded-2xl border border-[#425265] space-y-4 hover:border-[#C86D51] transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#C86D51]/30 border border-[#DC7F63]/50 flex items-center justify-center text-[#FADBD0] group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">Transparent Invoicing</h3>
              <p className="text-xs text-[#A0ACC0] leading-relaxed font-sans">
                No surprises or hidden fees. Receive clear itemized bills with instant digital payment status tracking.
              </p>
            </div>

            {/* Feature 4 - Master Specialist */}
            <div className="bg-[#344252] p-6 rounded-2xl border border-[#425265] space-y-4 hover:border-[#385E72] transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#385E72]/30 border border-[#4E7991]/50 flex items-center justify-center text-[#A8D0E6] group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">Certified ASE Specialists</h3>
              <p className="text-xs text-[#A0ACC0] leading-relaxed font-sans">
                Every repair order is assigned to experienced technicians with verified industry credentials and specialized training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Prominent CTA Section */}
      <section className="py-16 bg-[#385E72] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <h2 className="text-2xl sm:text-4xl font-bold font-heading">Ready to Experience Precision Auto Care?</h2>
          <p className="text-[#E0E8F0] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            Create an account or book an appointment online to experience dealership-level service without the markup.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/customer/book-service" className="w-full sm:w-auto">
              <Button variant="accent" size="lg" icon={ArrowRight} className="w-full sm:w-auto shadow-soft bg-[#C86D51] hover:bg-[#B35A3E] text-sm">
                Book Appointment Now
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 text-sm">
                Create Customer Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-[#1C2430] text-[#8A96A8] text-xs border-t border-[#2D3848] py-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#385E72] flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight font-heading block leading-none">
                PrecisionAuto Care
              </span>
              <span className="text-[9px] uppercase font-semibold text-[#8A96A8] tracking-wider block mt-0.5">
                Service & Maintenance
              </span>
            </div>
          </div>

          <div className="flex gap-6 text-[#A0ACC0] font-semibold">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="hover:text-white transition-colors">Register</Link>
          </div>

          <p>© {new Date().getFullYear()} PrecisionAuto Care Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
