import React from 'react';
import { FiUserX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const InterviewEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center max-w-2xl mx-auto mt-8">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
        <FiUserX className="w-8 h-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-900 mb-3">Complete your profile first</h2>
      
      <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
        Upload your resume and choose a target role before starting a personalized mock interview.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button 
          onClick={() => navigate('/dashboard/resume')}
          className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors cursor-pointer w-full sm:w-auto"
        >
          Upload Resume
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors cursor-pointer w-full sm:w-auto"
        >
          Go to Overview
        </button>
      </div>
    </div>
  );
};

export default InterviewEmptyState;
