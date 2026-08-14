import React from 'react';
import { useNavigate } from 'react-router-dom';

const SkillGaps = ({ gaps = [] }) => {
  const navigate = useNavigate();

  const formattedGaps = gaps.map(gap => {
    const isMissing = gap.priority; // missing skills have priority
    const status = isMissing ? 'Missing' : 'Weak';
    const statusColor = isMissing ? 'text-red-500' : 'text-orange-500';
    const statusBg = isMissing ? 'bg-red-50' : 'bg-orange-50';
    const barWidth = isMissing ? 'w-1/4' : 'w-2/4';
    const barColor = isMissing ? 'bg-red-500' : 'bg-orange-500';
    const priority = isMissing 
      ? (gap.priority === 'high' ? 'High Priority' : gap.priority === 'medium' ? 'Medium Priority' : 'Low Priority')
      : 'Medium Priority';

    return {
      skill: gap.skill,
      status,
      priority,
      statusColor,
      statusBg,
      barWidth,
      barColor
    };
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-slate-900">Top Skill Gaps</h3>
        <button 
          onClick={() => navigate('/dashboard/analysis')}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          View Full Analysis
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        {formattedGaps.length > 0 ? formattedGaps.slice(0, 4).map((gap, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="w-1/4 font-semibold text-sm text-slate-800 truncate" title={gap.skill}>
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
        )) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm">
            No skill gaps found! Great job.
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillGaps;
