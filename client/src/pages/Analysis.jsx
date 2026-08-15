import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import AnalysisHeader from '../components/dashboard/analysis/AnalysisHeader';
import AnalysisSummary from '../components/dashboard/analysis/AnalysisSummary';
import MatchBreakdown from '../components/dashboard/analysis/MatchBreakdown';
import SkillsAnalysis from '../components/dashboard/analysis/SkillsAnalysis';
import KeywordAnalysis from '../components/dashboard/analysis/KeywordAnalysis';
import StrengthsGaps from '../components/dashboard/analysis/StrengthsGaps';
import Recommendations from '../components/dashboard/analysis/Recommendations';
import AnalysisInsightCard from '../components/dashboard/analysis/AnalysisInsightCard';
import AnalysisEmptyState from '../components/dashboard/analysis/AnalysisEmptyState';

const Analysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchLatestAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/analysis/latest');
      if (response.data.success && response.data.data.analysis) {
        setAnalysisData(response.data.data.analysis);
      } else {
        setAnalysisData(null);
      }
    } catch (err) {
      console.error('Error fetching latest analysis:', err);
      setError('Failed to load analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestAnalysis();
  }, []);

  const handleReanalyze = async () => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading('Running resume match analysis...');
    try {
      const response = await api.post('/analysis/analyze');
      if (response.data.success && response.data.data.analysis) {
        setAnalysisData(response.data.data.analysis);
        toast.success('Analysis updated successfully!', { id: toastId });
      }
    } catch (err) {
      console.error('Error running analysis:', err);
      const errorMsg = err.response?.data?.message || 'Failed to run analysis. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const formattedData = analysisData ? {
    overallMatch: analysisData.matchScore?.score || 0,
    targetRole: analysisData.careerTargetId?.role || "Unknown Role",
    resumeName: analysisData.resumeId?.file?.originalName || "Resume",
    lastAnalyzed: new Date(analysisData.createdAt).toLocaleDateString(),

    breakdown: {
      skills: analysisData.matchScore?.breakdown?.skills || analysisData.matchScore?.score || 0,
      keywords: analysisData.matchScore?.breakdown?.keywords || analysisData.matchScore?.score || 0,
      experience: analysisData.matchScore?.breakdown?.experience || analysisData.matchScore?.score || 0,
      education: analysisData.matchScore?.breakdown?.education || analysisData.matchScore?.score || 0
    },

    strongSkills: analysisData.skillAnalysis?.matched?.map(s => s.skill) || [],
    needsImprovement: analysisData.skillAnalysis?.weak?.map(s => s.skill) || [],
    missingSkills: analysisData.skillAnalysis?.missing?.map(s => s.skill) || [],
    
    matchedKeywords: analysisData.keywordAnalysis?.matched || [],
    missingKeywords: analysisData.keywordAnalysis?.missing || [],

    strengths: analysisData.strengths || [],
    gaps: analysisData.skillAnalysis?.missing?.map(s => `${s.skill} is missing`) || [],
    
    recommendations: analysisData.recommendations || []
  } : null;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto w-full pb-12">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <AnalysisHeader 
          analysis={formattedData}
          onReanalyze={handleReanalyze}
          onViewResume={() => navigate('/dashboard/resume')}
          isLoading={isLoading}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-slate-600">Processing Analysis...</span>
          </div>
        ) : !formattedData ? (
          <AnalysisEmptyState hasResume={true} onAnalyze={handleReanalyze} />
        ) : (
          <div className="flex flex-col gap-6">
            <AnalysisSummary 
              score={formattedData.overallMatch} 
              targetRole={formattedData.targetRole} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">
              <div className="lg:col-span-1 h-full">
                <MatchBreakdown breakdown={formattedData.breakdown} />
              </div>
              <div className="lg:col-span-1 h-full">
                <SkillsAnalysis 
                  strongSkills={formattedData.strongSkills}
                  needsImprovement={formattedData.needsImprovement}
                  missingSkills={formattedData.missingSkills}
                />
              </div>
              <div className="lg:col-span-1 h-full">
                <KeywordAnalysis 
                  matchedKeywords={formattedData.matchedKeywords}
                  missingKeywords={formattedData.missingKeywords}
                />
              </div>
            </div>
            
            <StrengthsGaps 
              strengths={formattedData.strengths} 
              gaps={formattedData.gaps} 
            />
            
            <Recommendations recommendations={formattedData.recommendations} />
            
            <AnalysisInsightCard />
            
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
