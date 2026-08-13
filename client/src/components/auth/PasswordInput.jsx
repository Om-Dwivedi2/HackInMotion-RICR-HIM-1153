import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = ({ label, id, placeholder, value, onChange, error, icon }) => {
  const [showPassword, setShowPassword] = useState(false);

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
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-[var(--radius-sm)] border ${
            error 
              ? 'border-[var(--danger)] focus:ring-[var(--danger-light)] focus:border-[var(--danger)]' 
              : 'border-[var(--border)] focus:ring-[var(--primary-light)] focus:border-[var(--primary)]'
          } bg-[var(--surface)] ${icon ? 'pl-11' : 'pl-4'} pr-12 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors focus:outline-none focus:ring-2`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus:outline-none"
          tabIndex="-1"
        >
          {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-[var(--danger)] font-medium">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;