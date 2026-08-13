import React from 'react';
import { FiFileText, FiCheckCircle } from 'react-icons/fi';

const ResumeOverview = ({ resume, onView, onReplace }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
        <h3 className="font-semibold text-slate-800">Resume</h3>
      </div>
      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <FiFileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-medium text-slate-900">{resume.fileName}</h4>
            <div className="text-sm text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{resume.fileType}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>{resume.fileSize}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>Uploaded {resume.uploadedAt}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></span>
              <span className="hidden sm:inline">Last analyzed {resume.lastAnalyzed}</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <FiCheckCircle className="w-4 h-4" />
              <span>Status: {resume.status}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <button 
            onClick={onView}
            className="px-4 py-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            View Resume
          </button>
          <button 
            onClick={onReplace}
            className="px-4 py-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Replace Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeOverview;
