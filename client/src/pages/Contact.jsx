import React from 'react';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import FAQSection from '../components/contact/FAQSection';

const Contact = () => {
  return (
    <div className="w-full bg-[var(--background)] min-h-screen">
      {/* Contact Hero */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center bg-white border-b border-[var(--border)]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
            We're Here to Help
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-medium">
            Have a question, feedback, or an idea to make CareerLens better? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[var(--container-width)] mx-auto relative z-10 -mt-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          <div className="w-full lg:w-1/3">
            <ContactInfo />
          </div>
          <div className="w-full lg:w-2/3">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24 border-t border-[var(--border)] bg-white pt-8 mt-12">
        <FAQSection />
      </section>
    </div>
  );
};

export default Contact;