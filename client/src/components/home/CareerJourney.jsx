import React from 'react';
import { FiUploadCloud, FiSearch, FiEdit3, FiMic, FiAward } from 'react-icons/fi';

const CareerJourney = () => {
  const steps = [
    {
      id: '01',
      title: 'Upload',
      desc: 'Upload your resume and let CareerLens understand your experience, skills, projects, and education.',
      icon: <FiUploadCloud className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50'
    },
    {
      id: '02',
      title: 'Analyze',
      desc: 'Compare your resume with your target job description to identify strengths, missing skills, and weak keywords.',
      icon: <FiSearch className="w-6 h-6 text-emerald-500" />,
      bg: 'bg-emerald-50'
    },
    {
      id: '03',
      title: 'Improve',
      desc: 'Get specific, actionable suggestions to make your resume stronger and more relevant.',
      icon: <FiEdit3 className="w-6 h-6 text-purple-500" />,
      bg: 'bg-purple-50'
    },
    {
      id: '04',
      title: 'Practice',
      desc: 'Take a personalized mock interview and receive AI-powered feedback on your answers.',
      icon: <FiMic className="w-6 h-6 text-orange-500" />,
      bg: 'bg-orange-50'
    },
    {
      id: '05',
      title: 'Get Ready',
      desc: 'Build confidence and get ready to ace your next interview.',
      icon: <FiAward className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50'
    }
  ];

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
          From Resume to Interview-Ready
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-16">
          A smarter way to prepare for the job you actually want.
        </p>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start relative gap-8 lg:gap-6">
          {/* Decorative connector line for desktop */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] -z-10 border-t-2 border-dashed border-slate-200"></div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center w-full max-w-xs lg:w-1/5 relative group">
              
              <div className={`w-20 h-20 rounded-full shadow-sm flex items-center justify-center mb-6 border border-white group-hover:-translate-y-1 transition-transform duration-300 ${step.bg}`}>
                {step.icon}
              </div>
              
              <div className="text-[var(--text-muted)] font-bold mb-1 text-sm">{step.id}</div>
              <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-3">{step.title}</h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed px-2 lg:px-0">
                {step.desc}
              </p>

              {/* Mobile connector */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden w-[2px] h-8 mt-4 border-l-2 border-dashed border-slate-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerJourney;
