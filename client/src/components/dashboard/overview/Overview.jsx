import React from 'react';
import WelcomeSection from './WelcomeSection';
import TargetRoleCard from './TargetRoleCard';
import StatCard from './StatCard';
import ProgressChart from './ProgressChart';
import RecommendedStep from './RecommendedStep';
import RecentActivity from './RecentActivity';
import SkillGaps from './SkillGaps';
import EmptyOverview from './EmptyOverview';


import { FiTrendingUp, FiMic, FiAlertTriangle, FiTarget } from 'react-icons/fi';

const ExistingUserOverview = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
        <WelcomeSection userName="Om" />

        <TargetRoleCard
          role="Backend Engineer"
          resumeName="Om_Dwivedi_Resume.pdf"
          lastAnalyzed="Aug 12, 2026"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Resume Match"
          value="82%"
          subtitle="Strong Match"
          icon={FiTrendingUp}
          colorClass="text-green-600"
          highlightClass="bg-green-50 text-green-600"
        />
        <StatCard
          title="Interview Score"
          value="81/100"
          subtitle="Great Progress"
          icon={FiMic}
          colorClass="text-purple-600"
          highlightClass="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Skill Gaps"
          value="4"
          subtitle="Skills to Improve"
          icon={FiAlertTriangle}
          colorClass="text-orange-500"
          highlightClass="bg-orange-50 text-orange-500"
        />
        <StatCard
          title="Interviews Completed"
          value="6"
          subtitle="Total Sessions"
          icon={FiTarget}
          colorClass="text-blue-600"
          highlightClass="bg-blue-50 text-blue-600"
        />
      </div>

      {/* Charts & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart />
        </div>
        <div className="lg:col-span-1">
          <RecommendedStep />
        </div>
      </div>

      {/* Activity & Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <SkillGaps />
      </div>
    </div>
  );
};

const Overview = () => {
  // Toggle this mock state to see either the empty state or the full dashboard
  const hasAnalysis = true;

  if (!hasAnalysis) {
    return <EmptyOverview />;
  }

  return <ExistingUserOverview />;
};

export default Overview;
