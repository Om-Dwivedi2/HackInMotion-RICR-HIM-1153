import React from 'react';

const AuthInput = ({ label, id, type = 'text', placeholder, value, onChange, error, icon }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-bold text-[var(--text-primary)] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-[var(--radius-sm)] border ${
            error 
              ? 'border-[var(--danger)] focus:ring-[var(--danger-light)] focus:border-[var(--danger)]' 
              : 'border-[var(--border)] focus:ring-[var(--primary-light)] focus:border-[var(--primary)]'
          } bg-[var(--surface)] ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors focus:outline-none focus:ring-2`}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-[var(--danger)] font-medium">{error}</p>
      )}
    </div>
  );
};

export default AuthInput;