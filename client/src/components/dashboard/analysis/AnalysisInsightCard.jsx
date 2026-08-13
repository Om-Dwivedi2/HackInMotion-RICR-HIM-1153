import React from 'react';
import { FiTarget, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AnalysisInsightCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl shadow-md p-6 text-white mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm shrink-0">
            <FiTarget className="w-6 h-6 text-indigo-300" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1.5">Recommended Next Step</h3>
            <p className="text-indigo-100 text-sm max-w-2xl leading-relaxed">
              Your strongest areas are JavaScript and React. The biggest opportunities are Docker, AWS, and CI/CD. Improve the missing technical keywords and practice a Backend Engineer mock interview.
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/dashboard/interview')}
          className="px-5 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 rounded-lg text-sm font-bold transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
        >
          Start Mock Interview <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AnalysisInsightCard;
