import React from 'react';

const HistorySkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-slate-100 rounded w-1/3"></div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 animate-pulse">
        <div className="h-10 bg-slate-100 rounded flex-1"></div>
        <div className="h-10 bg-slate-100 rounded w-full md:w-40"></div>
        <div className="h-10 bg-slate-100 rounded w-full md:w-32"></div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-5 border-b border-slate-100 last:border-b-0 flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-100 rounded w-1/3"></div>
              <div className="h-4 bg-slate-100 rounded w-1/4"></div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="h-6 bg-slate-100 rounded w-16"></div>
              <div className="h-8 bg-slate-100 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySkeleton;
