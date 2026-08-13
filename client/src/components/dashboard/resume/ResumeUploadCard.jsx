import React, { useState } from 'react';
import { FiUploadCloud, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ResumeUploadCard = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file) => {
    if (!file) return false;
    
    // Check size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5 MB.');
      return false;
    }
    
    // Check type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = ['.pdf', '.doc', '.docx'];
    
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!validTypes.includes(file.type) && !hasValidExtension) {
      toast.error('Please upload a PDF, DOC, or DOCX file.');
      return false;
    }
    
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      processUpload(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      processUpload(file);
    }
    // Reset value so same file can be uploaded again if needed
    e.target.value = null;
  };

  const processUpload = (file) => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      toast.success('Resume selected successfully.');
      onUploadSuccess();
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div 
        className={`bg-white rounded-2xl border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'} p-10 text-center transition-all duration-200 relative`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="resume-upload" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <FiUploadCloud className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {isUploading ? 'Uploading...' : 'Upload your resume'}
          </h3>
          
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            Upload your resume to analyze your skills, experience, and job fit with CareerLens.
          </p>
          
          <button 
            type="button"
            className="bg-white border border-slate-200 text-slate-700 font-medium px-6 py-2.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors z-10 pointer-events-auto cursor-pointer"
            onClick={() => document.getElementById('resume-upload').click()}
            disabled={isUploading}
          >
            {isUploading ? 'Processing...' : 'Browse files'}
          </button>
          
          <p className="text-slate-400 text-xs mt-4">
            PDF, DOC, DOCX • Max 5MB
          </p>
        </div>
      </div>
      
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <FiFileText className="text-slate-500" />
          Why upload your resume?
        </h4>
        <ul className="text-sm text-slate-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            Get a personalized resume analysis
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            Discover skill and keyword gaps
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            Compare your resume with target roles
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            Prepare for personalized mock interviews
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeUploadCard;
