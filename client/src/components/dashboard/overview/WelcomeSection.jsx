import React from 'react';

const WelcomeSection = ({ userName = 'Om' }) => {
  return (
    <div className="flex-1 min-w-[300px]">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">
        Welcome back, {userName}! 👋
      </h2>
      <p className="text-slate-600 text-lg">
        Here's your career readiness snapshot.
      </p>
    </div>
  );
};

export default WelcomeSection;
