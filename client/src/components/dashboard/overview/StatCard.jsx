import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, highlightClass }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlightClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="font-semibold text-slate-700 text-sm">{title}</h4>
      </div>
      
      <div>
        <div className={`text-4xl font-bold mb-1 ${colorClass}`}>
          {value}
        </div>
        <p className="text-sm font-medium text-slate-600">
          {subtitle}
        </p>
      </div>
      
      {/* Visual bottom border indicator for emphasis */}
      <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full w-3/4 rounded-full ${colorClass.replace('text-', 'bg-')}`}></div>
      </div>
    </div>
  );
};

export default StatCard;
