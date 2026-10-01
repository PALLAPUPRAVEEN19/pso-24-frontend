import React, { useState, useEffect } from 'react';
import { Calendar, Car, Eye, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';
import { Table } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import API from '../../api/axios';

export const MyBookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleCancelBooking = async (id) => {
    try {
      await API.delete(`/gateway/bookingservice/api/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  const customerBookings = bookings.filter(b => b.userEmail === user?.email || b.customerEmail === user?.email || b.customerName === user?.name);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">My Service Bookings</h2>
          <p className="text-xs text-slate-500">Track and manage your upcoming automotive care appointments</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-semibold">Loading bookings...</div>
      ) : (
        <Table headers={["Booking ID", "Vehicle", "Service Required", "Scheduled Date", "Assigned Tech", "Cost", "Status", "Actions"]}>
          {customerBookings.map((bk) => (
            <tr key={bk.id} className="hover:bg-slate-50/80 transition-colors">
              <td className="px-6 py-4 font-bold text-blue-600 text-xs">#{bk.id}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-800 text-xs">{bk.vehicleNumber || bk.vehicle || "N/A"}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-slate-800 text-xs">{bk.serviceType || bk.service}</td>
              <td className="px-6 py-4 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {bk.date} ({bk.timeSlot || "Standard"})
                </div>
              </td>
              <td className="px-6 py-4 text-xs text-slate-600">
                <span className="font-medium text-slate-800">{bk.technicianName || bk.technician || "Alex Rivera"}</span>
              </td>
              <td className="px-6 py-4 font-bold text-slate-900 text-xs">{formatCurrency(bk.cost || 89.99)}</td>
              <td className="px-6 py-4">
                <Badge status={bk.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedBooking(bk)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {bk.status === 'Scheduled' && (
                    <button
                      onClick={() => handleCancelBooking(bk.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Cancel Booking"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Booking Details - #${selectedBooking.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Current Status</p>
                <Badge status={selectedBooking.status} className="mt-1" />
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-slate-400">Estimated Total</p>
                <p className="text-lg font-black text-blue-600">{formatCurrency(selectedBooking.cost || 89.99)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-500">Service Package</p>
                <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.serviceType || selectedBooking.service}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500">Vehicle</p>
                <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.vehicleNumber || selectedBooking.vehicle}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500">Appointment Time</p>
                <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.date} at {selectedBooking.timeSlot || "Standard Slot"}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500">Assigned Technician</p>
                <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.technicianName || selectedBooking.technician || "Alex Rivera"}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyBookingsPage;
