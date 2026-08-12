import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex bg-[var(--surface)] fixed inset-0 z-50">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 bg-[var(--primary-light)] flex-col justify-between p-12 relative overflow-hidden border-r border-[var(--border)]">
        <div className="relative z-10">
          <Link to="/" className="inline-block mb-16 hover:opacity-80 transition-opacity">
            <img src={logo} alt="CareerLens Logo" className="h-14 w-auto object-contain" />
          </Link>
          <h1 className="text-4xl xl:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight tracking-tight">
            Prepare smarter.<br />
            <span className="text-[var(--primary)]">Get hired with confidence.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-md leading-relaxed font-medium">
            Analyze your resume, discover your gaps, and practice interviews tailored to your career goals.
          </p>
        </div>
        
        {/* Dashboard preview decoration based on reference image */}
        <div className="relative z-10 flex-grow mt-12 flex items-end justify-center">
          <div className="w-full max-w-lg bg-white rounded-t-xl border-t border-l border-r border-[var(--border)] shadow-2xl p-8 transform translate-y-8 opacity-95">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-6">
              <span className="font-semibold text-sm text-[var(--text-primary)]">Career Readiness Overview</span>
              <span className="text-xs font-medium text-[var(--text-muted)]">This Week ▾</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--success)" strokeWidth="10" strokeDasharray="251" strokeDashoffset="45" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[var(--text-primary)] leading-none mb-1">82%</span>
                  <span className="text-[8px] font-bold text-[var(--text-secondary)] uppercase">Overall Match</span>
                </div>
              </div>
              <div className="flex-1 w-full space-y-4">
                <h4 className="text-[10px] font-bold uppercase text-[var(--text-secondary)] mb-2">Skills Overview</h4>
                <div className="flex justify-between text-xs font-medium items-center">
                  <span className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> <span className="text-[var(--text-primary)]">React</span></span> 
                  <span className="text-[var(--success)]">Strong</span>
                </div>
                <div className="flex justify-between text-xs font-medium items-center">
                  <span className="flex items-center gap-2"><span className="text-[var(--success)]">✓</span> <span className="text-[var(--text-primary)]">JavaScript</span></span> 
                  <span className="text-[var(--success)]">Strong</span>
                </div>
                <div className="flex justify-between text-xs font-medium items-center">
                  <span className="flex items-center gap-2 text-[var(--warning)]">⚠ <span className="text-[var(--text-primary)]">Node.js</span></span> 
                  <span className="text-[var(--warning)]">Needs Improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 flex justify-center">
            <Link to="/">
              <img src={logo} alt="CareerLens Logo" className="h-12 w-auto object-contain" />
            </Link>
          </div>
          
          {children}
          
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;