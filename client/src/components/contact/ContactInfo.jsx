import React from 'react';
import { FiMail, FiClock } from 'react-icons/fi';

const ContactInfo = () => {
  return (
    <div className="bg-[var(--primary-light)] border border-[var(--primary)]/10 rounded-[var(--radius-lg)] p-8 lg:p-12 h-full flex flex-col relative overflow-hidden shadow-sm">
      <div className="relative z-10 flex-1">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-10">Get in Touch</h3>
        
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-white text-[var(--primary)] flex items-center justify-center shadow-sm">
                <FiMail className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[var(--text-primary)]">Email</h4>
            </div>
            <a href="mailto:support@careerlens.com" className="text-[var(--primary)] font-semibold hover:text-[var(--primary-hover)] transition-colors ml-13">
              support@careerlens.com
            </a>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-white text-[var(--primary)] flex items-center justify-center shadow-sm">
                <FiClock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[var(--text-primary)]">Response Time</h4>
            </div>
            <p className="text-[var(--text-secondary)] font-medium ml-13">
              We typically respond within 24&ndash;48 hours.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative background */}
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
    </div>
  );
};

export default ContactInfo;