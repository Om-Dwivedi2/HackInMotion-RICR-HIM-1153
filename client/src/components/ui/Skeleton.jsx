import React from 'react';

export const Skeleton = ({
  className = '',
  ...props
}) => {
  return (
    <div
      className={`animate-pulse bg-slate-200 rounded-md ${className}`}
      {...props}
    />
  );
};

export const SkeletonText = ({ lines = 1, className = '', ...props }) => {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 w-full ${i === lines - 1 && lines > 1 ? 'max-w-[70%]' : ''}`} 
        />
      ))}
    </div>
  );
};

export const SkeletonCard = ({ className = '', ...props }) => {
  return (
    <div className={`p-6 bg-white rounded-xl border border-slate-100 shadow-sm ${className}`} {...props}>
      <Skeleton className="h-6 w-1/3 mb-4" />
      <SkeletonText lines={3} />
    </div>
  );
};

export const SkeletonMetric = ({ className = '', ...props }) => {
  return (
    <div className={`p-6 bg-white rounded-xl border border-slate-100 shadow-sm ${className}`} {...props}>
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-8 w-2/3 mb-2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
};

export default Skeleton;
