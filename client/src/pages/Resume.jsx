import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ResumeHeader from '../components/dashboard/resume/ResumeHeader';
import ResumeUploadCard from '../components/dashboard/resume/ResumeUploadCard';
import ResumeOverview from '../components/dashboard/resume/ResumeOverview';
import ResumePreview from '../components/dashboard/resume/ResumePreview';
import ReplaceResumeModal from '../components/dashboard/resume/ReplaceResumeModal';
import CareerTargetForm from '../components/dashboard/resume/CareerTargetForm';

const Resume = () => {
  const [hasResume, setHasResume] = useState(false);
  const [activeResume, setActiveResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const [activeTarget, setActiveTarget] = useState(null);

  const fetchActiveTarget = async () => {
    try {
      const response = await api.get('/targets/active');
      if (response.data.success && response.data.data) {
        setActiveTarget(response.data.data);
      }
    } catch (error) {
      console.log('No active target found');
    }
  };

  const fetchActiveResume = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/resumes/active');
      if (response.data.success && response.data.data) {
        setHasResume(true);
        const rd = response.data.data;
        setActiveResume({
          fileName: rd.file.originalName,
          fileType: rd.file.fileType.includes('pdf') ? 'PDF' : 'DOC',
          fileSize: (rd.file.fileSize / 1024 / 1024).toFixed(2) + ' MB',
          uploadedAt: new Date(rd.uploadedAt).toLocaleDateString(),
          lastAnalyzed: rd.parsedData ? new Date(rd.updatedAt).toLocaleDateString() : 'Not analyzed yet',
          status: rd.parsedData ? "Analyzed" : "Ready for Analysis",
          fileUrl: rd.file.fileUrl,
          parsedData: rd.parsedData
        });
      }
    } catch (error) {
      setHasResume(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveResume();
    fetchActiveTarget();
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadSuccess = () => {
    fetchActiveResume();
  };

  const handleAnalyze = async () => {
    if (!activeResume) {
      toast.error('Please upload a resume first');
      return;
    }
    if (!activeTarget) {
      toast.error('Please save your career target first');
      return;
    }

    setIsProcessing(true);
    let readyForAnalysis = false;

    try {
      let resumeSuccess = false;
      let targetSuccess = false;

      if (!activeResume.parsedData) {
        toast.loading('Understanding your resume...', { id: 'ai-process' });
        const resResponse = await api.post('/resumes/structure');
        if (resResponse.data.success) resumeSuccess = true;
      } else {
        resumeSuccess = true;
      }

      if (!activeTarget.jobDescription?.extractedRequirements) {
        toast.loading('Extracting job requirements...', { id: 'ai-process' });
        const tgtResponse = await api.post('/targets/structure');
        if (tgtResponse.data.success) targetSuccess = true;
      } else {
        targetSuccess = true;
      }

      if (resumeSuccess && targetSuccess) {
        readyForAnalysis = true;
        await fetchActiveResume();
        await fetchActiveTarget();
      } else {
        toast.error('Some AI data prep failed. Please retry.', { id: 'ai-process' });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to prepare data with AI', { id: 'ai-process' });
    } 

    if (readyForAnalysis) {
      toast.loading('Running AI Analysis...', { id: 'ai-process' });
      try {
        const analysisResponse = await api.post('/analysis/analyze');
        if (analysisResponse.data.success) {
          toast.success('Analysis complete!', { id: 'ai-process' });
          navigate('/dashboard/analysis');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to analyze', { id: 'ai-process' });
      } finally {
        setIsProcessing(false);
      }
    } else {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto w-full">
        <ResumeHeader 
          hasResume={hasResume} 
          onAnalyze={handleAnalyze}
          onReplace={() => setIsReplaceModalOpen(true)}
          isProcessing={isProcessing}
        />
        
        {!hasResume ? (
          <div className="py-8">
            <ResumeUploadCard onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <div className="flex flex-col gap-6 pb-12">
            <ResumeOverview 
              resume={activeResume} 
              onView={() => console.log('View full screen resume')}
              onReplace={() => setIsReplaceModalOpen(true)}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ResumePreview fileUrl={activeResume?.fileUrl} />
              </div>
              <div className="lg:col-span-1 flex flex-col gap-6">
                <CareerTargetForm 
                  initialTarget={activeTarget} 
                  onSave={(newTarget) => setActiveTarget(newTarget)} 
                />

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
