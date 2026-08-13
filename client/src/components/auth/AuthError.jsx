import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const AuthError = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-[var(--danger-light)] border border-[var(--danger)]/20 rounded-[var(--radius-sm)] p-4 flex items-start gap-3 mb-6">
      <FiAlertCircle className="text-[var(--danger)] w-5 h-5 shrink-0" />
      <p className="text-sm font-medium text-[var(--danger)] pt-0.5">{message}</p>
    </div>
  );
};

export default AuthError;