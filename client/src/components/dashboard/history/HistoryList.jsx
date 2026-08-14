import React from 'react';
import HistoryItem from './HistoryItem';
import HistoryNoResults from './HistoryNoResults';

const HistoryList = ({ activities, onClear, onLoadMore, hasMore }) => {
  if (activities.length === 0) {
    return <HistoryNoResults onClear={onClear} />;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8 mt-6">
      <div className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <HistoryItem key={activity.id} activity={activity} />
        ))}
      </div>
      
      {hasMore && (
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center">
          <button 
            onClick={onLoadMore}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
