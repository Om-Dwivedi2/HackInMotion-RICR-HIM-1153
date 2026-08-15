import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MdMic, MdStop, MdClose, MdSend } from 'react-icons/md';
import { useSpeechRecognition } from '../../../hooks/useSpeechRecognition';
import toast from 'react-hot-toast';

const VoiceAnswerModal = ({ isOpen, onClose, onSubmit, onStop, existingValueLength, maxLength = 2000 }) => {
  const [localTranscript, setLocalTranscript] = useState('');
  const {
    isSupported,
    isRecording,
    interimTranscript,
    startRecording,
    stopRecording,
    formattedTime
  } = useSpeechRecognition();

  const transcriptRef = useRef(localTranscript);
  useEffect(() => {
    transcriptRef.current = localTranscript;
  }, [localTranscript]);

  const handleFinalResult = useCallback((finalText) => {
    const currentVal = transcriptRef.current;
    const spaceLeft = maxLength - existingValueLength - currentVal.length;
    
    if (spaceLeft <= 0) {
       toast.error("Maximum answer length reached.");
       stopRecording();
       return;
    }
    
    const toAppend = currentVal.length > 0 && !currentVal.endsWith(' ') && !currentVal.endsWith('\n')
      ? ' ' + finalText 
      : finalText;
      
    const newVal = currentVal + toAppend;
    const totalLen = existingValueLength + newVal.length;
    
    if (totalLen > maxLength) {
       setLocalTranscript(newVal.substring(0, spaceLeft));
       toast.error("Maximum answer length reached.");
       stopRecording();
    } else {
       setLocalTranscript(newVal);
    }
  }, [existingValueLength, maxLength, stopRecording]);

  // Auto-start recording when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalTranscript('');
      startRecording(handleFinalResult);
    } else {
      stopRecording();
    }
  }, [isOpen, startRecording, stopRecording, handleFinalResult]);

  const handleStop = () => {
    stopRecording();
    onStop(localTranscript);
  };

  const handleSubmit = () => {
    stopRecording();
    onSubmit(localTranscript);
  };

  const handleClose = () => {
    stopRecording();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 flex flex-col transition-all duration-300 transform scale-100 opacity-100">
        
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Answer by Voice</h3>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
            title="Cancel"
            aria-label="Cancel voice recording"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-slate-50/50">
          
          <div className="relative mb-6">
            {isRecording && (
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            )}
            <div className={`relative z-10 p-6 rounded-full ${isRecording ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-slate-200'} transition-colors duration-300`}>
               <MdMic className={`w-10 h-10 ${isRecording ? 'text-white' : 'text-slate-500'}`} />
            </div>
          </div>

          <div className="text-center mb-6">
            <div className={`font-medium text-lg mb-1 ${isRecording ? 'text-blue-600' : 'text-slate-500'}`}>
              {isRecording ? 'Listening...' : 'Recording Stopped'}
            </div>
            <div className="text-slate-500 font-mono">
              {formattedTime}
            </div>
          </div>

          <div className="w-full bg-white rounded-xl border border-slate-200 p-4 min-h-[120px] max-h-[200px] overflow-y-auto text-slate-700 shadow-sm relative">
             {localTranscript ? (
               <p className="whitespace-pre-wrap">{localTranscript}</p>
             ) : (
               <p className="text-slate-400 italic">Your spoken answer will appear here...</p>
             )}
             
             {isRecording && interimTranscript && (
               <p className="text-slate-400 italic mt-2 border-l-2 border-blue-300 pl-2">{interimTranscript}</p>
             )}
          </div>
          
          <div className="w-full flex justify-end mt-2">
            <span className="text-xs text-slate-400">
              {existingValueLength + localTranscript.length} / {maxLength} characters
            </span>
          </div>

        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleStop}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors w-full sm:w-auto shadow-sm cursor-pointer"
            aria-label="Stop voice recording"
          >
            <MdStop className="w-5 h-5 text-red-500" />
            Stop & Review
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={(!localTranscript.trim() && !interimTranscript.trim()) && existingValueLength === 0}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors w-full sm:w-auto shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Submit voice answer"
          >
            <MdSend className="w-5 h-5" />
            Submit Answer
          </button>
        </div>

      </div>
    </div>
  );
};

export default VoiceAnswerModal;
