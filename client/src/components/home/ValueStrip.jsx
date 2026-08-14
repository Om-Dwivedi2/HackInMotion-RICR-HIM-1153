import React from 'react';
import { FiFileText, FiTarget, FiMic, FiTrendingUp } from 'react-icons/fi';

const ValueStrip = () => {
  const values = [
    {
      icon: <FiFileText className="w-5 h-5 text-blue-500" />,
      title: 'Resume Analysis',
      desc: 'Know exactly how your resume performs against a real job description.',
      bg: 'bg-blue-50'
    },
    {
      icon: <FiTarget className="w-5 h-5 text-emerald-500" />,
      title: 'Skill Gap Insights',
      desc: 'Discover the skills and keywords you need to strengthen.',
      bg: 'bg-emerald-50'
    },
    {
      icon: <FiMic className="w-5 h-5 text-purple-500" />,
      title: 'AI Mock Interviews',
      desc: 'Practice role-specific questions based on your resume and target job.',
      bg: 'bg-purple-50'
    },
    {
      icon: <FiTrendingUp className="w-5 h-5 text-orange-500" />,
      title: 'Progress Tracking',
      desc: 'See how your preparation improves over time.',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <section id="features" className="py-12 bg-white border-y border-[var(--border)] relative z-10">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1.5">{item.title}</h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueStrip;
