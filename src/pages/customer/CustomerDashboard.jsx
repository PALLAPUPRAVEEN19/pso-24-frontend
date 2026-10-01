import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  CalendarPlus,
  CalendarCheck,
  History,
  CreditCard,
  Wrench,
  ChevronRight,
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';
import { StatCard, Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import API from '../../api/axios';

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const bookingsRes = await API.get('/gateway/bookingservice/api/bookings');
        const bookingList = bookingsRes.data?.data || [];
        setBookings(bookingList);

        const invoicesRes = await API.get('/gateway/billingservice/api/bills');
        const invoiceList = invoicesRes.data?.data || [];
        setInvoices(invoiceList);
      } catch (err) {
        console.error("Error loading customer dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, []);

  const userBookings = bookings.filter(b => b.userEmail === user?.email || b.customerEmail === user?.email || b.customerName === user?.name);
  const totalBookingsCount = userBookings.length;
  const upcomingServicesCount = userBookings.filter(b => b.status === "Scheduled" || b.status === "In Progress").length;
  const activeBooking = userBookings.find(b => b.status === "In Progress" || b.status === "Scheduled");

  const unpaidTotal = invoices
    .filter(i => (i.customerName === user?.name || i.bookingId) && (i.status === 'UNPAID' || i.status === 'Unpaid'))
    .reduce((acc, curr) => acc + (curr.amount || curr.totalAmount || 0), 0);

  return (
    <div className="space-y-6 font-sans text-[#1A2332]">
      {/* Dusty Blue Hero Banner */}
      <div className="bg-[#EAF2F5] border border-[#C6DDE4] rounded-2xl p-6 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#385E72] text-white font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Customer Portal
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#1C3D49] font-heading">Welcome back, {user?.name || user?.email}!</h2>
          <p className="text-xs text-[#4A6975] flex items-center gap-2 font-medium">
            <Car className="w-4 h-4 text-[#385E72]" />
            Registered Account: <span className="font-bold text-[#1C3D49]">{user?.email}</span>
          </p>
        </div>

        <Link
          to="/customer/book-service"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#385E72] hover:bg-[#2C4B5B] text-white font-bold text-xs transition-all shadow-soft"
        >
          <CalendarPlus className="w-4 h-4" />
          Schedule New Service
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={totalBookingsCount}
          subtitle="Lifetime service appointments"
          icon={BookmarkCheck}
          color="blue"
        />
        <StatCard
          title="Upcoming Services"
          value={upcomingServicesCount}
          subtitle={upcomingServicesCount > 0 ? "Appointment scheduled" : "No pending service"}
          icon={CalendarCheck}
          color="purple"
        />
        <StatCard
          title="Service History Logs"
          value={userBookings.filter(b => b.status === "Completed").length}
          subtitle="Completed service records"
          icon={History}
          color="emerald"
        />
        <StatCard
          title="Pending Payments"
          value={formatCurrency(unpaidTotal)}
          subtitle={unpaidTotal > 0 ? "Outstanding balance" : "All invoices cleared"}
          icon={CreditCard}
          color={unpaidTotal > 0 ? "amber" : "emerald"}
        />
      </div>

      {activeBooking && (
        <Card className="border-[#C6DDE4] bg-[#F4F8FA]">
          <div className="flex items-center justify-between border-b border-[#D5E5EC] pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#385E72] text-white flex items-center justify-center shadow-soft">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1C3D49] text-sm font-heading">Active Service Progress: #{activeBooking.id}</h3>
                <p className="text-xs text-[#5A6578]">{activeBooking.serviceType} • Lead Tech: {activeBooking.technicianName || "Alex Rivera"}</p>
              </div>
            </div>
            <Badge status={activeBooking.status} />
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs font-sans">
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-[#EDF7F2] text-[#1B4B35] border border-[#BFDEC8] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="font-bold text-[#1A2332]">Checked In</p>
              <p className="text-[10px] text-[#5A6578]">Recorded</p>
            </div>

            <div className="space-y-1">
              <div className={`w-8 h-8 rounded-full ${activeBooking.status === 'In Progress' ? 'bg-[#385E72] text-white ring-4 ring-[#C6DDE4]' : 'bg-[#EAE5DD] text-[#5A6578]'} flex items-center justify-center mx-auto font-bold`}>
                2
              </div>
              <p className="font-bold text-[#1A2332]">Inspection & Repair</p>
              <p className="text-[10px] text-[#5A6578]">{activeBooking.status}</p>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-[#EAE5DD] text-[#8C96A6] flex items-center justify-center mx-auto font-bold">3</div>
              <p className="font-semibold text-[#8C96A6]">Quality Audit</p>
              <p className="text-[10px] text-[#8C96A6]">Pending</p>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-[#EAE5DD] text-[#8C96A6] flex items-center justify-center mx-auto font-bold">4</div>
              <p className="font-semibold text-[#8C96A6]">Ready for Pickup</p>
              <p className="text-[10px] text-[#8C96A6]">Pending</p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover className="flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2F5] text-[#385E72] flex items-center justify-center border border-[#C6DDE4]">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1A2332] font-heading">Book New Service</h3>
            <p className="text-xs text-[#5A6578]">
              Select date, service type, and preferred master technician for your vehicle.
            </p>
          </div>
          <Link
            to="/customer/book-service"
            className="mt-4 font-bold text-xs text-[#385E72] hover:text-[#2C4B5B] inline-flex items-center gap-1"
          >
            Book Appointment <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card hover className="flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EDF7F2] text-[#1B4B35] flex items-center justify-center border border-[#BFDEC8]">
              <History className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1A2332] font-heading">Digital Service History</h3>
            <p className="text-xs text-[#5A6578]">
              Review full digital health logs, technician notes, and past receipts.
            </p>
          </div>
          <Link
            to="/customer/service-history"
            className="mt-4 font-bold text-xs text-[#385E72] hover:text-[#2C4B5B] inline-flex items-center gap-1"
          >
            View History <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card hover className="flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3F0F9] text-[#4A3B6B] flex items-center justify-center border border-[#D9D2E9]">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1A2332] font-heading">Billing & Invoices</h3>
            <p className="text-xs text-[#5A6578]">
              Settle outstanding balances online or download tax invoices.
            </p>
          </div>
          <Link
            to="/customer/billing"
            className="mt-4 font-bold text-xs text-[#385E72] hover:text-[#2C4B5B] inline-flex items-center gap-1"
          >
            Manage Payments <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
