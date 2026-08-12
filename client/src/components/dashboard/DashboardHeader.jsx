import React from 'react';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import { IoStatsChart } from 'react-icons/io5';

const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-20 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="text-blue-700">
          <IoStatsChart className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">CareerLens</h1>
          <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-1">Analyze. Focus. Grow.</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-6">
        <span className="hidden md:block font-bold text-lg mr-4">Overview</span>
        <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100">
          <FiBell className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 cursor-pointer py-1 px-2 rounded-full hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
            OD
          </div>
          <span className="font-semibold text-sm hidden md:block">Om Dwivedi</span>
          <FiChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
