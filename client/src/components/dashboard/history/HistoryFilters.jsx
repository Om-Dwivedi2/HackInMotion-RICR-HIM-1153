import React from 'react';
import { FiSearch } from 'react-icons/fi';

const HistoryFilters = ({ search, onSearchChange, activityType, onActivityTypeChange, dateRange, onDateRangeChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search by role or activity..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors bg-slate-50"
        />
      </div>
      
      <div className="flex gap-4">
        <select
          value={activityType}
          onChange={(e) => onActivityTypeChange(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white cursor-pointer w-full md:w-auto"
        >
          <option value="all">All Activity</option>
          <option value="resume-analysis">Resume Analysis</option>
          <option value="mock-interview">Mock Interview</option>
        </select>
        
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white cursor-pointer w-full md:w-auto"
        >
          <option value="all">All Time</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    </div>
  );
};

export default HistoryFilters;
