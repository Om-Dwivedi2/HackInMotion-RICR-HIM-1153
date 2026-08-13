import React from 'react';
import { FiFileText, FiMic, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const activities = [
  {
    id: 1,
    type: 'resume_analysis',
    title: 'Resume analyzed',
    subtitle: 'Backend Engineer',
    time: 'Today, 10:30 AM',
    icon: FiFileText,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    id: 2,
    type: 'mock_interview',
    title: 'Mock interview completed',
    subtitle: 'Score: 81/100',
    time: 'Yesterday, 04:15 PM',
    icon: FiMic,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 3,
    type: 'resume_update',
    title: 'Resume updated',
    subtitle: 'Om_Dwivedi_Resume_v2.pdf',
    time: 'Aug 10, 2026',
    icon: FiFileText,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  }
];

const RecentActivity = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-slate-900">Recent Activity</h3>
        <button onClick={() => navigate('/dashboard/history')} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          View All History
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col justify-between space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id}>
            <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${activity.iconBg} ${activity.iconColor} rounded-lg flex items-center justify-center shrink-0`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{activity.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">{activity.time}</span>
                <FiChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
            {index < activities.length - 1 && <hr className="border-gray-100 my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
