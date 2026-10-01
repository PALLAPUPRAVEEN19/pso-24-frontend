import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Table } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import API from '../../api/axios';

export const ServiceRecordsPage = () => {
  const [historyLogs, setHistoryLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const res = await API.get('/gateway/servicerecordservice/api/records');
        setHistoryLogs(res.data?.data || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching service records:", err);
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = historyLogs.filter(log =>
    (log.vehicleNumber || log.vehicleId || '').toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    (log.workPerformed || log.serviceDetails || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (log.technicianName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">System Service Records Audit Log</h2>
          <p className="text-xs text-slate-500">Centralized database of all completed maintenance jobs</p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search record details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-semibold">Loading service records...</div>
      ) : (
        <Table headers={["Record ID", "Booking ID", "Vehicle ID", "Service Performed", "Completed Date", "Odometer", "Lead Tech", "Status"]}>
          {filteredLogs.map((log) => (
            <tr key={log.recordId || log.id} className="hover:bg-slate-50/80 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-700 text-xs">#{log.recordId || log.id}</td>
              <td className="px-6 py-4 font-bold text-blue-600 text-xs">#{log.bookingId}</td>
              <td className="px-6 py-4 font-semibold text-slate-800 text-xs">{log.vehicleId || "101"}</td>
              <td className="px-6 py-4 text-xs font-semibold text-slate-800">{log.workPerformed || log.serviceDetails}</td>
              <td className="px-6 py-4 text-xs text-slate-600">{log.serviceDate}</td>
              <td className="px-6 py-4 text-xs font-mono text-slate-600">{log.mileage || "24,500 mi"}</td>
              <td className="px-6 py-4 text-xs text-slate-700">{log.technicianName || "Alex Rivera"}</td>
              <td className="px-6 py-4">
                <Badge status={log.status} />
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
};

export default ServiceRecordsPage;
