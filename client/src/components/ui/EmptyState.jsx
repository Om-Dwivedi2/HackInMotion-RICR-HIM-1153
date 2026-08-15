import React from 'react';

const EmptyState = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 ${className}`}>
      {icon && (
        <div className="text-slate-400 mb-4 flex items-center justify-center h-16 w-16 bg-white rounded-full shadow-sm">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-medium text-slate-900">{title}</h3>
      
      {description && (
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          {description}
        </p>
      )}
      
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
