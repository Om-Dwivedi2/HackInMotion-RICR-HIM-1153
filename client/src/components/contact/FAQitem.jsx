import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[var(--border)] last:border-0">
      <button
        type="button"
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-[var(--radius-sm)]"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-base font-bold text-[var(--text-primary)] pr-8">{question}</span>
        <FiChevronDown 
          className={`w-5 h-5 text-[var(--text-muted)] transform transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-[var(--text-secondary)] font-medium leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;