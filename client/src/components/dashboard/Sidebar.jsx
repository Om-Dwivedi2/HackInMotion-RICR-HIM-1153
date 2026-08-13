import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiFileText, FiBarChart2, FiMic, FiClock, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Overview', path: '/dashboard', icon: FiHome },
  { name: 'My Resume', path: '/dashboard/resume', icon: FiFileText },
  { name: 'Analysis', path: '/dashboard/analysis', icon: FiBarChart2 },
  { name: 'Mock Interview', path: '/dashboard/interview', icon: FiMic },
  { name: 'History', path: '/dashboard/history', icon: FiClock },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0">
      <div className="flex-1 py-8 flex flex-col gap-1 px-4">
        {navItems.map((item) => {
          // simple check for active state
          const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
          
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
              {item.name}
            </NavLink>
          );
        })}
        
        <div className="my-6 border-t border-gray-100 mx-4"></div>
        
        <NavLink
          to="/dashboard/settings"
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
        >
          <FiSettings className="w-5 h-5 text-slate-400" />
          Settings
        </NavLink>
      </div>
      
      <div className="p-6">
        <button onClick={logout} className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all w-full">
          <FiLogOut className="w-5 h-5 text-red-400" />
          Logout
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
