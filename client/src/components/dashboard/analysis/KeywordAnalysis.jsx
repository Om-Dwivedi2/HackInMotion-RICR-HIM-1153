import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

const KeywordAnalysis = ({ matchedKeywords, missingKeywords }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <h3 className="font-semibold text-slate-800">Keyword Analysis</h3>
        <p className="text-xs text-slate-500 mt-1">Important keywords from the target job description.</p>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-6">
        
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Matched Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-medium flex items-center gap-1.5">
                <FiCheck className="w-3 h-3" /> {kw}
              </span>
            ))}
          </div>
        </div>
        
        <div className="w-full h-px bg-slate-100"></div>

        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Missing Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 rounded-full text-xs font-medium flex items-center gap-1.5">
                <FiX className="w-3 h-3" /> {kw}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default KeywordAnalysis;
