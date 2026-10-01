import React from 'react';

export const getInitials = (name) => {
  if (!name) return "PA";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const colorVariants = {
  customer: "bg-[#385E72] text-white border-[#4D768C]",
  technician: "bg-[#5B8A72] text-white border-[#6F9E85]",
  admin: "bg-[#C86D51] text-white border-[#DC7F63]"
};

const sizeVariants = {
  sm: "w-7 h-7 text-[11px]",
  md: "w-9 h-9 text-xs",
  lg: "w-11 h-11 text-sm"
};

export const Avatar = ({ name, role = "customer", size = "md", className = "" }) => {
  const initials = getInitials(name);
  const colorClass = colorVariants[role] || colorVariants.customer;
  const sizeClass = sizeVariants[size] || sizeVariants.md;

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold tracking-wider select-none shrink-0 shadow-soft border font-sans ${colorClass} ${sizeClass} ${className}`}
      title={name}
    >
      {initials}
    </div>
  );
};

export default Avatar;
