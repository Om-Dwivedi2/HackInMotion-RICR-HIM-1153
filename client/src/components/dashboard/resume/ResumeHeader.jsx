import React from 'react';

const ResumeHeader = ({ hasResume, onAnalyze, onReplace }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Resume</h1>
        <p className="text-slate-600 mt-1 text-sm">
          Manage your resume and keep it ready for your next career opportunity.
        </p>
      </div>
      {hasResume && (
        <div className="flex items-center gap-3">
          <button 
            onClick={onReplace}
            className="px-4 py-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Replace Resume
          </button>
          <button 
            onClick={onAnalyze}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Analyze Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeHeader;
