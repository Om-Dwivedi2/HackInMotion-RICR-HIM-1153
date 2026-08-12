import React from 'react';
import { FiCheck, FiAlertTriangle, FiX } from 'react-icons/fi';

const SkillGap = () => {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
          Know What's Holding You Back
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto">
          Turn a job description into a personalized skill roadmap.
        </p>

        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] shadow-xl shadow-[var(--primary)]/5 p-6 md:p-10 mb-8 max-w-4xl mx-auto text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[var(--border)] gap-4">
            <div>
              <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Your Target Role</p>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Full Stack Developer</h3>
            </div>
            <div className="flex flex-col items-start md:items-end w-full md:w-64">
              <div className="flex justify-between w-full text-sm mb-1.5">
                <span className="font-medium text-[var(--text-secondary)]">Skill Match</span>
                <span className="font-bold text-[var(--primary)] text-lg">82%</span>
              </div>
              <div className="w-full bg-[var(--border)] rounded-full h-2">
                <div className="bg-[var(--primary)] h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strong Skills */}
            <div className="bg-[var(--success-light)] border border-[var(--success)]/20 rounded-[var(--radius-md)] p-6 shadow-sm">
              <h4 className="text-xs font-bold text-[var(--success)] uppercase tracking-wider mb-5">Strong Skills</h4>
              <ul className="space-y-3.5">
                {['JavaScript', 'React', 'MongoDB', 'Git', 'HTML/CSS'].map((skill, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm">
                    <FiCheck className="text-[var(--success)] shrink-0 w-4 h-4" />
                    <span className="font-medium text-[var(--text-primary)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Needs Improvement */}
            <div className="bg-[var(--warning-light)] border border-[var(--warning)]/20 rounded-[var(--radius-md)] p-6 shadow-sm">
              <h4 className="text-xs font-bold text-[var(--warning)] uppercase tracking-wider mb-5">Needs Improvement</h4>
              <ul className="space-y-3.5">
                {['Node.js', 'REST APIs', 'Express.js'].map((skill, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm">
                    <FiAlertTriangle className="text-[var(--warning)] shrink-0 w-4 h-4" />
                    <span className="font-medium text-[var(--text-primary)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing */}
            <div className="bg-[var(--danger-light)] border border-[var(--danger)]/20 rounded-[var(--radius-md)] p-6 shadow-sm">
              <h4 className="text-xs font-bold text-[var(--danger)] uppercase tracking-wider mb-5">Missing</h4>
              <ul className="space-y-3.5">
                {['Docker', 'AWS', 'Testing', 'TypeScript'].map((skill, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm">
                    <FiX className="text-[var(--danger)] shrink-0 w-4 h-4" />
                    <span className="font-medium text-[var(--text-primary)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-sm md:text-base text-[var(--text-secondary)] font-medium max-w-xl mx-auto">
          CareerLens doesn't just tell you that you're missing something. <br className="hidden md:block"/>
          <span className="text-[var(--text-primary)]">It helps you understand what to work on next.</span>
        </p>
      </div>
    </section>
  );
};

export default SkillGap;
