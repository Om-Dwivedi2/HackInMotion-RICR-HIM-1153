import React from 'react';

const AIRecommendation = ({
  title = "AI Recommendation",
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`p-5 rounded-xl border border-purple-200 bg-purple-50/50 flex gap-4 ${className}`}>
      <div className="text-purple-600 mt-1">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-purple-900 flex items-center gap-2">
          {title}
        </h4>
        <p className="mt-1.5 text-sm text-purple-800 leading-relaxed">
          {description}
        </p>
        {action && (
          <div className="mt-4">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendation;
