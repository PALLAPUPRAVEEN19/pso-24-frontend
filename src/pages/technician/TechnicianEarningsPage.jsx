import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/Card';
import { PaymentTable } from '../../components/common/PaymentTable';
import { formatCurrency } from '../../utils/formatters';
import API from '../../api/axios';

export const TechnicianEarningsPage = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
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
        console.error("Error fetching technician earnings:", err);
        setIsLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  const totalCleared = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + i.total, 0);

  const totalPending = invoices
    .filter(i => i.status === 'Unpaid')
    .reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">My Work Order Earnings</h2>
          <p className="text-xs text-[#64748B]">Revenue payout breakdown for jobs assigned to {user?.name}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Cleared Payouts"
          value={formatCurrency(totalCleared)}
          subtitle="Processed & paid out"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Pending Job Earnings"
          value={formatCurrency(totalPending)}
          subtitle="Awaiting client payment"
          icon={AlertCircle}
          color="amber"
        />
        <StatCard
          title="Total Invoiced Value"
          value={formatCurrency(totalCleared + totalPending)}
          subtitle={`Across ${invoices.length} work orders`}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Payment Table */}
      {isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-semibold">Loading work order earnings...</div>
      ) : (
        <PaymentTable
          data={invoices}
          role="technician"
          emptyMessage="No assigned job payouts found for your account."
        />
      )}
    </div>
  );
};

export default TechnicianEarningsPage;
