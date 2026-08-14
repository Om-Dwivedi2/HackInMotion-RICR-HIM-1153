import React, { useState, useEffect } from 'react';
import WelcomeSection from './WelcomeSection';
import TargetRoleCard from './TargetRoleCard';
import StatCard from './StatCard';
import ProgressChart from './ProgressChart';
import RecommendedStep from './RecommendedStep';
import RecentActivity from './RecentActivity';
import SkillGaps from './SkillGaps';
import EmptyOverview from './EmptyOverview';
import api from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';

import { FiTrendingUp, FiMic, FiAlertTriangle, FiTarget } from 'react-icons/fi';

const ExistingUserOverview = ({ user, activeResume, activeTarget, latestAnalysis, history }) => {
  // Compute Stats
  const resumeScore = latestAnalysis ? latestAnalysis.matchScore.score : null;
  const interviewScores = history.filter(h => h.type === 'mock-interview').map(h => h.score);
  const avgInterviewScore = interviewScores.length > 0 
    ? Math.round(interviewScores.reduce((a, b) => a + b, 0) / interviewScores.length)
    : null;
  const missingSkills = latestAnalysis?.skillAnalysis?.missing || [];
  
  const strongSkills = latestAnalysis?.skillAnalysis?.matched?.map(s => s.skill) || [];
  const targetRole = activeTarget?.role || "your target role";

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
        <WelcomeSection userName={user?.name || "User"} />

        <TargetRoleCard
          role={activeTarget?.role || "Not set"}
          company={activeTarget?.company || ""}
          resumeName={activeResume?.file?.originalName || "Active Resume"}
          lastAnalyzed={latestAnalysis ? new Date(latestAnalysis.createdAt).toLocaleDateString() : "Not analyzed yet"}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Resume Match"
          value={resumeScore !== null ? `${resumeScore}%` : "--"}
          subtitle={resumeScore !== null ? "ATS Score" : "Awaiting Analysis"}
          icon={FiTrendingUp}
          colorClass={resumeScore >= 75 ? "text-green-600" : resumeScore >= 50 ? "text-orange-500" : "text-blue-600"}
          highlightClass="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Interview Avg"
          value={avgInterviewScore !== null ? `${avgInterviewScore}%` : "--"}
          subtitle={avgInterviewScore !== null ? "Average Score" : "Not Started"}
          icon={FiMic}
          colorClass={avgInterviewScore >= 75 ? "text-green-600" : avgInterviewScore >= 50 ? "text-orange-500" : "text-purple-600"}
          highlightClass="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Skill Gaps"
          value={latestAnalysis ? missingSkills.length.toString() : "--"}
          subtitle={latestAnalysis ? "Identified missing skills" : "Awaiting Analysis"}
          icon={FiAlertTriangle}
          colorClass={missingSkills.length > 3 ? "text-red-500" : "text-orange-500"}
          highlightClass="bg-red-50 text-red-600"
        />
        <StatCard
          title="Interviews Completed"
          value={interviewScores.length.toString()}
          subtitle="Total Sessions"
          icon={FiTarget}
          colorClass="text-indigo-600"
          highlightClass="bg-indigo-50 text-indigo-600"
        />
      </div>

      {/* Charts & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart data={history} />
        </div>
        <div className="lg:col-span-1">
          <RecommendedStep 
            strongSkills={strongSkills}
            targetSkills={missingSkills}
            targetRole={targetRole}
          />
        </div>
      </div>

      {/* Activity & Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={history} />
        <SkillGaps gaps={missingSkills} />
      </div>
    </div>
  );
};

const Overview = () => {
  const { user } = useAuth();
  const [activeResume, setActiveResume] = useState(null);
  const [activeTarget, setActiveTarget] = useState(null);
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resumeRes, targetRes, analysisRes, historyRes] = await Promise.allSettled([
          api.get('/resumes/active'),
          api.get('/targets/active'),
          api.get('/analysis/latest'),
          api.get('/history?limit=10')
        ]);

        if (resumeRes.status === 'fulfilled' && resumeRes.value.data.success) {
          setActiveResume(resumeRes.value.data.data);
        }
        if (targetRes.status === 'fulfilled' && targetRes.value.data.success) {
          setActiveTarget(targetRes.value.data.data);
        }
        if (analysisRes.status === 'fulfilled' && analysisRes.value.data.success) {
          setLatestAnalysis(analysisRes.value.data.data.analysis);
        }
        if (historyRes.status === 'fulfilled' && historyRes.value.data.success) {
          setHistory(historyRes.value.data.data.activities);
        }
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  // If no resume, show empty state
  if (!activeResume) {
    return <EmptyOverview />;
  }

  return (
    <ExistingUserOverview 
      user={user}
      activeResume={activeResume} 
      activeTarget={activeTarget}
      latestAnalysis={latestAnalysis}
      history={history}
    />
  );
};

export default Overview;
