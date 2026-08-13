import React from 'react';

const SettingsSection = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/3 shrink-0">
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="lg:w-2/3 flex-1">
        {children}
      </div>
    </div>
  );
};

export default SettingsSection;
