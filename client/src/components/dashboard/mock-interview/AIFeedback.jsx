import React from 'react';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';

const MetricBar = ({ label, percentage }) => {
  const getColor = (val) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-end mb-1">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span className="text-xs font-bold text-slate-900">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${getColor(percentage)}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const AIFeedback = ({ feedback, onNext }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-0">
      <div className="border-b border-slate-100 bg-indigo-50/50 px-5 py-4 flex items-center justify-between">
        <h3 className="font-semibold text-indigo-900">AI Feedback</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Overall</span>
          <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-md text-sm font-bold">
            {feedback.score}/100
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1 border-r border-slate-100 pr-4">
            <MetricBar label="Relevance" percentage={feedback.metrics.relevance} />
            <MetricBar label="Clarity" percentage={feedback.metrics.clarity} />
            <MetricBar label="Completeness" percentage={feedback.metrics.completeness} />
          </div>
          <div className="md:col-span-2 space-y-4">
            {feedback.positive.length > 0 && (
              <div>
                {feedback.positive.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                    <FiCheck className="text-emerald-500 mt-0.5 shrink-0 w-4 h-4" />
                    <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            )}
            
            {feedback.improvement.length > 0 && (
              <div className="pt-3 mt-3 border-t border-slate-100">
                {feedback.improvement.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                    <FiAlertTriangle className="text-amber-500 mt-0.5 shrink-0 w-4 h-4" />
                    <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            onClick={onNext}
            className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm w-full sm:w-auto text-center"
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIFeedback;
