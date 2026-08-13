import React from 'react';
import { FiFileText, FiMic, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HistoryItem = ({ activity }) => {
  const navigate = useNavigate();
  
  const isAnalysis = activity.type === 'resume-analysis';
  const Icon = isAnalysis ? FiFileText : FiMic;
  const iconColor = isAnalysis ? 'text-indigo-600 bg-indigo-100' : 'text-purple-600 bg-purple-100';
  
  const getScoreColor = (score) => {
    if (isAnalysis) {
      if (score >= 82) return 'text-emerald-700 bg-emerald-50';
      if (score >= 70) return 'text-blue-700 bg-blue-50';
      if (score >= 50) return 'text-amber-700 bg-amber-50';
      return 'text-red-700 bg-red-50';
    } else {
      if (score >= 90) return 'text-emerald-700 bg-emerald-50';
      if (score >= 80) return 'text-blue-700 bg-blue-50';
      if (score >= 60) return 'text-amber-700 bg-amber-50';
      return 'text-red-700 bg-red-50';
    }
  };

  const handleAction = () => {
    if (isAnalysis) {
      navigate('/dashboard/analysis');
    } else {
      navigate('/dashboard/interview');
    }
  };

  return (
    <div className="p-5 sm:p-6 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      
      <div className="flex items-center gap-4 sm:gap-6 flex-1">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-bold text-slate-900 mb-0.5 truncate">{activity.title}</h4>
          <div className="text-sm font-medium text-slate-700 mb-1 truncate">
            {activity.targetRole}
          </div>
          <div className="text-xs text-slate-500 truncate">
            {isAnalysis ? `Resume: ${activity.resumeName}` : activity.interviewType}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            {activity.date} · {activity.time}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:gap-4 mt-2 sm:mt-0 shrink-0">
        <div className="flex flex-col sm:items-end gap-1">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            {isAnalysis ? 'Match Score' : 'Interview Score'}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">
              {activity.score}{!isAnalysis && <span className="text-sm text-slate-400 font-medium">/100</span>}{isAnalysis && '%'}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getScoreColor(activity.score)}`}>
              {activity.scoreLabel}
            </span>
          </div>
        </div>
        
        <button 
          onClick={handleAction}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
        >
          {isAnalysis ? 'View Analysis' : 'View Result'} <FiArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      
    </div>
  );
};

export default HistoryItem;
