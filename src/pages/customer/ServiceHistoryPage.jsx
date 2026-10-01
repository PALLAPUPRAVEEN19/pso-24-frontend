import React, { useState, useEffect } from 'react';
import { History, Download, FileText } from 'lucide-react';
import { Table } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import API from '../../api/axios';

export const ServiceHistoryPage = () => {
  const [historyLogs, setHistoryLogs] = useState([]);
  const [activeReceipt, setActiveReceipt] = useState(null);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Vehicle Service & Maintenance Logs</h2>
          <p className="text-xs text-slate-500">Historical digital health audit trail for your vehicles</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-semibold">Loading service records...</div>
      ) : (
        <Table headers={["Record ID", "Vehicle ID", "Work Conducted", "Service Date", "Mileage", "Tech Master", "Status", "Inspection Report"]}>
          {historyLogs.map((log) => (
            <tr key={log.recordId || log.id} className="hover:bg-slate-50/80 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-700 text-xs">#{log.recordId || log.id}</td>
              <td className="px-6 py-4 font-semibold text-slate-800 text-xs">{log.vehicleId || log.vehicleNumber || log.vehicle || "101"}</td>
              <td className="px-6 py-4 font-medium text-slate-800 text-xs">{log.workPerformed || log.serviceDetails || log.serviceType}</td>
              <td className="px-6 py-4 text-xs text-slate-600">{log.serviceDate}</td>
              <td className="px-6 py-4 text-xs text-slate-600 font-mono">{log.mileage || "24,500 mi"}</td>
              <td className="px-6 py-4 text-xs text-slate-700">{log.technicianName || log.technician || "Alex Rivera"}</td>
              <td className="px-6 py-4">
                <Badge status={log.status} />
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setActiveReceipt(log)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C6DDE4] text-xs font-semibold text-[#385E72] bg-[#EAF2F5] hover:bg-[#D8E8EE] transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#385E72]" />
                  View Log
                </button>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {activeReceipt && (
        <Modal
          isOpen={!!activeReceipt}
          onClose={() => setActiveReceipt(null)}
          title={`Digital Inspection Report - #${activeReceipt.recordId || activeReceipt.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#1C2430] text-white rounded-xl space-y-2 border border-[#38485E]">
              <div className="flex justify-between items-center">
                <span className="font-bold font-heading text-sm text-white">PrecisionAuto Care Report</span>
                <span className="text-[10px] text-[#78A1BB] font-mono font-bold tracking-wider">VERIFIED CERTIFICATE</span>
              </div>
              <p className="text-xs text-[#A1B1C7]">Vehicle ID: {activeReceipt.vehicleId || activeReceipt.vehicleNumber || "101"} ({activeReceipt.mileage || "24,500 mi"})</p>
              <p className="text-xs text-[#A1B1C7]">Work Performed: {activeReceipt.workPerformed || activeReceipt.serviceDetails}</p>
              <p className="text-xs text-[#A1B1C7]">Parts Used: {activeReceipt.partsUsed || "Standard Replacement Parts"}</p>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE5DD] space-y-1">
              <p className="font-bold text-[#1A2332]">Technician Diagnostic Notes:</p>
              <p className="text-[#5C6B73] italic leading-relaxed">"{activeReceipt.serviceDetails || "Inspection clean and verified."}"</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  alert(`Downloading PDF receipt for service log #${activeReceipt.recordId || activeReceipt.id}...`);
                }}
                className="px-4 py-2 rounded-xl bg-[#385E72] hover:bg-[#2A4859] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" /> Download PDF Certificate
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ServiceHistoryPage;
