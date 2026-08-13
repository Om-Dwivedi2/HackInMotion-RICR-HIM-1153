import React from 'react';

const ProgressBar = ({ label, percentage, colorClass }) => {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-bold text-slate-900">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const MatchBreakdown = ({ breakdown }) => {
  const getColor = (val) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <h3 className="font-semibold text-slate-800">Match Breakdown</h3>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-center">
        <ProgressBar label="Skills Match" percentage={breakdown.skills} colorClass={getColor(breakdown.skills)} />
        <ProgressBar label="Keyword Match" percentage={breakdown.keywords} colorClass={getColor(breakdown.keywords)} />
        <ProgressBar label="Experience Match" percentage={breakdown.experience} colorClass={getColor(breakdown.experience)} />
        <ProgressBar label="Education Match" percentage={breakdown.education} colorClass={getColor(breakdown.education)} />
      </div>
    </div>
  );
};

export default MatchBreakdown;
