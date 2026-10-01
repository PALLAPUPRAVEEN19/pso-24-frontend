import React, { useState, useEffect } from 'react';
import { Edit, Filter, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';
import { Table } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import API from '../../api/axios';

export const AllBookingsPage = () => {
  const { technicians } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [assignedTech, setAssignedTech] = useState('');
  const [statusVal, setStatusVal] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/gateway/bookingservice/api/bookings');
      setBookings(res.data?.data || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(bk => {
    const matchesStatus = statusFilter === 'All' || bk.status === statusFilter;
    const matchesDate = !dateFilter || bk.date === dateFilter;
    return matchesStatus && matchesDate;
  });

  const handleOpenAssignModal = (bk) => {
    setSelectedBooking(bk);
    setAssignedTech(bk.technicianName || technicians[0]?.name || 'Alex Rivera');
    setStatusVal(bk.status || 'Scheduled');
  };

  const handleSaveAssignment = async (e) => {
    e.preventDefault();
    if (!selectedBooking) return;
    try {
      if (statusVal === 'Completed') {
        await API.put(`/gateway/bookingservice/api/bookings/${selectedBooking.id}/complete`);
      } else {
        await API.put(`/gateway/bookingservice/api/bookings/${selectedBooking.id}`, {
          status: statusVal,
          technicianName: assignedTech,
          technicianId: 1
        });
      }
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      console.error("Error updating booking assignment:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">All Customer Bookings & Dispatch</h2>
          <p className="text-xs text-slate-500">Master scheduling control, status filters, and technician dispatch</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Ready for Delivery">Ready for Delivery</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter('')}
                className="text-slate-400 hover:text-slate-600 font-bold text-[10px]"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-semibold">Loading all bookings...</div>
      ) : (
        <Table headers={["Booking ID", "Customer Details", "Vehicle", "Requested Service", "Assigned Tech", "Date & Time", "Cost", "Status", "Actions"]}>
          {filteredBookings.map((bk) => (
            <tr key={bk.id} className="hover:bg-[#F5F2EB]/50 transition-colors">
              <td className="px-6 py-4 font-bold text-[#A95C42] text-xs">#{bk.id}</td>
              <td className="px-6 py-4">
                <p className="font-semibold text-[#1A2332] text-xs">{bk.customerName || bk.userEmail}</p>
                <p className="text-[10px] text-[#A1B1C7]">{bk.customerPhone || "+1 (555) 234-5678"}</p>
              </td>
              <td className="px-6 py-4">
                <p className="font-bold text-[#1A2332] text-xs">{bk.vehicleNumber || "7XYZ99"}</p>
              </td>
              <td className="px-6 py-4 font-medium text-[#1A2332] text-xs">{bk.serviceType}</td>
              <td className="px-6 py-4 text-xs font-semibold text-[#4A5568]">{bk.technicianName || "Alex Rivera"}</td>
              <td className="px-6 py-4 text-xs text-[#5C6B73]">
                {bk.date} ({bk.timeSlot || "Standard"})
              </td>
              <td className="px-6 py-4 text-xs font-bold text-[#1A2332]">{formatCurrency(bk.cost || 89.99)}</td>
              <td className="px-6 py-4">
                <Badge status={bk.status} />
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleOpenAssignModal(bk)}
                  className="p-1.5 rounded-lg border border-[#EAE5DD] text-[#5C6B73] hover:text-[#A95C42] hover:bg-[#FAF0EC] transition-colors"
                  title="Assign / Edit Status"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Dispatch & Manage - #${selectedBooking.id}`}
        >
          <form onSubmit={handleSaveAssignment} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD]">
              <p className="font-bold text-[#1A2332]">{selectedBooking.vehicleNumber}</p>
              <p className="text-[#5C6B73]">{selectedBooking.serviceType} • {formatCurrency(selectedBooking.cost || 89.99)}</p>
            </div>

            <div>
              <label className="block font-semibold text-[#5C6B73] mb-1">Assign Master Technician</label>
              <select
                value={assignedTech}
                onChange={(e) => setAssignedTech(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] text-xs font-medium text-[#1A2332] focus:ring-2 focus:ring-[#A95C42]/30 focus:border-[#A95C42] outline-none bg-white"
              >
                {technicians.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} ({t.specialization})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#5C6B73] mb-1">Update Status Stage</label>
              <select
                value={statusVal}
                onChange={(e) => setStatusVal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] text-xs font-medium text-[#1A2332] focus:ring-2 focus:ring-[#A95C42]/30 focus:border-[#A95C42] outline-none bg-white"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Ready for Delivery">Ready for Delivery</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#A95C42] hover:bg-[#8F4B35] text-white font-bold text-xs shadow-xs mt-2 transition-colors"
            >
              Save Dispatch Update
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AllBookingsPage;
