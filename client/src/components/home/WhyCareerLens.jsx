import React from 'react';
import { FiX, FiCheck, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WhyCareerLens = () => {
  return (
    <section id="about-us" className="py-24 bg-white">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center tracking-tight">
          More Than a Resume Checker
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Comparison */}
          <div className="w-full lg:w-3/5 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 md:p-10 flex flex-col md:flex-row gap-8 lg:gap-12 shadow-sm">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><FiX className="w-4 h-4"/></div>
                <h3 className="font-bold text-[var(--text-primary)]">Traditional Approach</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><FiX className="text-red-400 shrink-0 w-4 h-4"/> Generic resume feedback</li>
                <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><FiX className="text-red-400 shrink-0 w-4 h-4"/> Guess your skill gaps</li>
                <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><FiX className="text-red-400 shrink-0 w-4 h-4"/> Practice random questions</li>
                <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><FiX className="text-red-400 shrink-0 w-4 h-4"/> One-time evaluation</li>
              </ul>
            </div>
            
            <div className="hidden md:block w-px bg-[var(--border)]"></div>
            
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded-full bg-[var(--success-light)] text-[var(--success)] flex items-center justify-center"><FiCheck className="w-4 h-4"/></div>
                <h3 className="font-bold text-[var(--text-primary)]">CareerLens</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-medium text-[var(--text-primary)]"><FiCheck className="text-[var(--success)] shrink-0 w-4 h-4"/> Job-specific feedback</li>
                <li className="flex items-center gap-3 text-sm font-medium text-[var(--text-primary)]"><FiCheck className="text-[var(--success)] shrink-0 w-4 h-4"/> Identify actual gaps</li>
                <li className="flex items-center gap-3 text-sm font-medium text-[var(--text-primary)]"><FiCheck className="text-[var(--success)] shrink-0 w-4 h-4"/> Practice role-specific questions</li>
                <li className="flex items-center gap-3 text-sm font-medium text-[var(--text-primary)]"><FiCheck className="text-[var(--success)] shrink-0 w-4 h-4"/> Track progress over time</li>
              </ul>
            </div>
          </div>
          
          {/* Right Banner */}
          <div className="w-full lg:w-2/5 bg-[var(--primary-light)] border border-[var(--primary)]/10 rounded-[var(--radius-lg)] p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold text-[var(--text-primary)] mb-4 leading-snug">CareerLens is your AI career coach &mdash; available 24/7.</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed font-medium">
                Get honest feedback, actionable insights, and personalized practice to help you land the role you want.
              </p>
              <Link to="/dashboard/resume" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-[var(--radius-sm)] font-medium hover:bg-[var(--primary-hover)] transition-all shadow-md text-sm">
                Start Your Journey
              </Link>
            </div>
            
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--primary)] rounded-full filter blur-3xl opacity-10 translate-x-1/3 -translate-y-1/3"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyCareerLens;
