import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Car, Filter } from 'lucide-react';
import { Table } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import API from '../../api/axios';

export const AssignedJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await API.get('/gateway/bookingservice/api/bookings');
        setJobs(res.data?.data || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching assigned jobs:", err);
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = filterStatus === 'All' 
    ? jobs 
    : jobs.filter(j => j.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Assigned Work Orders Queue</h2>
          <p className="text-xs text-slate-500">Manage active shop floor hoist assignments and vehicle inspection logs</p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="All">All Job Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Ready for Delivery">Ready for Delivery</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-semibold">Loading job queue...</div>
      ) : (
        <Table headers={["Work Order #", "Vehicle Number", "Client Name", "Required Service", "Scheduled Time", "Technician", "Status", "Action"]}>
          {filteredJobs.map((job) => (
            <tr key={job.id} className="hover:bg-[#F5F2EB]/50 transition-colors">
              <td className="px-6 py-4 font-bold text-[#4D7C62] text-xs">#{job.id}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#7A8A99]" />
                  <span className="font-bold text-[#1A2332] text-xs">{job.vehicleNumber || "7XYZ99"}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-xs font-medium text-[#1A2332]">{job.customerName || job.userEmail || "Customer"}</td>
              <td className="px-6 py-4 text-xs font-semibold text-[#1A2332]">{job.serviceType}</td>
              <td className="px-6 py-4 text-xs text-[#5C6B73]">
                {job.date} ({job.timeSlot || "Standard"})
              </td>
              <td className="px-6 py-4 text-xs text-[#4A5568]">
                {job.technicianName || "Alex Rivera"}
              </td>
              <td className="px-6 py-4">
                <Badge status={job.status} />
              </td>
              <td className="px-6 py-4">
                <Link
                  to={`/technician/update-service?jobId=${job.id}`}
                  className="px-3 py-1.5 rounded-lg bg-[#4D7C62] hover:bg-[#3E654F] text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-1"
                >
                  <Wrench className="w-3.5 h-3.5" /> Update
                </Link>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
};

export default AssignedJobsPage;
