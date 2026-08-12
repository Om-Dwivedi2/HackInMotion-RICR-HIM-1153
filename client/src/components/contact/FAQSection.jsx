import React, { useState } from 'react';
import FAQItem from './FAQitem';

const faqs = [
  {
    question: "What can CareerLens analyze?",
    answer: "CareerLens analyzes your resume against a target job description and highlights strengths, missing skills, weak keywords, and areas for improvement."
  },
  {
    question: "Can I practice interviews?",
    answer: "Yes. CareerLens generates role-specific mock interview questions based on your resume and target role."
  },
  {
    question: "Is my resume private?",
    answer: "Your resume and career analysis are associated with your account and are not publicly accessible."
  },
  {
    question: "Can I use CareerLens on mobile?",
    answer: "Yes. CareerLens is designed to work across desktop and mobile devices."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 text-center tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-8 shadow-sm">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;