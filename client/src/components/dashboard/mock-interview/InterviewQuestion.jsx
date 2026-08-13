import React from 'react';
import { FiCpu } from 'react-icons/fi';

const InterviewQuestion = ({ question, type }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-0">
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <FiCpu className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-slate-800">AI Interviewer</h3>
        </div>
        {type && (
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
            {type}
          </span>
        )}
      </div>
      <div className="p-6 md:p-8">
        <p className="text-lg text-slate-800 leading-relaxed font-medium">
          "{question}"
        </p>
      </div>
    </div>
  );
};

export default InterviewQuestion;
