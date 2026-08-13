import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import HistoryEmptyState from '../components/dashboard/history/HistoryEmptyState';
import HistorySkeleton from '../components/dashboard/history/HistorySkeleton';
import HistorySummary from '../components/dashboard/history/HistorySummary';
import HistoryFilters from '../components/dashboard/history/HistoryFilters';
import HistoryList from '../components/dashboard/history/HistoryList';

// --- MOCK DATA ---
const MOCK_HISTORY = [
  {
    id: "history-1",
    type: "resume-analysis",
    title: "Resume Analysis",
    targetRole: "Backend Engineer",
    resumeName: "Om_Dwivedi_Resume.pdf",
    score: 82,
    scoreLabel: "Strong Match",
    date: "Aug 12, 2026",
    time: "10:30 AM",
    timestamp: new Date('2026-08-12T10:30:00').getTime()
  },
  {
    id: "history-2",
    type: "mock-interview",
    title: "Mock Interview",
    targetRole: "Backend Engineer",
    interviewType: "Technical + Behavioral",
    score: 81,
    scoreLabel: "Great Progress",
    date: "Aug 11, 2026",
    time: "4:15 PM",
    timestamp: new Date('2026-08-11T16:15:00').getTime()
  },
  {
    id: "history-3",
    type: "resume-analysis",
    title: "Resume Analysis",
    targetRole: "Full Stack Developer",
    resumeName: "Om_Dwivedi_Resume_v2.pdf",
    score: 76,
    scoreLabel: "Good Match",
    date: "Aug 10, 2026",
    time: "2:20 PM",
    timestamp: new Date('2026-08-10T14:20:00').getTime()
  },
  {
    id: "history-4",
    type: "mock-interview",
    title: "Mock Interview",
    targetRole: "Frontend Developer",
    interviewType: "Technical Interview",
    score: 74,
    scoreLabel: "Needs Improvement",
    date: "Aug 08, 2026",
    time: "11:40 AM",
    timestamp: new Date('2026-08-08T11:40:00').getTime()
  },
  {
    id: "history-5",
    type: "resume-analysis",
    title: "Resume Analysis",
    targetRole: "Frontend Developer",
    resumeName: "Frontend_Resume_Om.pdf",
    score: 68,
    scoreLabel: "Needs Improvement",
    date: "Aug 05, 2026",
    time: "9:15 AM",
    timestamp: new Date('2026-08-05T09:15:00').getTime()
  },
  {
    id: "history-6",
    type: "mock-interview",
    title: "Mock Interview",
    targetRole: "Systems Engineer",
    interviewType: "System Design",
    score: 55,
    scoreLabel: "Needs Practice",
    date: "Jul 28, 2026",
    time: "3:00 PM",
    timestamp: new Date('2026-07-28T15:00:00').getTime()
  },
  {
    id: "history-7",
    type: "resume-analysis",
    title: "Resume Analysis",
    targetRole: "Systems Engineer",
    resumeName: "Systems_Resume.pdf",
    score: 45,
    scoreLabel: "Low Match",
    date: "Jul 25, 2026",
    time: "1:45 PM",
    timestamp: new Date('2026-07-25T13:45:00').getTime()
  }
];

const ITEMS_PER_PAGE = 5;

const History = () => {
  // Setup state
  const [isLoading, setIsLoading] = useState(true);
  const [hasHistoryData] = useState(true); // Toggle to test empty state
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activityType, setActivityType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  
  // Pagination state
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClearFilters = () => {
    setSearchQuery('');
    setActivityType('all');
    setDateRange('all');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  // Filter logic
  const filteredActivities = MOCK_HISTORY.filter(activity => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchRole = activity.targetRole?.toLowerCase().includes(query);
      const matchType = activity.title.toLowerCase().includes(query);
      const matchResume = activity.resumeName?.toLowerCase().includes(query);
      if (!matchRole && !matchType && !matchResume) return false;
    }

    // Type filter
    if (activityType !== 'all' && activity.type !== activityType) {
      return false;
    }

    // Date filter (Mock logic for 'week' and 'month' relative to Aug 13, 2026)
    if (dateRange !== 'all') {
      const now = new Date('2026-08-13T00:00:00').getTime();
      const ONE_DAY = 24 * 60 * 60 * 1000;
      
      if (dateRange === 'week' && (now - activity.timestamp) > 7 * ONE_DAY) {
        return false;
      }
      if (dateRange === 'month' && (now - activity.timestamp) > 30 * ONE_DAY) {
        return false;
      }
    }

    return true;
  });

  const visibleActivities = filteredActivities.slice(0, visibleCount);
  const hasMore = visibleActivities.length < filteredActivities.length;

  // Calculate stats based on total mock data (could also be filtered stats depending on requirements, usually global)
  const stats = {
    total: MOCK_HISTORY.length,
    analyses: MOCK_HISTORY.filter(a => a.type === 'resume-analysis').length,
    interviews: MOCK_HISTORY.filter(a => a.type === 'mock-interview').length,
    latestMatch: MOCK_HISTORY.find(a => a.type === 'resume-analysis')?.score || 0
  };

  const renderContent = () => {
    if (isLoading) {
      return <HistorySkeleton />;
    }

    if (!hasHistoryData) {
      return <HistoryEmptyState />;
    }

    return (
      <>
        <HistorySummary stats={stats} />
        
        <HistoryFilters 
          search={searchQuery}
          onSearchChange={(val) => { setSearchQuery(val); setVisibleCount(ITEMS_PER_PAGE); }}
          activityType={activityType}
          onActivityTypeChange={(val) => { setActivityType(val); setVisibleCount(ITEMS_PER_PAGE); }}
          dateRange={dateRange}
          onDateRangeChange={(val) => { setDateRange(val); setVisibleCount(ITEMS_PER_PAGE); }}
        />
        
        <HistoryList 
          activities={visibleActivities}
          onClear={handleClearFilters}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto w-full pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">History</h1>
            <p className="text-slate-600 mt-1 text-sm">
              Review your resume analyses, mock interviews, and career progress over time.
            </p>
          </div>
          {hasHistoryData && !isLoading && (
            <div className="shrink-0">
              <select 
                value={activityType}
                onChange={(e) => { setActivityType(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white shadow-sm cursor-pointer"
              >
                <option value="all">All Activity</option>
                <option value="resume-analysis">Resume Analysis</option>
                <option value="mock-interview">Mock Interview</option>
              </select>
            </div>
          )}
        </div>
        
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default History;
