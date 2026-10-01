import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle2, AlertCircle, Filter, Edit } from 'lucide-react';
import { Table } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { StatCard } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { formatCurrency } from '../../utils/formatters';
import API from '../../api/axios';

export const BillingManagementPage = () => {
  const [bills, setBills] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedBill, setSelectedBill] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBills = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/gateway/billingservice/api/bills');
      setBills(res.data?.data || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching bills:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const filteredBills = filterStatus === 'All'
    ? bills
    : bills.filter(i => i.status === filterStatus);

  const totalCollected = bills.filter(i => i.status === 'PAID').reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const totalPending = bills.filter(i => i.status === 'PENDING' || i.status === 'UNPAID').reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const handleUpdatePaymentStatus = async (billId) => {
    try {
      await API.put(`/gateway/billingservice/api/bills/${billId}/pay`);
      setSelectedBill(null);
      fetchBills();
    } catch (err) {
      console.error("Error updating bill status:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Billing & Financial Management</h2>
          <p className="text-xs text-slate-500">Track company revenue, unpaid invoices, and payment status updates</p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="All">All Invoices</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING / UNPAID</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Cash Collected"
          value={formatCurrency(totalCollected)}
          subtitle="Processed through gateway"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Pending Accounts Receivable"
          value={formatCurrency(totalPending)}
          subtitle="Unpaid client invoices"
          icon={AlertCircle}
          color="amber"
        />
        <StatCard
          title="Total Invoiced Gross"
          value={formatCurrency(totalCollected + totalPending)}
          subtitle="Combined totals"
          icon={DollarSign}
          color="blue"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-semibold">Loading billing records...</div>
      ) : (
        <Table headers={["Bill ID", "Booking ID", "Customer Name", "Vehicle Number", "Amount", "Generated Date", "Status", "Update Status"]}>
          {filteredBills.map((bill) => (
            <tr key={bill.billId || bill.id} className="hover:bg-[#F5F2EB]/50 transition-colors">
              <td className="px-6 py-4 font-bold text-[#1A2332] text-xs">#{bill.billId || bill.id}</td>
              <td className="px-6 py-4 font-bold text-[#A95C42] text-xs">#{bill.bookingId}</td>
              <td className="px-6 py-4 text-xs font-semibold text-[#1A2332]">{bill.customerName || "Eleanor Vance"}</td>
              <td className="px-6 py-4 text-xs text-[#5C6B73]">{bill.vehicleNumber || "7XYZ99"}</td>
              <td className="px-6 py-4 text-xs font-bold text-[#1A2332]">{formatCurrency(bill.amount || 150)}</td>
              <td className="px-6 py-4 text-xs text-[#5C6B73]">{bill.generatedDate || "2026-09-14"}</td>
              <td className="px-6 py-4">
                <Badge status={bill.status === 'PAID' ? 'Paid' : 'Unpaid'} />
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setSelectedBill(bill)}
                  className="px-3 py-1 rounded-lg border border-[#EAE5DD] text-[#4A5568] hover:bg-[#F5F2EB] font-bold text-xs transition-colors inline-flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Update Status
                </button>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {selectedBill && (
        <Modal
          isOpen={!!selectedBill}
          onClose={() => setSelectedBill(null)}
          title={`Update Payment Status - #${selectedBill.billId || selectedBill.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DD] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5C6B73]">Booking ID:</span>
                <span className="font-bold text-[#1A2332]">#{selectedBill.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6B73]">Total Amount:</span>
                <span className="font-bold text-[#A95C42]">{formatCurrency(selectedBill.amount || 150)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6B73]">Current Status:</span>
                <Badge status={selectedBill.status === 'PAID' ? 'Paid' : 'Unpaid'} />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <p className="font-bold text-[#1A2332]">Change Payment Status</p>
              {selectedBill.status !== 'PAID' ? (
                <button
                  onClick={() => handleUpdatePaymentStatus(selectedBill.billId || selectedBill.id)}
                  className="w-full py-2.5 rounded-xl bg-[#4D7C62] hover:bg-[#3E654F] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark as PAID
                </button>
              ) : (
                <p className="p-3 rounded-xl bg-[#EFF5F1] text-[#284D3A] border border-[#C9E0D4] font-semibold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4D7C62]" /> This bill is already marked as PAID.
                </p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BillingManagementPage;
