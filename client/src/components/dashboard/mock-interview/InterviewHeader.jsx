import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const InterviewHeader = ({ targetRole, currentQuestion, totalQuestions, onEnd }) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="font-bold text-slate-900">Mock Interview</h2>
          <p className="text-sm text-slate-500">{targetRole}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium text-slate-900">Question {currentQuestion} of {totalQuestions}</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{formatTime(seconds)}</div>
          </div>
          <button 
            onClick={onEnd}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="End Interview"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default InterviewHeader;
