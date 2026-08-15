import React from 'react';

const Badge = ({
  children,
  variant = 'neutral',
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  const variants = {
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    neutral: "bg-slate-100 text-slate-700",
    primary: "bg-blue-100 text-blue-800",
    ai: "bg-purple-100 text-purple-800",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
