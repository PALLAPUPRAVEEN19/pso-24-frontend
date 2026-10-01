import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, Clock, FileCheck2, CalendarCheck, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard, Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import API from '../../api/axios';

export const TechnicianDashboard = () => {
  const { user } = useAuth();
  const [techJobs, setTechJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await API.get('/gateway/bookingservice/api/bookings');
        const allBookings = res.data?.data || [];
        setTechJobs(allBookings);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching technician jobs:", err);
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const assignedJobsCount = techJobs.length;
  const completedJobsCount = techJobs.filter(b => b.status === 'Completed' || b.status === 'Ready for Delivery').length;

  return (
    <div className="space-y-6 font-sans text-[#1A2332]">
      {/* Sage Green Hero Banner */}
      <div className="bg-[#EFF5F1] border border-[#C9E0D4] rounded-2xl p-6 text-[#1F3D2E] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#5B8A72] text-white font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Technician Workspace
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#1F3D2E] font-heading">Master Tech Workstation: {user?.name || user?.email}</h2>
          <p className="text-xs text-[#3E634F] font-medium">
            Specialization: <span className="font-bold text-[#1F3D2E]">German Performance & Diagnostics</span>
          </p>
        </div>

        <Link
          to="/technician/assigned-jobs"
          className="px-5 py-3 rounded-xl bg-[#5B8A72] hover:bg-[#48705C] text-white font-bold text-xs shadow-soft transition-all flex items-center gap-2"
        >
          <Wrench className="w-4 h-4" /> View My Job Queue ({assignedJobsCount})
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Jobs"
          value={assignedJobsCount}
          subtitle="Total work orders assigned"
          icon={Wrench}
          color="emerald"
        />
        <StatCard
          title="Completed Jobs"
          value={completedJobsCount}
          subtitle="Passed final QC check"
          icon={CheckCircle2}
          color="teal"
        />
        <StatCard
          title="Daily Shop Queue"
          value={techJobs.filter(b => b.status === 'In Progress' || b.status === 'Scheduled').length}
          subtitle="Active on floor"
          icon={CalendarCheck}
          color="blue"
        />
        <StatCard
          title="Efficiency Rating"
          value="98.5%"
          subtitle="On-time completion score"
          icon={Clock}
          color="amber"
        />
      </div>

      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-3">
          <h3 className="font-bold text-[#1A2332] text-sm flex items-center gap-2 font-heading">
            <Clock className="w-4 h-4 text-[#5B8A72]" /> Assigned Service Work Orders
          </h3>
          <Link to="/technician/assigned-jobs" className="text-xs font-bold text-[#5B8A72] hover:underline flex items-center gap-1">
            Manage All Jobs <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-xs text-[#5A6578] font-semibold">Loading assigned jobs...</div>
        ) : (
          <div className="space-y-3">
            {techJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white hover:shadow-soft transition-all"
              >
                <div className="space-y-1 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#5B8A72] text-xs">#{job.id}</span>
                    <span className="text-[#8C96A6]">•</span>
                    <span className="font-bold text-[#1A2332] text-sm">{job.vehicleNumber || "Vehicle"}</span>
                    <Badge status={job.status} />
                  </div>
                  <p className="text-xs text-[#5A6578] font-medium">{job.serviceType}</p>
                  <p className="text-[11px] text-[#8C96A6]">Client: {job.customerName || job.userEmail || "Customer"}</p>
                </div>

                <Link
                  to={`/technician/update-service?jobId=${job.id}`}
                  className="px-4 py-2 rounded-xl bg-[#5B8A72] hover:bg-[#48705C] text-white font-bold text-xs shadow-soft transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  Update Service
                </Link>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TechnicianDashboard;
