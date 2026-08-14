import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import HistoryEmptyState from '../components/dashboard/history/HistoryEmptyState';
import HistorySkeleton from '../components/dashboard/history/HistorySkeleton';
import HistorySummary from '../components/dashboard/history/HistorySummary';
import HistoryFilters from '../components/dashboard/history/HistoryFilters';
import HistoryList from '../components/dashboard/history/HistoryList';
import api from '../api/axios';

const ITEMS_PER_PAGE = 5;

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activityType, setActivityType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  
  // Pagination state
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/history?limit=100'); // Fetch a batch for client-side filtering
        if (res.data.success && res.data.data.activities) {
          setHistoryData(res.data.data.activities);
        }
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const hasHistoryData = historyData.length > 0;

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
  const filteredActivities = historyData.filter(activity => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchRole = activity.targetRole?.toLowerCase().includes(query);
      const matchType = activity.title?.toLowerCase().includes(query);
      const matchResume = activity.resumeName?.toLowerCase().includes(query);
      if (!matchRole && !matchType && !matchResume) return false;
    }

    // Type filter
    if (activityType !== 'all' && activity.type !== activityType) {
      return false;
    }

    // Date filter
    if (dateRange !== 'all') {
      const now = Date.now();
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

  const stats = {
    total: historyData.length,
    analyses: historyData.filter(a => a.type === 'resume-analysis').length,
    interviews: historyData.filter(a => a.type === 'mock-interview').length,
    latestMatch: historyData.find(a => a.type === 'resume-analysis')?.score || 0
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
