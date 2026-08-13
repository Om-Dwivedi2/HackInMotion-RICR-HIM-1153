import React from 'react';

const AnswerInput = ({ value, onChange, onSubmit, onSkip, isSubmitting, disabled }) => {
  const maxLength = 2000;
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-0">
      <textarea
        className="w-full p-6 text-slate-700 bg-transparent resize-none focus:outline-none min-h-[250px]"
        placeholder="Type your answer here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || isSubmitting}
        maxLength={maxLength}
      ></textarea>
      
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-400 font-medium">
          {value.length} / {maxLength} characters
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onSkip}
            disabled={disabled || isSubmitting}
            className="px-4 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            Skip Question
          </button>
          <button
            onClick={onSubmit}
            disabled={disabled || isSubmitting || value.trim().length === 0}
            className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {isSubmitting ? 'Analyzing...' : 'Submit Answer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerInput;
