import React from 'react';

export const Table = ({ headers = [], children, emptyMessage = "No records found." }) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#EAE5DD] bg-white shadow-soft-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#1A2332] border-collapse">
          <thead className="bg-[#F5F2EB] text-[11px] font-extrabold text-[#5A6578] uppercase tracking-wider border-b border-[#EAE5DD] select-none">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-6 py-4 whitespace-nowrap font-sans">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0ECE3] font-medium font-sans">
            {React.Children.count(children) > 0 ? (
              children
            ) : (
              <tr>
                <td colSpan={headers.length || 1} className="px-6 py-12 text-center text-[#8C96A6] font-semibold text-xs font-sans">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
