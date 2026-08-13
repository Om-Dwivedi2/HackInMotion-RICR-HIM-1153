import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ResumeHeader from '../components/dashboard/resume/ResumeHeader';
import ResumeUploadCard from '../components/dashboard/resume/ResumeUploadCard';
import ResumeOverview from '../components/dashboard/resume/ResumeOverview';
import ResumePreview from '../components/dashboard/resume/ResumePreview';
import ResumeDetails from '../components/dashboard/resume/ResumeDetails';
import ReplaceResumeModal from '../components/dashboard/resume/ReplaceResumeModal';

const mockResume = {
  fileName: "Om_Dwivedi_Resume.pdf",
  fileType: "PDF",
  fileSize: "1.8 MB",
  uploadedAt: "Aug 12, 2026",
  lastAnalyzed: "Aug 12, 2026",
  status: "Ready for Analysis",
  targetRole: "Backend Engineer"
};

const mockDetails = {
  name: "Om Dwivedi",
  targetRole: "Backend Engineer",
  experience: "Entry Level",
  education: "B.Tech Computer Science",
  skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express.js"],
  projects: 3
};

const Resume = () => {
  // Toggle this for testing empty vs uploaded state
  const [hasResume, setHasResume] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    setHasResume(true);
  };

  const handleAnalyze = () => {
    // Navigate to the analysis page as requested
    navigate('/dashboard/analysis');
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto w-full">
        <ResumeHeader 
          hasResume={hasResume} 
          onAnalyze={handleAnalyze}
          onReplace={() => setIsReplaceModalOpen(true)}
        />
        
        {!hasResume ? (
          <div className="py-8">
            <ResumeUploadCard onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <div className="flex flex-col gap-6 pb-12">
            <ResumeOverview 
              resume={mockResume} 
              onView={() => console.log('View full screen resume')}
              onReplace={() => setIsReplaceModalOpen(true)}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ResumePreview />
              </div>
              <div className="lg:col-span-1">
                <ResumeDetails details={mockDetails} />
              </div>
            </div>
          </div>
        )}
      </div>

      <ReplaceResumeModal 
        isOpen={isReplaceModalOpen}
        onClose={() => setIsReplaceModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </DashboardLayout>
  );
};

export default Resume;
