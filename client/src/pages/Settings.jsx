import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProfileSection from '../components/settings/ProfileSection';
import CareerPreferences from '../components/settings/CareerPreferences';
import AccountSection from '../components/settings/AccountSection';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user: authUser } = useAuth();
  
  const [user, setUser] = useState({
    name: authUser?.name || "User",
    email: authUser?.email || "",
    phone: authUser?.phone || "",
    initials: authUser?.name ? authUser.name.charAt(0).toUpperCase() : "U",
  });

  const [preferences, setPreferences] = useState({
    targetRole: "Backend Engineer",
    experienceLevel: "Entry Level"
  });

  useEffect(() => {
    const fetchTarget = async () => {
      try {
        const response = await api.get('/targets/active');
        if (response.data.success && response.data.data) {
          setPreferences({
            targetRole: response.data.data.role,
            experienceLevel: "Entry Level" // Target API currently only handles role, keep experience static or default
          });
        }
      } catch (err) {
        console.error("Failed to fetch target preferences", err);
      }
    };
    fetchTarget();
  }, []);

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