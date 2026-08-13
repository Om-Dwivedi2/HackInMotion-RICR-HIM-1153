import React, { useState } from 'react';
import { FiX, FiUploadCloud } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ReplaceResumeModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const validateFile = (file) => {
    if (!file) return false;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5 MB.');
      return false;
    }
    
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = ['.pdf', '.doc', '.docx'];
    
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!validTypes.includes(file.type) && !hasValidExtension) {
      toast.error('Please upload a PDF, DOC, or DOCX file.');
      return false;
    }
    
    return true;
  };

  const processUpload = (file) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success('Resume replaced successfully.');
      onUploadSuccess();
      onClose();
    }, 1500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) processUpload(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Replace Resume</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">Upload your new resume to update your profile.</p>
          
          <div 
            className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'} rounded-xl p-8 text-center transition-all relative`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                if (validateFile(e.target.files[0])) processUpload(e.target.files[0]);
                e.target.value = null;
              }}
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              disabled={isUploading}
            />
            
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <FiUploadCloud className="w-10 h-10 text-slate-400 mb-3" />
              <p className="text-sm font-medium text-slate-700 mb-1">
                {isUploading ? 'Uploading...' : 'Drag & drop file here'}
              </p>
              <button 
                type="button"
                className="text-blue-600 text-sm font-medium pointer-events-auto cursor-pointer"
                disabled={isUploading}
                onClick={() => document.querySelector('.absolute.inset-0').click()}
              >
                Browse Files
              </button>
              <p className="text-slate-400 text-xs mt-3">PDF, DOC, DOCX • Max 5MB</p>
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            disabled={isUploading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplaceResumeModal;
