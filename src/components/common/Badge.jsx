import React from 'react';

const badgeStyles = {
  // Statuses
  Scheduled: "bg-[#EAF2F5] text-[#1E4854] border-[#C6DDE4]",
  "In Progress": "bg-[#FDF8EC] text-[#785007] border-[#F7E4B8]",
  "Inspection": "bg-[#F3F0F9] text-[#4A3B6B] border-[#D9D2E9]",
  "Ready for Delivery": "bg-[#EFF5F1] text-[#214E3A] border-[#C9E0D4]",
  Completed: "bg-[#EDF7F2] text-[#1B4B35] border-[#BFDEC8]",
  Cancelled: "bg-[#FDF0F0] text-[#7A2A2A] border-[#F5C4C4]",
  
  // Payment
  Paid: "bg-[#EDF7F2] text-[#1B4B35] border-[#BFDEC8] font-black",
  Unpaid: "bg-[#FDF0F0] text-[#7A2A2A] border-[#F5C4C4] font-black",
  Overdue: "bg-[#FDF8EC] text-[#785007] border-[#F7E4B8] font-black",
  
  // Roles
  customer: "bg-[#EAF2F5] text-[#1E4854] border-[#C6DDE4]",
  technician: "bg-[#EFF5F1] text-[#284D3A] border-[#C9E0D4]",
  admin: "bg-[#FAF0EC] text-[#783520] border-[#F2D5CA]"
};

export const Badge = ({ children, status, className = "" }) => {
  const label = children || status;
  const style = badgeStyles[status] || badgeStyles[label] || "bg-[#F2ECE1] text-[#5A6578] border-[#E2DDD3]";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border select-none ${style} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
};

export default Badge;
