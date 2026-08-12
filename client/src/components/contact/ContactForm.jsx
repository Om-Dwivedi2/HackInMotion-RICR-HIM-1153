import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AuthInput from '../auth/AuthInput';
import AuthButton from '../auth/AuthButton';
import AuthError from '../auth/AuthError';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [touched, setTouched] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Validation
  const getErrors = () => {
    const errors = {};
    
    if (touched.name && !name.trim()) {
      errors.name = 'Please enter your name.';
    }
    
    if (touched.email) {
      if (!email.trim()) {
        errors.email = 'Please enter your email.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Please enter a valid email address.';
      }
    }
    
    if (touched.subject && !subject.trim()) {
      errors.subject = 'Please enter a subject.';
    }
    
    if (touched.message) {
      if (!message.trim()) {
        errors.message = 'Please enter your message.';
      } else if (message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters.';
      }
    }
    
    return errors;
  };
  
  const errors = getErrors();

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    
    // Mark all touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });
    
    const isInvalid = 
      !name.trim() || 
      !email.trim() || 
      !/\S+@\S+\.\S+/.test(email) || 
      !subject.trim() || 
      !message.trim() || 
      message.trim().length < 10;
      
    if (isInvalid) return;
    
    // Payload Creation
    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    };
    
    setIsLoading(true);
    
    try {
      // 4. API Call Phase (PLACEHOLDER REQUIRED)
      // TODO: Connect contact form API here
      // const response = await contactService.sendMessage(payload);
      
      // Simulating network delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // We stop at the API integration boundary as requested.
      // Do not falsely show a successful submission after clicking the button since no API exists.
      toast('API Integration Pending', { icon: 'ℹ️' });
      
    } catch (err) {
      setGlobalError(err.message || 'Unable to send your message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 sm:p-8 lg:p-12 shadow-sm h-full">
      <AuthError message={globalError} />
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <AuthInput
            label="Full Name"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (touched.name) setTouched(prev => ({...prev, name: false}));
            }}
            onBlur={() => handleBlur('name')}
            error={errors.name}
          />
          
          <AuthInput
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) setTouched(prev => ({...prev, email: false}));
            }}
            onBlur={() => handleBlur('email')}
            error={errors.email}
          />
        </div>
        
        <AuthInput
          label="Subject"
          id="subject"
          placeholder="How can we help?"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            if (touched.subject) setTouched(prev => ({...prev, subject: false}));
          }}
          onBlur={() => handleBlur('subject')}
          error={errors.subject}
        />
        
        <div className="mb-8">
          <label htmlFor="message" className="block text-sm font-bold text-[var(--text-primary)] mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="Tell us what's on your mind..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (touched.message) setTouched(prev => ({...prev, message: false}));
            }}
            onBlur={() => handleBlur('message')}
            className={`block w-full rounded-[var(--radius-sm)] border ${
              errors.message
                ? 'border-[var(--danger)] focus:ring-[var(--danger-light)] focus:border-[var(--danger)]' 
                : 'border-[var(--border)] focus:ring-[var(--primary-light)] focus:border-[var(--primary)]'
            } bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors focus:outline-none focus:ring-2 resize-none`}
          ></textarea>
          {errors.message && (
            <p className="mt-1.5 text-xs text-[var(--danger)] font-medium">{errors.message}</p>
          )}
        </div>
        
        <AuthButton isLoading={isLoading} loadingText="Sending...">
          Send Message
        </AuthButton>
      </form>
    </div>
  );
};

export default ContactForm;