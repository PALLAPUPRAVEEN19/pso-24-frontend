import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2430]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-soft-hover border border-[#EAE5DD] w-full max-w-lg overflow-hidden transform transition-all font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE5DD] bg-[#F5F2EB]">
          <h3 className="text-base font-bold text-[#1A2332] font-heading">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8C96A6] hover:text-[#1A2332] hover:bg-[#EAE5DD] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
