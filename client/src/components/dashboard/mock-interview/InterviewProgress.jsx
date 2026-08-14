import React from 'react';

const InterviewProgress = ({ current, total, targetRole, focusAreas }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-slate-800 mb-4">Interview Progress</h3>
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm text-slate-600">{current} / {total} Questions</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(current / total) * 100}%` }}
          ></div>
        </div>
        
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Current Score</div>
          <div className="text-xl font-bold text-slate-900">—</div>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center px-2">
          Complete the interview to receive your AI feedback and overall score.
        </p>
      </div>
      
      <div className="pt-6 border-t border-slate-100">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Context</h3>
        <div className="mb-5">
          <div className="text-xs text-slate-400 mb-1 font-medium">Target Role</div>
          <div className="text-sm font-semibold text-slate-800">{targetRole}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-2 font-medium">Focus Areas</div>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area, i) => (
              <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-600">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewProgress;
