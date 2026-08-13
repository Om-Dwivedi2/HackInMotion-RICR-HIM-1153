import React from 'react';
import { FiPieChart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AnalysisEmptyState = ({ hasResume }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center max-w-3xl mx-auto mt-8">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
        <FiPieChart className="w-8 h-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-900 mb-3">No analysis available yet</h2>
      
      <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
        Upload your resume and choose a target role to get your personalized career analysis, highlighting strengths and skill gaps.
      </p>
      
      <button 
        onClick={() => navigate('/dashboard/resume')}
        className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors cursor-pointer inline-flex items-center justify-center"
      >
        {hasResume ? 'Analyze My Resume' : 'Upload Resume to Analyze'}
      </button>
    </div>
  );
};

export default AnalysisEmptyState;
