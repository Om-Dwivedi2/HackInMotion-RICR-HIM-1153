import React, { useState } from 'react';
import SettingsSection from './SettingsSection';
import { FiBriefcase, FiBarChart, FiEdit2 } from 'react-icons/fi';
import EditPreferencesModal from './EditPreferencesModal';

const CareerPreferences = ({ preferences, onUpdatePreferences }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SettingsSection
      title="Career Preferences"
      description="Set your career goals and target preferences."
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Target Role</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <FiBriefcase className="w-5 h-5 text-slate-400" />
              <span className="text-slate-900">{preferences?.targetRole || 'Not set'}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Experience Level</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <FiBarChart className="w-5 h-5 text-slate-400" />
              <span className="text-slate-900">{preferences?.experienceLevel || 'Not set'}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit Preferences
          </button>
        </div>
      </div>

      <EditPreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preferences={preferences}
        onUpdate={onUpdatePreferences}
      />
    </SettingsSection>
  );
};

export default CareerPreferences;
