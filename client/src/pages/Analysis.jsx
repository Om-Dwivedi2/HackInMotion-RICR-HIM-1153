import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const mockAnalysis = {
  overallMatch: 82,
  targetRole: "Backend Engineer",
  resumeName: "Om_Dwivedi_Resume.pdf",
  lastAnalyzed: "Aug 12, 2026",

  breakdown: {
    skills: 85,
    keywords: 79,
    experience: 80,
    education: 85
  },

  strongSkills: [
    "React",
    "JavaScript",
    "HTML/CSS",
    "Git",
    "GitHub"
  ],

  needsImprovement: [
    "Node.js",
    "REST APIs",
    "Express.js"
  ],

  missingSkills: [
    "Docker",
    "AWS",
    "TypeScript"
  ],

  matchedKeywords: [
    "JavaScript",
    "React",
    "Node.js",
    "REST APIs"
  ],

  missingKeywords: [
    "Docker",
    "AWS",
    "CI/CD",
    "TypeScript"
  ],

  strengths: [
    "Strong JavaScript experience",
    "Relevant React projects",
    "Good Git/GitHub usage",
    "Relevant project experience"
  ],

  gaps: [
    "Docker not mentioned",
    "AWS experience missing",
    "CI/CD exposure is limited",
    "TypeScript not represented"
  ]
};

const Analysis = () => {
  // Toggle this to see empty state vs analyzed state
  const [hasAnalysis, setHasAnalysis] = useState(true);
  
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto w-full pb-12">
        
        <AnalysisHeader 
          analysis={hasAnalysis ? mockAnalysis : null}
          onReanalyze={() => console.log('Reanalyzing...')}
          onViewResume={() => navigate('/dashboard/resume')}
        />
        
        {!hasAnalysis ? (
          <AnalysisEmptyState hasResume={true} />
        ) : (
          <div className="flex flex-col gap-6">
            <AnalysisSummary 
              score={mockAnalysis.overallMatch} 
              targetRole={mockAnalysis.targetRole} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">
              <div className="lg:col-span-1 h-full">
                <MatchBreakdown breakdown={mockAnalysis.breakdown} />
              </div>
              <div className="lg:col-span-1 h-full">
                <SkillsAnalysis 
                  strongSkills={mockAnalysis.strongSkills}
                  needsImprovement={mockAnalysis.needsImprovement}
                  missingSkills={mockAnalysis.missingSkills}
                />
              </div>
              <div className="lg:col-span-1 h-full">
                <KeywordAnalysis 
                  matchedKeywords={mockAnalysis.matchedKeywords}
                  missingKeywords={mockAnalysis.missingKeywords}
                />
              </div>
            </div>
            
            <StrengthsGaps 
              strengths={mockAnalysis.strengths} 
              gaps={mockAnalysis.gaps} 
            />
            
            <Recommendations />
            
            <AnalysisInsightCard />
            
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
