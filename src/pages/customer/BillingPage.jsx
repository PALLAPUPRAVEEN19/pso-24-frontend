import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { PaymentTable } from '../../components/common/PaymentTable';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { StatCard } from '../../components/common/Card';
import { formatCurrency } from '../../utils/formatters';
import API from '../../api/axios';

export const BillingPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBills = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/gateway/billingservice/api/bills');
      const rawData = res.data?.data || [];
      const formatted = rawData.map(b => ({
        id: b.billId || b.id,
        bookingId: b.bookingId,
        customerName: b.customerName || "Customer",
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
      console.error("Error fetching bills:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const unpaidTotal = invoices
    .filter(i => i.status === 'Unpaid')
    .reduce((sum, i) => sum + i.total, 0);

  const paidTotal = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + i.total, 0);

  const handlePay = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const confirmPayment = async (invId) => {
    try {
      await API.put(`/gateway/billingservice/api/bills/${invId}/pay`);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setSelectedInvoice(null);
        fetchBills();
      }, 1200);
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Billing & Invoices</h2>
          <p className="text-xs text-[#64748B]">Manage your service receipts and make online payments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Outstanding Balance"
          value={formatCurrency(unpaidTotal)}
          subtitle={unpaidTotal > 0 ? "Action required: Pay invoice" : "All balances cleared"}
          icon={CreditCard}
          color={unpaidTotal > 0 ? "amber" : "emerald"}
        />
        <StatCard
          title="Paid Invoices Total"
          value={formatCurrency(paidTotal)}
          subtitle="Cleared payments"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-semibold">Loading billing statements...</div>
      ) : (
        <PaymentTable
          data={invoices}
          role="customer"
          onPay={handlePay}
          emptyMessage="No billing statements found for your account."
        />
      )}

      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Make Payment - #${selectedInvoice.id}`}
        >
          {paymentSuccess ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-[#0F172A]">Payment Successful!</h3>
              <p className="text-xs text-[#64748B]">Invoice status updated to Paid.</p>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service Fee</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">State Tax (8%)</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(selectedInvoice.tax)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm">
                  <span>Total Amount</span>
                  <span className="text-[#2563EB]">{formatCurrency(selectedInvoice.total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-[#0F172A]">Payment Method</p>
                <div className="p-3 rounded-xl border border-blue-500 bg-blue-50/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#2563EB]" />
                    <div>
                      <p className="font-bold text-[#0F172A]">Instant Card Pay</p>
                      <p className="text-[10px] text-[#64748B]">Visa ending in •••• 4821</p>
                    </div>
                  </div>
                  <span className="text-[#2563EB] font-bold">Selected</span>
                </div>
              </div>

              <Button
                variant="accent"
                size="md"
                className="w-full mt-4"
                onClick={() => confirmPayment(selectedInvoice.id)}
              >
                Pay {formatCurrency(selectedInvoice.total)} Now
              </Button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default BillingPage;
