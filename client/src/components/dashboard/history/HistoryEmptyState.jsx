import React from 'react';
import { FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HistoryEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center max-w-3xl mx-auto mt-8">
      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-slate-100">
        <FiClock className="w-8 h-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-900 mb-3">No activity yet</h2>
      
      <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
        Your resume analyses and mock interviews will appear here once you get started.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button 
          onClick={() => navigate('/dashboard/analysis')}
          className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors cursor-pointer w-full sm:w-auto"
        >
          Analyze My Resume
        </button>
        <button 
          onClick={() => navigate('/dashboard/interview')}
          className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors cursor-pointer w-full sm:w-auto"
        >
          Try Mock Interview
        </button>
      </div>
    </div>
  );
};

export default HistoryEmptyState;
