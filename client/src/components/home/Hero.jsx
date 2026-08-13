import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden relative">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--ai-light)] text-[var(--ai)] font-medium text-sm mb-6 border border-[var(--ai)]/20 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ai)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ai)]"></span>
              </span>
              AI-Powered Career Readiness
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6 tracking-tight">
              Your Resume Gets You Noticed. <br className="hidden sm:block" />
              <span className="text-[var(--primary)]">Your Skills Get You Hired.</span>
            </h1>

            <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed max-w-xl">
              Analyze your resume against your target job, discover skill gaps, improve your application, and practice with an AI-powered mock interview &mdash; all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/dashboard" className="inline-flex justify-center items-center gap-2 bg-[var(--primary)] text-white px-8 py-3.5 rounded-[var(--radius-md)] font-medium hover:bg-[var(--primary-hover)] transition-all shadow-[var(--shadow-md)]">
                Analyze My Resume
              </Link>
              <Link to="/dashboard" className="inline-flex justify-center items-center gap-2 bg-white text-[var(--text-primary)] border border-[var(--border)] px-8 py-3.5 rounded-[var(--radius-md)] font-medium hover:bg-[var(--background)] transition-all shadow-[var(--shadow-sm)]">
                Try Mock Interview
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--text-muted)] font-medium">
              <span className="flex items-center gap-1"><FiCheck className="text-[var(--primary)]" /> Upload your resume</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="flex items-center gap-1"><FiCheck className="text-[var(--primary)]" /> Add a job description</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="flex items-center gap-1"><FiCheck className="text-[var(--primary)]" /> Get personalized insights</span>
            </div>
          </div>

          {/* Right Content - Dashboard Preview Mockup */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-[var(--radius-lg)] bg-white border border-[var(--border)] shadow-2xl shadow-[var(--primary)]/10 overflow-hidden transform transition-transform hover:-translate-y-1 duration-500">
              <div className="bg-[var(--background)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
                <span className="font-semibold text-[var(--text-primary)] text-sm">Career Readiness</span>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-[var(--border)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">Overall Match</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-[var(--success)]">82%</span>
                    </div>
                  </div>
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--success-light)" strokeWidth="12" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--success)" strokeWidth="12" strokeDasharray="251" strokeDashoffset="45" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-[var(--success)]">82</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--success-light)] text-[var(--success)] flex items-center justify-center"><FiCheck className="w-3.5 h-3.5" /></div>
                      <span className="font-medium text-[var(--text-primary)]">React</span>
                    </div>
                    <span className="text-[var(--success)] font-medium">Strong</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--success-light)] text-[var(--success)] flex items-center justify-center"><FiCheck className="w-3.5 h-3.5" /></div>
                      <span className="font-medium text-[var(--text-primary)]">JavaScript</span>
                    </div>
                    <span className="text-[var(--success)] font-medium">Strong</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--success-light)] text-[var(--success)] flex items-center justify-center"><FiCheck className="w-3.5 h-3.5" /></div>
                      <span className="font-medium text-[var(--text-primary)]">MongoDB</span>
                    </div>
                    <span className="text-[var(--success)] font-medium">Strong</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--warning-light)] text-[var(--warning)] flex items-center justify-center"><FiAlertTriangle className="w-3.5 h-3.5" /></div>
                      <span className="font-medium text-[var(--text-primary)]">Node.js</span>
                    </div>
                    <span className="text-[var(--warning)] font-medium">Needs Improvement</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--danger-light)] text-[var(--danger)] flex items-center justify-center"><FiX className="w-3.5 h-3.5" /></div>
                      <span className="font-medium text-[var(--text-primary)]">Docker</span>
                    </div>
                    <span className="text-[var(--danger)] font-medium">Missing</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--danger-light)] text-[var(--danger)] flex items-center justify-center"><FiX className="w-3.5 h-3.5" /></div>
                      <span className="font-medium text-[var(--text-primary)]">AWS</span>
                    </div>
                    <span className="text-[var(--danger)] font-medium">Missing</span>
                  </div>
                </div>

                <div className="bg-[var(--primary-light)] border border-[var(--primary)]/10 rounded-[var(--radius-md)] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider mb-1">Recommended Next Step</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Practice role-specific questions</p>
                  </div>
                  <Link to="/dashboard" className="shrink-0 bg-[var(--primary)] text-white font-medium text-xs px-4 py-2 rounded-md hover:bg-[var(--primary-hover)] transition-all flex items-center gap-1.5 shadow-sm">
                    Start Mock Interview <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--primary-light)] to-transparent opacity-50 -z-10 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--ai-light)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
