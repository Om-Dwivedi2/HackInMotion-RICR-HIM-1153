import React from 'react';
import { FiBriefcase } from 'react-icons/fi';

const TargetRoleCard = ({ role, resumeName, lastAnalyzed }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 min-w-[350px]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Target Role</p>
          <h3 className="text-xl font-bold text-slate-900">{role}</h3>
        </div>
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
          <FiBriefcase className="w-6 h-6" />
        </div>
      </div>
      
      <div className="space-y-1 mb-6 text-sm text-slate-600">
        <p>Resume: <span className="font-medium text-slate-700">{resumeName}</span></p>
        <p>Last analyzed: {lastAnalyzed}</p>
      </div>
      
      <div className="flex gap-3">
        <button className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-slate-700 font-semibold hover:bg-gray-50 transition-colors text-sm">
          View Analysis
        </button>
        <button className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm">
          Change Target
        </button>
      </div>
    </div>
  );
};

export default TargetRoleCard;
