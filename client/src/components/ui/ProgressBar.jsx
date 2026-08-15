import React from 'react';

const ProgressBar = ({
  value = 0,
  variant = 'default',
  size = 'md',
  className = '',
  showLabel = false,
}) => {
  const normalizedValue = Math.min(100, Math.max(0, value));

  const variants = {
    default: "bg-blue-600",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    ai: "bg-purple-600",
  };

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-slate-700">{normalizedValue}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${variants[variant]} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
