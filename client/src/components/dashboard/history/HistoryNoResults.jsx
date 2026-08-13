import React from 'react';
import { FiSearch } from 'react-icons/fi';

const HistoryNoResults = ({ onClear }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center mt-6">
      <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiSearch className="w-5 h-5" />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2">No matching activity</h3>
      
      <p className="text-slate-500 mb-6 text-sm">
        Try changing your search or filters.
      </p>
      
      <button 
        onClick={onClear}
        className="px-5 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default HistoryNoResults;
