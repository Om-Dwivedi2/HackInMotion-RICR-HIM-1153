import React from 'react';
import { FiMic, FiUser, FiCheck, FiAlertTriangle, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MockInterview = () => {
  return (
    <section className="py-24 bg-white border-t border-[var(--border)]">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
          Practice Before the Real Interview
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto">
          Turn your resume and target role into a personalized AI mock interview.
        </p>

        <div className="flex flex-col lg:flex-row gap-6 text-left">
          
          {/* AI Interviewer */}
          <div className="w-full lg:w-1/3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-[var(--ai-light)] text-[var(--ai)] flex items-center justify-center">
                <FiMic className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider text-[var(--text-secondary)]">AI Interviewer</span>
            </div>
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-md)] p-5 text-[var(--text-primary)] text-sm leading-relaxed mb-6">
              <p className="mb-4">"Your resume mentions that you built a REST API using Node.js.</p>
              <p>How did you handle authentication and authorization in that project?"</p>
            </div>
            <div className="flex justify-center items-center gap-1 opacity-50 h-8">
              <div className="w-1 h-3 bg-[var(--ai)] rounded-full animate-pulse"></div>
              <div className="w-1 h-5 bg-[var(--ai)] rounded-full animate-pulse delay-75"></div>
              <div className="w-1 h-8 bg-[var(--ai)] rounded-full animate-pulse delay-150"></div>
              <div className="w-1 h-4 bg-[var(--ai)] rounded-full animate-pulse delay-75"></div>
              <div className="w-1 h-2 bg-[var(--ai)] rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Your Answer */}
          <div className="w-full lg:w-1/3 bg-[var(--surface)] border border-[var(--primary)]/30 rounded-[var(--radius-lg)] p-6 shadow-xl shadow-[var(--primary)]/5 transform lg:-translate-y-4 relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                <FiUser className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider text-[var(--text-secondary)]">Your Answer</span>
            </div>
            <div className="bg-[var(--primary-light)]/50 border border-[var(--primary)]/10 rounded-[var(--radius-md)] p-5 text-[var(--text-primary)] text-sm leading-relaxed mb-6 font-medium">
              <p>I implemented JWT for authentication and used role-based access control (RBAC) for authorization. Users are assigned roles and permissions, and every request is verified using tokens before granting access.</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--primary)] font-medium text-sm flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--primary)]"></span>
                </span>
                02:45
              </span>
              <Link to="/dashboard/interview" className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold px-4 py-2.5 rounded-md flex items-center gap-2 transition-colors">
                <FiPlay className="w-3.5 h-3.5 fill-current" /> Start Mock Interview
              </Link>
            </div>
          </div>

          {/* AI Feedback */}
          <div className="w-full lg:w-1/3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-[var(--ai-light)] text-[var(--ai)] flex items-center justify-center">
                <span className="font-bold text-lg leading-none">✨</span>
              </div>
              <span className="font-bold text-xs uppercase tracking-wider text-[var(--text-secondary)]">AI Feedback</span>
            </div>
            
            <div className="space-y-5 mb-8">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[var(--text-secondary)]">Relevance</span>
                  <span className="text-[var(--success)] font-bold">92%</span>
                </div>
                <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                  <div className="bg-[var(--success)] h-1.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[var(--text-secondary)]">Clarity</span>
                  <span className="text-[var(--primary)] font-bold">84%</span>
                </div>
                <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                  <div className="bg-[var(--primary)] h-1.5 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[var(--text-secondary)]">Completeness</span>
                  <span className="text-[var(--warning)] font-bold">76%</span>
                </div>
                <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                  <div className="bg-[var(--warning)] h-1.5 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-xs">
                <FiCheck className="text-[var(--success)] shrink-0 w-4 h-4 mt-0.5" />
                <span className="text-[var(--text-primary)] font-semibold">Strong technical understanding</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs">
                <FiAlertTriangle className="text-[var(--warning)] shrink-0 w-4 h-4 mt-0.5" />
                <span className="text-[var(--text-primary)] font-medium">Explain your security decisions</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs">
                <FiAlertTriangle className="text-[var(--warning)] shrink-0 w-4 h-4 mt-0.5" />
                <span className="text-[var(--text-primary)] font-medium">Give a concrete example</span>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default MockInterview;
