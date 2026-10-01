import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Wrench, CheckCircle2, FileText, Save, ChevronLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import API from '../../api/axios';

export const UpdateServicePage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobId = searchParams.get('jobId');

  const [currentJob, setCurrentJob] = useState(null);
  const [status, setStatus] = useState('In Progress');
  const [techNotes, setTechNotes] = useState('');
  const [partsList, setPartsList] = useState('1x OEM Filter Cartridge, 5.7L Full Synthetic 5W-30 Oil');
  const [isLoading, setIsLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        const res = await API.get('/gateway/bookingservice/api/bookings');
        const allBookings = res.data?.data || [];
        const found = allBookings.find(b => String(b.id) === String(jobId)) || allBookings[0];
        setCurrentJob(found);
        if (found) {
          setStatus(found.status || 'In Progress');
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setIsLoading(false);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentJob) return;
    setErrorMessage('');

    try {
      if (status === 'Completed') {
        await API.put(`/gateway/bookingservice/api/bookings/${currentJob.id}/complete`);
      } else {
        await API.put(`/gateway/bookingservice/api/bookings/${currentJob.id}`, { status });
      }

      await API.post('/gateway/servicerecordservice/api/records', {
        bookingId: currentJob.id,
        vehicleId: 101,
        technicianId: 1,
        technicianName: user?.name || "Alex Rivera",
        workPerformed: techNotes || currentJob.serviceType,
        partsUsed: partsList,
        serviceDetails: techNotes || "Inspection verified.",
        serviceDate: currentJob.date || new Date().toISOString().split('T')[0],
        status: status,
        mileage: "24,500 mi"
      });

      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        navigate('/technician/assigned-jobs');
      }, 1200);
    } catch (err) {
      console.error("Error updating service:", err);
      setErrorMessage(err.response?.data?.message || err.message || "Failed to update service record.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-12 text-xs font-semibold text-slate-500">Loading work order...</div>;
  }

  if (!currentJob) {
    return <div className="text-center py-12 text-slate-500">Job not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/technician/assigned-jobs')}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Assigned Jobs Queue
      </button>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="bg-[#1C2430] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#38485E]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#8EB89B] font-bold">#{currentJob.id}</span>
            <Badge status={currentJob.status} />
          </div>
          <h2 className="text-xl font-bold font-heading text-white">{currentJob.vehicleNumber || "Vehicle"}</h2>
          <p className="text-xs text-[#A1B1C7]">
            Client: {currentJob.customerName || currentJob.userEmail} • Service: <span className="text-[#8EB89B] font-semibold">{currentJob.serviceType}</span>
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-[#A1B1C7] uppercase tracking-wider font-semibold">Scheduled Slot</p>
          <p className="text-xs font-bold text-white">{currentJob.date} @ {currentJob.timeSlot || "Standard Slot"}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="space-y-4">
          <h3 className="text-sm font-bold font-heading text-[#1A2332] flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#4D7C62]" /> Update Repair Status Stage
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Scheduled', 'In Progress', 'Ready for Delivery', 'Completed'].map((st) => (
              <button
                type="button"
                key={st}
                onClick={() => setStatus(st)}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                  status === st
                    ? 'border-[#4D7C62] bg-[#EFF5F1] text-[#284D3A] ring-2 ring-[#4D7C62]/20'
                    : 'border-[#EAE5DD] text-[#5C6B73] hover:border-[#D1C9BE] bg-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-sm font-bold font-heading text-[#1A2332] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#4D7C62]" /> Installed Parts & Master Tech Work Log
          </h3>

          <div>
            <label className="block text-xs font-semibold text-[#5C6B73] mb-1">Installed Parts Serial / Description</label>
            <input
              type="text"
              value={partsList}
              onChange={(e) => setPartsList(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] text-xs bg-white text-[#1A2332] focus:ring-2 focus:ring-[#4D7C62]/30 focus:border-[#4D7C62] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5C6B73] mb-1">Inspection Notes & Work Conducted</label>
            <textarea
              rows={3}
              value={techNotes}
              onChange={(e) => setTechNotes(e.target.value)}
              placeholder="e.g. Engine running smooth. Performed full inspection and replacement."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] text-xs bg-white text-[#1A2332] focus:ring-2 focus:ring-[#4D7C62]/30 focus:border-[#4D7C62] outline-none"
            />
          </div>
        </Card>

        <div className="flex items-center justify-between">
          {savedSuccess && (
            <span className="text-xs font-bold text-[#284D3A] flex items-center gap-1.5 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-[#4D7C62]" /> Work Order Updated Successfully! Redirecting...
            </span>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={() => navigate('/technician/assigned-jobs')}
              className="px-4 py-2.5 rounded-xl bg-[#EAE5DD] hover:bg-[#DDD7CC] text-[#4A5568] text-xs font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#4D7C62] hover:bg-[#3E654F] text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" /> Save & Broadcast Status Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateServicePage;
