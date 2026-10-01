import React from 'react';
import { NavLink } from 'react-router-dom';

export const SidebarItem = ({ path, label, icon: Icon, badge }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 select-none font-sans ${
          isActive
            ? 'bg-[#385E72] text-white shadow-soft'
            : 'text-[#8A96A8] hover:text-white hover:bg-[#253040]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#8A96A8] group-hover:text-[#6495ED]'}`} />
          <span>{label}</span>
          {badge && (
            <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-black bg-[#2A4452] text-[#A2C7DB] border border-[#3E657A]">
              {badge}
            </span>
          )}
          {isActive && !badge && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />
          )}
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;
