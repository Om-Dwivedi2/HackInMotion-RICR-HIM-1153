import React from 'react';
import { FiFileText, FiMic, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const typeConfig = {
  'resume-analysis': {
    icon: FiFileText,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  'mock-interview': {
    icon: FiMic,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  }
};

const RecentActivity = ({ activities = [] }) => {
  const navigate = useNavigate();


  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-slate-900">Recent Activity</h3>
        <button 
          onClick={() => navigate('/dashboard/history')}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          View All History
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col justify-start space-y-4">
        {activities.length > 0 ? activities.slice(0, 3).map((activity, index) => {
          const config = typeConfig[activity.type] || typeConfig['resume-analysis'];
          const Icon = config.icon;
          
          return (
            <div key={activity.id}>
              <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${config.iconBg} ${config.iconColor} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{activity.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{activity.targetRole} - {activity.scoreLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{activity.date}</span>
                  <FiChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
              {index < Math.min(activities.length, 3) - 1 && <hr className="border-gray-100 my-2" />}
            </div>
          );
        }) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm">
            No recent activity found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
