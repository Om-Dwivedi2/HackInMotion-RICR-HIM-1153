import React, { useState } from 'react';
import SettingsSection from './SettingsSection';
import { FiCamera, FiLock, FiEdit2, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';

const ProfileSection = ({ user, onUpdateUser }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <SettingsSection
      title="Profile"
      description="Update your personal information and profile details."
    >
      <div className="flex flex-col gap-8">
        
        {/* Profile Info - Vertical Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Profile Photo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                {user?.initials || 'U'}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100">
                <FiCamera className="w-4 h-4" />
                Change Photo
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <FiUser className="w-5 h-5 text-slate-400" />
              <span className="text-slate-900">{user?.name || 'Not set'}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <FiMail className="w-5 h-5 text-slate-400" />
              <span className="text-slate-900">{user?.email || 'Not set'}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <FiPhone className="w-5 h-5 text-slate-400" />
              <span className="text-slate-900">{user?.phone || 'Not set'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100 w-full sm:justify-end">
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-slate-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <FiLock className="w-4 h-4" />
            Change Password
          </button>
          
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={user}
        onUpdate={onUpdateUser}
      />
      
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </SettingsSection>
  );
};

export default ProfileSection;
