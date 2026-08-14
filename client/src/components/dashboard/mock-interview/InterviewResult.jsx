import React from 'react';
import { FiCheck, FiAlertTriangle, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const InterviewResult = ({ onRetry }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl mx-auto mt-4">
      <div className="p-8 text-center border-b border-slate-100 bg-slate-50/50 flex flex-col items-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <FiAward className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Interview Complete!</h2>
        <p className="text-slate-600">Here's how you performed in your mock interview.</p>
      </div>
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-10 mb-10 pb-10 border-b border-slate-100">
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="54" cx="64" cy="64" />
                <circle className="text-emerald-500" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset="64.46" strokeLinecap="round" stroke="currentColor" fill="transparent" r="54" cx="64" cy="64" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">81<span className="text-lg text-slate-500 font-medium">/100</span></span>
              </div>
            </div>
            <div className="mt-4 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Great Progress
            </div>
          </div>
          
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-medium text-slate-700">Technical Understanding</span>
                <span className="text-sm font-bold text-slate-900">88%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '88%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-medium text-slate-700">Communication</span>
                <span className="text-sm font-bold text-slate-900">82%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '82%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-medium text-slate-700">Relevance</span>
                <span className="text-sm font-bold text-slate-900">92%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-medium text-slate-700">Completeness</span>
                <span className="text-sm font-bold text-slate-900">76%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: '76%' }}></div></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
              <span className="bg-emerald-100 p-1.5 rounded"><FiCheck className="w-4 h-4" /></span>
              Your Strengths
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-emerald-500 shrink-0 mt-0.5">•</span> Strong technical understanding
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-emerald-500 shrink-0 mt-0.5">•</span> Clear explanation of implementation
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-emerald-500 shrink-0 mt-0.5">•</span> Good role-specific knowledge
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <span className="bg-amber-100 p-1.5 rounded"><FiAlertTriangle className="w-4 h-4" /></span>
              Areas to Improve
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-amber-500 shrink-0 mt-0.5">•</span> Provide more concrete examples
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-amber-500 shrink-0 mt-0.5">•</span> Explain trade-offs more clearly
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-amber-500 shrink-0 mt-0.5">•</span> Improve answer completeness
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2.5 bg-white text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            Back to Overview
          </button>
          <button 
            onClick={() => navigate('/dashboard/history')}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            View Interview History
          </button>
          <button 
            onClick={onRetry}
            className="px-8 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-colors cursor-pointer w-full sm:w-auto text-center shadow-sm"
          >
            Try Another Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewResult;
