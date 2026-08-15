import React, { useState } from 'react';
import { MdMic } from 'react-icons/md';
import VoiceAnswerModal from './VoiceAnswerModal';

const AnswerInput = ({ value, onChange, onSubmit, onSkip, isSubmitting, disabled }) => {
  const maxLength = 2000;
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const handleVoiceFinalize = (transcript) => {
    setIsVoiceModalOpen(false);
    
    if (!transcript) return;
    
    const spaceLeft = maxLength - value.length;
    if (spaceLeft <= 0) return;
    
    const toAppend = value.length > 0 && !value.endsWith(' ') && !value.endsWith('\n')
      ? ' ' + transcript 
      : transcript;
      
    const newVal = value + toAppend;
    
    if (newVal.length > maxLength) {
       onChange(newVal.substring(0, maxLength));
    } else {
       onChange(newVal);
    }
  };

  const handleVoiceSubmit = (transcript) => {
    setIsVoiceModalOpen(false);
    
    let finalMergedValue = value;
    
    // First append the transcript
    if (transcript) {
      const spaceLeft = maxLength - value.length;
      if (spaceLeft > 0) {
        const toAppend = value.length > 0 && !value.endsWith(' ') && !value.endsWith('\n')
          ? ' ' + transcript 
          : transcript;
          
        const newVal = value + toAppend;
        finalMergedValue = newVal.length > maxLength ? newVal.substring(0, maxLength) : newVal;
        onChange(finalMergedValue);
      }
    }
    
    // Pass the merged value directly to onSubmit to avoid stale state issues
    setTimeout(() => {
       onSubmit(finalMergedValue);
    }, 0);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-0 transition-all duration-200">
      <div className="relative flex flex-col">
        <textarea
          className="w-full p-6 text-slate-700 bg-transparent resize-none focus:outline-none min-h-[250px]"
          placeholder="Type your answer here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || isSubmitting}
          maxLength={maxLength}
        ></textarea>
        
        {/* We place the Voice Answer button inside the textarea area at the bottom right */}
        <div className="absolute bottom-4 right-6 flex items-center gap-3 z-10">
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            disabled={disabled || isSubmitting}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
            title="Answer by Voice"
            aria-label="Open voice input modal"
          >
            <MdMic className="w-5 h-5 text-blue-600" />
            Voice Answer
          </button>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20 relative">
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
      
      {/* The Voice Recording Modal */}
      <VoiceAnswerModal 
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onStop={handleVoiceFinalize}
        onSubmit={handleVoiceSubmit}
        existingValueLength={value.length}
        maxLength={maxLength}
      />
    </div>
  );
};

export default AnswerInput;
