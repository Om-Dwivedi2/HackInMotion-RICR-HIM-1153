import React from 'react';

const ProgressSection = () => {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
          See Yourself Getting Better
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto">
          Every analysis and interview gives you a clearer picture of your progress.
        </p>

        <div className="flex flex-col lg:flex-row gap-12 items-center bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-8 lg:p-12 shadow-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full lg:w-1/2">
            <div>
              <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Resume Match</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-[var(--text-primary)]">72% <span className="text-[var(--text-secondary)] font-normal text-xl mx-1">&rarr;</span> 82%</span>
              </div>
              <div className="text-[10px] font-bold text-[var(--success)] bg-[var(--success-light)] inline-block px-2.5 py-1 rounded-full">+10% improvement</div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Interview Score</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-[var(--text-primary)]">68% <span className="text-[var(--text-secondary)] font-normal text-xl mx-1">&rarr;</span> 81%</span>
              </div>
              <div className="text-[10px] font-bold text-[var(--success)] bg-[var(--success-light)] inline-block px-2.5 py-1 rounded-full">+13% improvement</div>
            </div>
            <div className="pt-6 border-t border-[var(--border)]">
              <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Skills Improved</p>
              <div className="text-4xl font-bold text-[var(--primary)] mb-1">4</div>
              <div className="text-xs font-medium text-[var(--text-secondary)]">This Month</div>
            </div>
            <div className="pt-6 border-t border-[var(--border)]">
              <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Interviews Completed</p>
              <div className="text-4xl font-bold text-[var(--primary)] mb-1">6</div>
              <div className="text-xs font-medium text-[var(--text-secondary)]">Total Sessions</div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 border-t lg:border-t-0 lg:border-l border-[var(--border)] pt-8 lg:pt-0 lg:pl-12">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-8 text-left">Career Readiness Over Time</h3>
            <div className="relative h-56 w-full">
              {/* CSS Line Chart visualization */}
              <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[var(--text-muted)] font-medium pb-6">
                <div className="flex justify-between w-full items-center"><span className="w-8 text-left pr-2">100%</span><div className="h-px bg-[var(--border)] w-full border-dashed"></div></div>
                <div className="flex justify-between w-full items-center"><span className="w-8 text-left pr-2">80%</span><div className="h-px bg-[var(--border)] w-full border-dashed"></div></div>
                <div className="flex justify-between w-full items-center"><span className="w-8 text-left pr-2">60%</span><div className="h-px bg-[var(--border)] w-full border-dashed"></div></div>
              </div>
              
              <div className="absolute inset-0 pl-8 pt-4 pb-6">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                  <polyline 
                    points="0,80 100,60 200,30 300,0" 
                    fill="none" 
                    stroke="var(--primary)" 
                    strokeWidth="3" 
                    vectorEffect="non-scaling-stroke" 
                  />
                  <circle cx="0" cy="80" r="4.5" fill="white" stroke="var(--primary)" strokeWidth="2.5" />
                  <circle cx="100" cy="60" r="4.5" fill="white" stroke="var(--primary)" strokeWidth="2.5" />
                  <circle cx="200" cy="30" r="4.5" fill="white" stroke="var(--primary)" strokeWidth="2.5" />
                  <circle cx="300" cy="0" r="4.5" fill="white" stroke="var(--primary)" strokeWidth="2.5" />
                  
                  {/* Labels above dots */}
                  <text x="0" y="65" fontSize="12" fill="var(--text-primary)" fontWeight="bold" textAnchor="middle">64%</text>
                  <text x="100" y="45" fontSize="12" fill="var(--text-primary)" fontWeight="bold" textAnchor="middle">71%</text>
                  <text x="200" y="15" fontSize="12" fill="var(--text-primary)" fontWeight="bold" textAnchor="middle">79%</text>
                  <text x="300" y="-15" fontSize="12" fill="var(--text-primary)" fontWeight="bold" textAnchor="middle">88%</text>
                </svg>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full pl-8 flex justify-between text-[10px] font-semibold text-[var(--text-muted)]">
                <span className="transform -translate-x-1/2">Attempt 1</span>
                <span className="transform -translate-x-1/2">Attempt 2</span>
                <span className="transform -translate-x-1/2">Attempt 3</span>
                <span className="transform -translate-x-1/2">Attempt 4</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
