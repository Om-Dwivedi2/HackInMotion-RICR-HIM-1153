import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  success,
  id,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  let stateClasses = "border-slate-300 focus:border-blue-500 focus:ring-blue-500";
  
  if (error) {
    stateClasses = "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500";
  } else if (success) {
    stateClasses = "border-green-300 text-green-900 focus:border-green-500 focus:ring-green-500";
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={`
            block w-full rounded-md border shadow-sm sm:text-sm px-3 py-2
            focus:outline-none focus:ring-1 transition-colors duration-200
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            ${stateClasses}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600" id={`${inputId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
