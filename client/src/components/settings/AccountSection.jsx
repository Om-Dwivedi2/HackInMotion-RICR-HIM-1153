import React from 'react';
import SettingsSection from './SettingsSection';
import { FiLogOut, FiTrash2 } from 'react-icons/fi';

const AccountSection = () => {
  return (
    <SettingsSection
      title="Account"
      description="Manage your account actions."
    >
      <div className="flex flex-col gap-4">
        
        {/* Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-100 shrink-0">
              <FiLogOut className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Logout</h4>
              <p className="text-sm text-slate-500 mt-1">Sign out of your CareerLens account.</p>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors shrink-0">
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-100 bg-red-50/30">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white rounded-lg shadow-sm border border-red-100 shrink-0">
              <FiTrash2 className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Delete Account</h4>
              <p className="text-sm text-slate-500 mt-1">Permanently delete your CareerLens account and associated data. This action cannot be undone.</p>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-red-600 bg-white border border-red-200 hover:bg-red-50 transition-colors shrink-0">
            <FiTrash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>

      </div>
    </SettingsSection>
  );
};

export default AccountSection;
