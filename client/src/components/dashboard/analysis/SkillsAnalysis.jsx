import React from 'react';
import { FiCheck, FiAlertTriangle, FiX } from 'react-icons/fi';

const SkillsAnalysis = ({ strongSkills, needsImprovement, missingSkills }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <h3 className="font-semibold text-slate-800">Skills Analysis</h3>
      </div>
      <div className="p-5 space-y-6">
        
        <div>
          <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span className="bg-emerald-100 p-1 rounded-md"><FiCheck className="w-3 h-3" /></span>
            Strong Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {strongSkills.map((skill, i) => (
              <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 flex items-center gap-1.5">
                <FiCheck className="text-emerald-500 w-3.5 h-3.5" /> {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span className="bg-amber-100 p-1 rounded-md"><FiAlertTriangle className="w-3 h-3" /></span>
            Needs Improvement
          </h4>
          <div className="flex flex-wrap gap-2">
            {needsImprovement.map((skill, i) => (
              <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 flex items-center gap-1.5">
                <FiAlertTriangle className="text-amber-500 w-3.5 h-3.5" /> {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span className="bg-red-100 p-1 rounded-md"><FiX className="w-3 h-3" /></span>
            Missing
          </h4>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, i) => (
              <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 flex items-center gap-1.5">
                <FiX className="text-red-500 w-3.5 h-3.5" /> {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillsAnalysis;
