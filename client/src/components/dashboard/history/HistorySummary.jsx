import React from 'react';

const SummaryCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</h3>
    <div className="text-3xl font-bold text-slate-900">{value}</div>
  </div>
);

const HistorySummary = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <SummaryCard title="Total Activities" value={stats.total} />
      <SummaryCard title="Resume Analyses" value={stats.analyses} />
      <SummaryCard title="Mock Interviews" value={stats.interviews} />
      <SummaryCard title="Latest Match" value={`${stats.latestMatch}%`} />
    </div>
  );
};

export default HistorySummary;
