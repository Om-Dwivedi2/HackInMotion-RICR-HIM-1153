import React from 'react';

const ScoreRing = ({
  score = 0,
  size = 'md',
  className = '',
}) => {
  const normalizedScore = Math.min(100, Math.max(0, score));
  
  const sizes = {
    sm: { circle: 60, stroke: 4, text: 'text-lg', subtext: 'text-[10px]' },
    md: { circle: 100, stroke: 6, text: 'text-3xl', subtext: 'text-xs' },
    lg: { circle: 140, stroke: 8, text: 'text-4xl', subtext: 'text-sm' },
  };
  
  const { circle, stroke, text, subtext } = sizes[size];
  const radius = (circle - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={circle}
        height={circle}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={circle / 2}
          cy={circle / 2}
          r={radius}
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          className="text-slate-100"
        />
        {/* Progress ring */}
        <circle
          cx={circle / 2}
          cy={circle / 2}
          r={radius}
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          strokeLinecap="round"
          className="text-blue-600 transition-all duration-1000 ease-out"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`font-bold text-slate-900 leading-none ${text}`}>
          {normalizedScore}
        </span>
        <span className={`font-medium text-slate-500 mt-1 ${subtext}`}>
          /100
        </span>
      </div>
    </div>
  );
};

export default ScoreRing;
