import React from 'react';

const variantStyles = {
  primary: "bg-[#385E72] hover:bg-[#2C4B5B] text-white shadow-soft border border-transparent",
  secondary: "bg-[#5B8A72] hover:bg-[#48705C] text-white shadow-soft border border-transparent",
  accent: "bg-[#C86D51] hover:bg-[#B35A3E] text-white shadow-soft border border-transparent",
  dark: "bg-[#2A3644] hover:bg-[#1E2732] text-white shadow-soft border border-transparent",
  outline: "border border-[#E2DDD3] text-[#1C2430] bg-[#FAF8F5] hover:bg-[#F2ECE1] shadow-soft",
  ghost: "text-[#5A6578] hover:bg-[#F2ECE1] hover:text-[#1C2430] border border-transparent",
  danger: "bg-[#C95B5B] hover:bg-[#B34747] text-white shadow-soft border border-transparent"
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs font-bold rounded-lg",
  md: "px-4 py-2.5 text-xs font-bold rounded-xl",
  lg: "px-6 py-3.5 text-sm font-extrabold rounded-xl"
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  type = "button",
  onClick,
  disabled = false,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";
  const variantStyle = variantStyles[variant] || variantStyles.primary;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
