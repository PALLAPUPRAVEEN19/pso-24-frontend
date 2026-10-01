import React from 'react';

export const Card = ({ children, className = "", hover = false }) => {
  return (
    <div className={`bg-white rounded-2xl border border-[#EAE5DD] shadow-soft-card p-6 ${hover ? 'hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-0.5' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }) => {
  const colorMap = {
    blue: "bg-[#EAF2F5] text-[#1E4854] border-[#C6DDE4]",
    emerald: "bg-[#EDF7F2] text-[#1B4B35] border-[#BFDEC8]",
    teal: "bg-[#EDF7F2] text-[#1B4B35] border-[#BFDEC8]",
    amber: "bg-[#FDF8EC] text-[#785007] border-[#F7E4B8]",
    purple: "bg-[#F3F0F9] text-[#4A3B6B] border-[#D9D2E9]",
    rose: "bg-[#FDF0F0] text-[#7A2A2A] border-[#F5C4C4]"
  };

  return (
    <Card hover className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#5A6578] font-sans">{title}</p>
          <h3 className="text-2xl font-black text-[#1A2332] mt-1 tracking-tight font-heading">{value}</h3>
          {subtitle && <p className="text-xs font-semibold text-[#5A6578] font-sans">{subtitle}</p>}
          {trend && (
            <span className={`inline-flex items-center text-xs font-extrabold mt-2 font-sans ${trend.startsWith('+') ? 'text-[#1B4B35]' : 'text-[#7A2A2A]'}`}>
              {trend} vs last month
            </span>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl border ${colorMap[color] || colorMap.blue} shadow-soft group-hover:scale-105 transition-transform duration-200`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;
