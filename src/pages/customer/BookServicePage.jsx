import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Car,
  Wrench,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  User,
  Phone,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';
import { Card } from '../../components/common/Card';
import API from '../../api/axios';

export const BookServicePage = () => {
  const { user, services, technicians } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('serviceId');

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    vehicle: user?.vehicle || '2022 BMW M340i',
    licensePlate: '7XYZ99',
    serviceId: preselectedServiceId || services[0]?.id || '',
    serviceName: services.find(s => s.id === preselectedServiceId)?.name || services[0]?.name || 'Full Synthetic Oil & Filter Service',
    cost: services.find(s => s.id === preselectedServiceId)?.price || services[0]?.price || 89.99,
    date: '2026-09-18',
    timeSlot: '10:00 AM',
    technicianId: technicians[0]?.id || 1,
    technician: technicians[0]?.name || 'Alex Rivera',
    notes: ''
  });

  const handleServiceSelect = (srv) => {
    setFormData(prev => ({
      ...prev,
      serviceId: srv.id,
      serviceName: srv.name,
      cost: srv.price
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      const payload = {
        vehicleNumber: formData.licensePlate || formData.vehicle,
        serviceType: formData.serviceName,
        date: formData.date,
        customerName: user?.name || user?.email || 'Customer',
        customerPhone: '+1 (555) 234-5678',
        timeSlot: formData.timeSlot,
        cost: formData.cost,
        technicianId: 1,
        technicianName: formData.technician,
        status: 'Scheduled'
      };
      await API.post('/gateway/bookingservice/api/bookings', payload);
      setIsLoading(false);
      setStep(3);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.response?.data?.message || err.message || 'Booking creation failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-[#EAE5DD] shadow-xs">
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-[#385E72]' : 'text-[#A1B1C7]'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-[#385E72] text-white' : 'bg-[#F5F2EB] text-[#5C6B73]'}`}>1</span>
          Select Service & Vehicle
        </div>
        <ChevronRight className="w-4 h-4 text-[#C5D0DE]" />
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-[#385E72]' : 'text-[#A1B1C7]'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-[#385E72] text-white' : 'bg-[#F5F2EB] text-[#5C6B73]'}`}>2</span>
          Date, Time & Notes
        </div>
        <ChevronRight className="w-4 h-4 text-[#C5D0DE]" />
        <div className={`flex items-center gap-2 text-xs font-bold ${step === 3 ? 'text-[#284D3A]' : 'text-[#A1B1C7]'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step === 3 ? 'bg-[#4D7C62] text-white' : 'bg-[#F5F2EB] text-[#5C6B73]'}`}>3</span>
          Confirmation
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold font-heading text-[#1A2332] flex items-center gap-2">
              <Car className="w-4 h-4 text-[#385E72]" /> Vehicle Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#5C6B73] mb-1">Vehicle Model & Year</label>
                <input
                  type="text"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] text-xs bg-white text-[#1A2332] focus:ring-2 focus:ring-[#385E72]/30 focus:border-[#385E72] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5C6B73] mb-1">License Plate Tag</label>
                <input
                  type="text"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] text-xs bg-white text-[#1A2332] focus:ring-2 focus:ring-[#385E72]/30 focus:border-[#385E72] outline-none"
                  required
                />
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-sm font-bold font-heading text-[#1A2332] flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#385E72]" /> Select Maintenance Service Package
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv) => {
                const isSelected = formData.serviceId === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => handleServiceSelect(srv)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#385E72] bg-[#EAF2F5] ring-2 ring-[#385E72]/20'
                        : 'border-[#EAE5DD] hover:border-[#D1C9BE] bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#A1B1C7] tracking-wider">{srv.category}</span>
                        <h4 className="text-sm font-bold text-[#1A2332] font-heading">{srv.name}</h4>
                      </div>
                      <span className="text-sm font-bold text-[#385E72]">{formatCurrency(srv.price)}</span>
                    </div>
                    <p className="text-xs text-[#5C6B73] mt-2 line-clamp-2">{srv.description}</p>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-[#A1B1C7] border-t border-[#EAE5DD] pt-2">
                      <span>Est. Duration: {srv.duration}</span>
                      {isSelected && (
                        <span className="font-bold text-[#385E72] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-[#385E72] hover:bg-[#2A4859] text-white font-bold text-sm shadow-xs flex items-center gap-2 transition-colors"
            >
              Continue to Date & Time <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold font-heading text-[#1A2332] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#385E72]" /> Appointment Slot & Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#5C6B73] mb-1">Service Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] text-xs bg-white text-[#1A2332] focus:ring-2 focus:ring-[#385E72]/30 focus:border-[#385E72] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C6B73] mb-1">Time Slot</label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] text-xs bg-white text-[#1A2332] focus:ring-2 focus:ring-[#385E72]/30 focus:border-[#385E72] outline-none"
                >
                  <option value="08:30 AM">08:30 AM (Early Drop-off)</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C6B73] mb-1">Preferred Master Technician (Optional)</label>
              <select
                value={formData.technicianId}
                onChange={(e) => {
                  const tech = technicians.find(t => t.id === e.target.value);
                  setFormData({
                    ...formData,
                    technicianId: e.target.value,
                    technician: tech ? tech.name : 'Alex Rivera'
                  });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] text-xs bg-white text-[#1A2332] focus:ring-2 focus:ring-[#385E72]/30 focus:border-[#385E72] outline-none"
              >
                {technicians.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.specialization}) - Rating: {t.rating}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C6B73] mb-1">Special Notes / Symptoms for Technician</label>
              <textarea
                rows={3}
                placeholder="Describe any noise, vibration, check engine warning light, or special request..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] text-xs bg-white text-[#1A2332] focus:ring-2 focus:ring-[#385E72]/30 focus:border-[#385E72] outline-none"
              />
            </div>
          </Card>

          <div className="bg-[#1C2430] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#38485E]">
            <div>
              <p className="text-xs text-[#A1B1C7] uppercase tracking-wider font-semibold">Total Estimated Price</p>
              <h3 className="text-2xl font-bold font-heading text-white">{formatCurrency(formData.cost)}</h3>
              <p className="text-[11px] text-[#A1B1C7]">Includes complimentary digital inspection & shuttle pass</p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-[#38485E] text-[#A1B1C7] hover:text-white text-xs font-semibold transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-[#385E72] hover:bg-[#2A4859] text-white font-bold text-xs shadow-sm transition-colors"
              >
                {isLoading ? 'Submitting...' : 'Confirm Appointment Lock'}
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 3 && (
        <Card className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#EFF5F1] text-[#4D7C62] flex items-center justify-center mx-auto border border-[#C9E0D4]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-[#1A2332]">Service Appointment Confirmed!</h2>
          <p className="text-xs text-[#5C6B73] max-w-md mx-auto">
            Your booking for <span className="font-bold text-[#1A2332]">{formData.serviceName}</span> on <span className="font-bold text-[#1A2332]">{formData.date}</span> at <span className="font-bold text-[#1A2332]">{formData.timeSlot}</span> has been logged into our shop queue.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => navigate('/customer/my-bookings')}
              className="px-6 py-2.5 rounded-xl bg-[#385E72] text-white font-bold text-xs shadow-xs hover:bg-[#2A4859] transition-colors"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/customer/dashboard')}
              className="px-6 py-2.5 rounded-xl bg-[#F5F2EB] text-[#4A5568] font-bold text-xs hover:bg-[#EAE5DD] transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BookServicePage;
