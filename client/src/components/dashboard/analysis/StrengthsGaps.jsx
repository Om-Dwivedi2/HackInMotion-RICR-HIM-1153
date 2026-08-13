import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StrengthsGaps = ({ strengths, gaps }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      
      <div className="bg-white rounded-xl border border-emerald-100 shadow-sm overflow-hidden">
        <div className="border-b border-emerald-50 bg-emerald-50/30 px-5 py-4 flex items-center gap-2">
          <FiTrendingUp className="text-emerald-600" />
          <h3 className="font-semibold text-emerald-800">Top Strengths</h3>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-amber-100 shadow-sm overflow-hidden">
        <div className="border-b border-amber-50 bg-amber-50/30 px-5 py-4 flex items-center gap-2">
          <FiTrendingDown className="text-amber-600" />
          <h3 className="font-semibold text-amber-800">Top Gaps</h3>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {gaps.map((gap, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span className="leading-relaxed">{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default StrengthsGaps;
