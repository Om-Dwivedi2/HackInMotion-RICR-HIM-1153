import React from 'react';

const Spinner = ({
  size = 'md',
  className = '',
  color = 'current',
}) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  const colors = {
    current: "border-current border-b-transparent",
    primary: "border-blue-600 border-b-transparent",
    white: "border-white border-b-transparent",
    slate: "border-slate-400 border-b-transparent",
  };

  return (
    <div className={`inline-block animate-spin rounded-full ${sizes[size]} ${colors[color]} ${className}`} />
  );
};

export default Spinner;
