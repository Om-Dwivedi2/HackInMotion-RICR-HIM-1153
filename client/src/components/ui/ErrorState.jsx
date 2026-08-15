import React from 'react';

const ErrorState = ({
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this content.",
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-red-100 rounded-xl bg-red-50/50 ${className}`}>
      <div className="text-red-500 mb-4 bg-white p-3 rounded-full shadow-sm">
        <svg 
          className="w-8 h-8" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-medium text-slate-900">{title}</h3>
      
      <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
        {description}
      </p>
      
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default ErrorState;
