import React, { useState } from 'react';
import { FiRefreshCw, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AnalysisHeader = ({ analysis, onReanalyze, onViewResume }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    const id = toast.loading('Analyzing...');
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success('Analysis refreshed successfully.', { id });
      onReanalyze();
    }, 1500);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analysis</h1>
        <p className="text-slate-600 mt-1 text-sm max-w-xl">
          See how well your resume matches your target role and understand what to improve.
        </p>
        
        {analysis && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Target Role</span>
              <span className="font-medium text-slate-900">{analysis.targetRole}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Resume</span>
              <span className="font-medium text-slate-900">{analysis.resumeName}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Last analyzed</span>
              <span className="font-medium text-slate-900">{analysis.lastAnalyzed}</span>
            </div>
          </div>
        )}
      </div>
      
      {analysis && (
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onViewResume}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm"
          >
            <FiFileText /> View Resume
          </button>
          <button 
            onClick={handleReanalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm disabled:opacity-70"
          >
            <FiRefreshCw className={isAnalyzing ? 'animate-spin' : ''} /> 
            {isAnalyzing ? 'Analyzing...' : 'Re-analyze Resume'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisHeader;
