import React from 'react';
import Sidebar from './Sidebar';
import Navbar from '../Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
