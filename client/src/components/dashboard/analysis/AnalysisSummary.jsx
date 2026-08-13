import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const AnalysisSummary = ({ score, targetRole }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="relative flex items-center justify-center shrink-0">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            className="text-slate-100"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
          />
          <circle
            className="text-blue-600 transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="48"
            cy="48"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">{score}%</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          Overall Match
        </h3>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mt-2 mb-3">
          <FiCheckCircle className="w-3.5 h-3.5" /> Strong Match
        </div>
        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
          Your resume is a strong match for the <span className="font-semibold text-slate-900">{targetRole}</span> role, with a few important areas to improve to maximize your chances.
        </p>
      </div>
    </div>
  );
};

export default AnalysisSummary;
