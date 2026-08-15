import React from 'react';

const Card = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = "bg-white rounded-xl border border-slate-200";

  const variants = {
    default: "shadow-sm",
    elevated: "shadow-md",
    interactive: "shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer",
    ai: "shadow-sm border-purple-100 bg-purple-50/30",
    muted: "shadow-none bg-slate-50 border-slate-100",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
