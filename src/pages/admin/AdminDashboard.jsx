import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  Wrench,
  Users,
  BookmarkCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';
import { StatCard, Card } from '../../components/common/Card';
import { Table } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import API from '../../api/axios';

export const AdminDashboard = () => {
  const { technicians } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);
        const bookingsRes = await API.get('/gateway/bookingservice/api/bookings');
        setBookings(bookingsRes.data?.data || []);

        const billsRes = await API.get('/gateway/billingservice/api/bills');
        setBills(billsRes.data?.data || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const totalBookingsCount = bookings.length;
  const totalRevenue = bills.reduce((sum, b) => sum + Number(b.amount || b.totalAmount || 0), 0);
  const paidRevenue = bills.filter(b => b.status === 'PAID').reduce((sum, b) => sum + Number(b.amount || b.totalAmount || 0), 0);
  const activeServicesCount = bookings.filter(b => b.status === 'In Progress' || b.status === 'Scheduled').length;

  return (
    <div className="space-y-6 font-sans text-[#1A2332]">
      {/* Terracotta Clay Executive Banner */}
      <div className="bg-[#FAF0EC] border border-[#F2D5CA] rounded-2xl p-6 text-[#783520] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#C86D51] text-white font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Admin Executive Control
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#5C2717] font-heading">Shop Performance & Operations Overview</h2>
          <p className="text-xs text-[#8F4832] font-medium">
            Real-time management for PrecisionAuto Care service center
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/admin/all-bookings"
            className="px-4 py-2.5 rounded-xl bg-[#C86D51] hover:bg-[#B35A3E] text-white text-xs font-bold shadow-soft"
          >
            Manage All Bookings
          </Link>
          <Link
            to="/admin/billing-management"
            className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#783520] border border-[#F2D5CA] text-xs font-bold"
          >
            Revenue Reports
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={totalBookingsCount}
          subtitle="System-wide reservations"
          icon={BookmarkCheck}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          subtitle={`Collected: ${formatCurrency(paidRevenue)}`}
          trend="+18.4%"
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Active Services"
          value={activeServicesCount}
          subtitle="In shop floor & queue"
          icon={Wrench}
          color="blue"
        />
        <StatCard
          title="Master Tech Staff"
          value={technicians.length}
          subtitle="100% ASE Certified"
          icon={Users}
          color="amber"
        />
      </div>

      <Card className="space-y-4">
        <h3 className="font-bold text-[#1A2332] text-sm flex items-center gap-2 font-heading">
          <Users className="w-4 h-4 text-[#C86D51]" /> Master Technician Floor Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {technicians.map((tech) => (
            <div key={tech.id} className="p-4 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] flex items-center gap-3 font-sans">
              <Avatar name={tech.name} role="technician" size="md" />
              <div>
                <p className="font-bold text-[#1A2332] text-xs font-heading">{tech.name}</p>
                <p className="text-[10px] text-[#5A6578]">{tech.specialization}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge status={tech.status === 'Available' ? 'Completed' : 'In Progress'}>
                    {tech.status}
                  </Badge>
                  <span className="text-[10px] text-[#5A6578] font-semibold">{tech.activeJobs} active jobs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-3 font-sans">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#1A2332] text-sm font-heading">Recent Customer Service Requests</h3>
          <Link to="/admin/all-bookings" className="text-xs font-bold text-[#C86D51] hover:underline flex items-center gap-1">
            View All Requests <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-xs text-[#5A6578] font-semibold">Loading requests...</div>
        ) : (
          <Table headers={["Booking ID", "Customer", "Vehicle", "Service Required", "Tech Staff", "Date", "Status"]}>
            {bookings.slice(0, 4).map((b) => (
              <tr key={b.id} className="hover:bg-[#FAF8F5] transition-colors">
                <td className="px-6 py-3.5 font-bold text-[#385E72] text-xs">#{b.id}</td>
                <td className="px-6 py-3.5 text-xs font-semibold text-[#1A2332]">{b.customerName || b.userEmail}</td>
                <td className="px-6 py-3.5 text-xs text-[#5A6578]">{b.vehicleNumber || "Vehicle"}</td>
                <td className="px-6 py-3.5 text-xs font-medium text-[#1A2332]">{b.serviceType}</td>
                <td className="px-6 py-3.5 text-xs text-[#5A6578]">{b.technicianName || "Alex Rivera"}</td>
                <td className="px-6 py-3.5 text-xs text-[#5A6578]">{b.date}</td>
                <td className="px-6 py-3.5">
                  <Badge status={b.status} />
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
