import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProfileSection from '../components/settings/ProfileSection';
import CareerPreferences from '../components/settings/CareerPreferences';
import AccountSection from '../components/settings/AccountSection';

const Settings = () => {
  // Mock data as requested
  const [user, setUser] = useState({
    name: "Om Dwivedi",
    email: "om@example.com",
    phone: "+91 98765 43210",
    initials: "OD",
  });

  const [preferences, setPreferences] = useState({
    targetRole: "Backend Engineer",
    experienceLevel: "Entry Level"
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Settings</h2>
          <p className="text-slate-600">Manage your account and career preferences.</p>
        </div>

        <ProfileSection 
          user={user} 
          onUpdateUser={(updatedUser) => setUser(updatedUser)} 
        />
        
        <CareerPreferences 
          preferences={preferences} 
          onUpdatePreferences={(updatedPrefs) => setPreferences(updatedPrefs)} 
        />
        
        <AccountSection />
      </div>
    </DashboardLayout>
  );
};

export default Settings;

import React from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Settings</h2>
        <p className="text-slate-600">Settings content goes here.</p>
      </div>
    </DashboardLayout>
  )
}

export default Settings
