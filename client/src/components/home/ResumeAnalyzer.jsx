import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiX, FiPieChart, FiTarget, FiMessageSquare, FiShield } from 'react-icons/fi';

const ResumeAnalyzer = () => {
  const features = [
    {
      icon: <FiPieChart className="w-5 h-5 text-[var(--primary)]" />,
      bg: 'bg-blue-50',
      title: 'Match Score',
      desc: 'See how closely your resume aligns with the target role.'
    },
    {
      icon: <FiTarget className="w-5 h-5 text-[var(--success)]" />,
      bg: 'bg-emerald-50',
      title: 'Skill & Keyword Gaps',
      desc: 'Identify important skills and keywords that are missing or underrepresented.'
    },
    {
      icon: <FiMessageSquare className="w-5 h-5 text-[var(--ai)]" />,
      bg: 'bg-purple-50',
      title: 'Actionable Feedback',
      desc: 'Get specific suggestions instead of generic resume advice.'
    },
    {
      icon: <FiShield className="w-5 h-5 text-[var(--warning)]" />,
      bg: 'bg-orange-50',
      title: 'Resume Strengths',
      desc: 'Understand what already makes your application competitive.'
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-[var(--border)]">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Content & Features */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
              Don't Guess If Your Resume Fits. Know.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed">
              CareerLens compares your resume with the job you're targeting to show how well your experience matches what employers are looking for.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feat, index) => (
                <div key={index} className="bg-[var(--background)] p-5 rounded-[var(--radius-md)] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${feat.bg}`}>
                    {feat.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-2">{feat.title}</h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>

            <Link to="/dashboard/resume" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-3.5 rounded-[var(--radius-md)] font-medium hover:bg-[var(--primary-hover)] transition-all shadow-[var(--shadow-md)]">
              Analyze Your Resume <FiArrowRight className="ml-1" />
            </Link>
          </div>

          {/* Right Column: Dashboard Preview */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] shadow-xl shadow-[var(--primary)]/5 p-6 md:p-8">
              
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--border)]">
                <h3 className="font-bold text-[var(--text-primary)] text-lg">Frontend Developer</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--success-light)] text-[var(--success)]">
                  82% Match
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Match Breakdown */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-5">Match Breakdown</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-[var(--text-primary)]">Skills Match</span>
                        <span className="font-semibold text-[var(--text-primary)]">85%</span>
                      </div>
                      <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                        <div className="bg-[var(--primary)] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-[var(--text-primary)]">Keyword Match</span>
                        <span className="font-semibold text-[var(--text-primary)]">79%</span>
                      </div>
                      <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                        <div className="bg-[var(--primary)] h-1.5 rounded-full" style={{ width: '79%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-[var(--text-primary)]">Experience Match</span>
                        <span className="font-semibold text-[var(--text-primary)]">80%</span>
                      </div>
                      <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                        <div className="bg-[var(--primary)] h-1.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-[var(--text-primary)]">Education Match</span>
                        <span className="font-semibold text-[var(--text-primary)]">85%</span>
                      </div>
                      <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                        <div className="bg-[var(--primary)] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths & Gaps */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Top Strengths</h4>
                    <ul className="space-y-2">
                      {['React', 'JavaScript', 'HTML/CSS', 'Git & GitHub'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <FiCheck className="text-[var(--success)] shrink-0 w-4 h-4" />
                          <span className="text-[var(--text-primary)] font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Top Gaps</h4>
                    <ul className="space-y-2">
                      {['TypeScript', 'Next.js', 'Testing', 'CI/CD'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <FiX className="text-[var(--danger)] shrink-0 w-4 h-4" />
                          <span className="text-[var(--text-primary)] font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResumeAnalyzer;
