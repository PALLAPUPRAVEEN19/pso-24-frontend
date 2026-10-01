import React from 'react';

export const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  options,
  rows,
  className = "",
  required = false,
  ...props
}) => {
  const isSelect = type === "select";
  const isTextarea = type === "textarea";

  const inputBaseStyle = `w-full px-3.5 py-2.5 rounded-xl border text-xs transition-all outline-none font-sans font-medium ${
    error
      ? 'border-[#E59898] focus:ring-2 focus:ring-[#C95B5B]/20 focus:border-[#C95B5B] text-[#7A2A2A] bg-[#FDF0F0]'
      : 'border-[#E2DDD3] focus:ring-2 focus:ring-[#385E72]/15 focus:border-[#385E72] text-[#1C2430] bg-[#FAF8F5] hover:border-[#C9C2B5]'
  } ${Icon ? 'pl-10' : ''} ${className}`;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-[11px] font-bold text-[#5A6578] uppercase tracking-wider mb-1 font-sans">
          {label} {required && <span className="text-[#C95B5B]">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="w-4 h-4 text-[#8C96A6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}

        {isSelect ? (
          <select
            value={value}
            onChange={onChange}
            required={required}
            className={inputBaseStyle}
            {...props}
          >
            {options?.map((opt, idx) => (
              <option key={idx} value={typeof opt === 'object' ? opt.value : opt}>
                {typeof opt === 'object' ? opt.label : opt}
              </option>
            ))}
          </select>
        ) : isTextarea ? (
          <textarea
            rows={rows || 3}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={inputBaseStyle}
            {...props}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={inputBaseStyle}
            {...props}
          />
        )}
      </div>

      {error && <p className="text-[11px] font-semibold text-[#C95B5B] mt-1">{error}</p>}
    </div>
  );
};

export default Input;
