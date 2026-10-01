import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle2, AlertCircle, Filter, Calendar } from 'lucide-react';
import { StatCard } from '../../components/common/Card';
import { PaymentTable } from '../../components/common/PaymentTable';
import { formatCurrency } from '../../utils/formatters';
import API from '../../api/axios';

export const AdminTransactionsPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/gateway/billingservice/api/bills');
      const rawData = res.data?.data || [];
      const formatted = rawData.map(b => ({
        id: b.billId || b.id,
        bookingId: b.bookingId,
        customerName: b.customerName || "Customer",
        technician: b.technicianName || "Alex Rivera",
        service: b.serviceType || "Full Synthetic Oil & Filter Service",
        total: Number(b.amount || b.totalAmount || 150),
        subtotal: Number(b.amount || b.totalAmount || 150) * 0.92,
        tax: Number(b.amount || b.totalAmount || 150) * 0.08,
        status: b.status === 'PAID' ? 'Paid' : 'Unpaid',
        date: b.generatedDate || b.generatedAt || '2026-09-14'
      }));
      setInvoices(formatted);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handlePay = async (invId) => {
    try {
      await API.put(`/gateway/billingservice/api/bills/${invId}/pay`);
      fetchInvoices();
    } catch (err) {
      console.error("Error marking bill paid:", err);
    }
  };

  const filteredInvoices = invoices.filter(i => {
    const matchesStatus = filterStatus === 'All' || i.status === filterStatus;
    const matchesDate = !filterDate || i.date === filterDate;
    return matchesStatus && matchesDate;
  });

  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.total, 0);
  const totalUnpaid = invoices.filter(i => i.status === 'Unpaid').reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">All System Transactions</h2>
          <p className="text-xs text-[#64748B]">Complete audit table of customer payments and technician assignments</p>
        </div>

        {/* Filter Controls: Status & Date */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none"
            />
            {filterDate && (
              <button
                onClick={() => setFilterDate('')}
                className="text-slate-400 hover:text-slate-600 font-bold text-[10px]"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Settled Transactions"
          value={formatCurrency(totalPaid)}
          subtitle="Total paid invoices"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Pending Receivables"
          value={formatCurrency(totalUnpaid)}
          subtitle="Unpaid customer balances"
          icon={AlertCircle}
          color="amber"
        />
        <StatCard
          title="Total Gross Invoiced"
          value={formatCurrency(totalPaid + totalUnpaid)}
          subtitle={`Across ${allInvoices.length} transactions`}
          icon={DollarSign}
          color="blue"
        />
      </div>

      {/* Reusable PaymentTable */}
      {isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-semibold">Loading transactions...</div>
      ) : (
        <PaymentTable
          data={filteredInvoices}
          role="admin"
          onPay={(invId) => handlePay(invId)}
        />
      )}
    </div>
  );
};

export default AdminTransactionsPage;
