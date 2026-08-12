import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiSearch, FiUser, FiTrendingUp } from 'react-icons/fi';

const FinalCTA = () => {
  return (
    <section className="py-24 bg-[var(--background)] relative overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-xl shadow-[var(--primary)]/5 overflow-hidden relative">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
            <div className="w-14 h-14 bg-[var(--primary-light)] text-[var(--primary)] rounded-xl flex items-center justify-center mb-8 mx-auto lg:mx-0 shadow-sm">
              <FiSearch className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
              Ready for Your Next Opportunity?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Upload your resume, choose your target role, and find out what it takes to become interview ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/dashboard" className="inline-flex justify-center items-center gap-2 bg-[var(--primary)] text-white px-8 py-3.5 rounded-[var(--radius-md)] font-medium hover:bg-[var(--primary-hover)] transition-all shadow-[var(--shadow-md)]">
                Start Your Career Analysis <FiArrowRight />
              </Link>
              <Link to="/about" className="inline-flex justify-center items-center gap-2 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] px-8 py-3.5 rounded-[var(--radius-md)] font-medium hover:bg-[var(--background)] transition-all shadow-[var(--shadow-sm)]">
                Explore CareerLens
              </Link>
            </div>
          </div>

          {/* Right Graphic Mockup */}
          <div className="hidden lg:block w-full lg:w-1/2 relative h-80 z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 relative z-20">
                <div className="flex gap-4 mb-8 items-center">
                  <div className="w-16 h-16 bg-[var(--surface)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text-muted)]">
                    <FiUser className="w-6 h-6" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-[var(--surface)] border border-[var(--border)] rounded-full w-3/4"></div>
                    <div className="h-4 bg-[var(--surface)] border border-[var(--border)] rounded-full w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-3 bg-[var(--surface)] border border-[var(--border)] rounded-full w-full"></div>
                  <div className="h-3 bg-[var(--surface)] border border-[var(--border)] rounded-full w-full"></div>
                  <div className="h-3 bg-[var(--surface)] border border-[var(--border)] rounded-full w-4/5"></div>
                </div>
              </div>
              
              {/* Floating element */}
              <div className="absolute -bottom-4 -left-8 bg-white border border-[var(--border)] p-4 rounded-[var(--radius-md)] shadow-lg z-30 transform -rotate-6">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--success)]">
                  <FiTrendingUp className="w-4 h-4" /> 82% Match
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[var(--primary-light)] to-transparent opacity-60 pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[var(--ai-light)] rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
