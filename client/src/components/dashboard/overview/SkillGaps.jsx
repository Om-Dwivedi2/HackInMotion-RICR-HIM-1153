import React from 'react';

const gaps = [
  { skill: 'Docker', status: 'Missing', priority: 'High Priority', statusColor: 'text-red-500', statusBg: 'bg-red-50', barWidth: 'w-1/4', barColor: 'bg-red-500' },
  { skill: 'AWS', status: 'Missing', priority: 'High Priority', statusColor: 'text-red-500', statusBg: 'bg-red-50', barWidth: 'w-1/4', barColor: 'bg-red-500' },
  { skill: 'System Design', status: 'Weak', priority: 'Medium Priority', statusColor: 'text-orange-500', statusBg: 'bg-orange-50', barWidth: 'w-2/4', barColor: 'bg-orange-500' },
  { skill: 'CI/CD', status: 'Weak', priority: 'Medium Priority', statusColor: 'text-orange-500', statusBg: 'bg-orange-50', barWidth: 'w-2/4', barColor: 'bg-orange-500' },
];

const SkillGaps = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-slate-900">Top Skill Gaps</h3>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          View Full Analysis
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        {gaps.map((gap, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="w-1/4 font-semibold text-sm text-slate-800">
              {gap.skill}
            </div>
            
            <div className="w-1/4 flex justify-center">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${gap.statusBg} ${gap.statusColor}`}>
                {gap.status}
              </span>
            </div>
            
            <div className="w-1/4 px-4 flex items-center">
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${gap.barWidth} ${gap.barColor}`}></div>
              </div>
            </div>
            
            <div className="w-1/4 text-right text-xs font-medium text-slate-500">
              {gap.priority}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillGaps;
