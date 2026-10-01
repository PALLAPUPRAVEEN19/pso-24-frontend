import React from 'react';
import { Table } from './Table';
import { Badge } from './Badge';
import { Button } from './Button';
import { CreditCard, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const PaymentTable = ({
  data = [],
  role = 'customer',
  onPay,
  emptyMessage = "No transaction records found."
}) => {
  // Determine headers based on role
  const headers = role === 'admin'
    ? ["Invoice #", "Customer", "Technician", "Service Rendered", "Date", "Subtotal", "Tax", "Total Amount", "Status", "Actions"]
    : role === 'technician'
      ? ["Invoice #", "Customer", "Service Completed", "Date", "Subtotal", "Total Payout", "Status"]
      : ["Invoice #", "Service Package", "Date", "Subtotal", "Tax (8%)", "Total Due", "Status", "Actions"];

  return (
    <Table headers={headers} emptyMessage={emptyMessage}>
      {data.map((item) => (
        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
          <td className="px-6 py-4 font-bold text-[#0F172A] text-xs">{item.id}</td>

          {/* Admin Role */}
          {role === 'admin' && (
            <>
              <td className="px-6 py-4 text-xs font-bold text-slate-800">{item.customerName}</td>
              <td className="px-6 py-4 text-xs font-semibold text-purple-700">{item.technician || "Unassigned"}</td>
              <td className="px-6 py-4 text-xs font-medium text-slate-700">{item.service}</td>
              <td className="px-6 py-4 text-xs text-slate-600">{item.date}</td>
              <td className="px-6 py-4 text-xs font-mono text-slate-600">{formatCurrency(item.subtotal)}</td>
              <td className="px-6 py-4 text-xs font-mono text-slate-500">{formatCurrency(item.tax)}</td>
              <td className="px-6 py-4 text-xs font-black text-[#0F172A]">{formatCurrency(item.total)}</td>
              <td className="px-6 py-4">
                <Badge status={item.status === 'Paid' ? 'Paid' : 'Unpaid'}>
                  {item.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                {item.status === 'Unpaid' && onPay && (
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => onPay(item.id)}
                  >
                    Mark Paid
                  </Button>
                )}
              </td>
            </>
          )}

          {/* Technician Role */}
          {role === 'technician' && (
            <>
              <td className="px-6 py-4 text-xs font-bold text-slate-800">{item.customerName}</td>
              <td className="px-6 py-4 text-xs font-medium text-slate-700">{item.service}</td>
              <td className="px-6 py-4 text-xs text-slate-600">{item.date}</td>
              <td className="px-6 py-4 text-xs font-mono text-slate-600">{formatCurrency(item.subtotal)}</td>
              <td className="px-6 py-4 text-xs font-black text-emerald-700">{formatCurrency(item.total)}</td>
              <td className="px-6 py-4">
                <Badge status={item.status === 'Paid' ? 'Paid' : 'Unpaid'}>
                  {item.status}
                </Badge>
              </td>
            </>
          )}

          {/* Customer Role */}
          {role === 'customer' && (
            <>
              <td className="px-6 py-4 text-xs font-semibold text-slate-800">{item.service}</td>
              <td className="px-6 py-4 text-xs text-slate-600">{item.date}</td>
              <td className="px-6 py-4 text-xs font-mono text-slate-600">{formatCurrency(item.subtotal)}</td>
              <td className="px-6 py-4 text-xs font-mono text-slate-500">{formatCurrency(item.tax)}</td>
              <td className="px-6 py-4 text-xs font-black text-[#0F172A]">{formatCurrency(item.total)}</td>
              <td className="px-6 py-4">
                <Badge status={item.status === 'Paid' ? 'Paid' : 'Unpaid'}>
                  {item.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                {item.status === 'Unpaid' ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={CreditCard}
                    onClick={() => onPay(item)}
                  >
                    Make Payment
                  </Button>
                ) : (
                  <span className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-1">
                    ✓ Paid
                  </span>
                )}
              </td>
            </>
          )}
        </tr>
      ))}
    </Table>
  );
};

export default PaymentTable;
