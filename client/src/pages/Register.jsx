import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiShield, FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AuthLayout from '../components/auth/AuthLayout';
import AuthInput from '../components/auth/AuthInput';
import PasswordInput from '../components/auth/PasswordInput';
import AuthButton from '../components/auth/AuthButton';
import AuthError from '../components/auth/AuthError';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();

  // 1. User Input Phase
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation state
  const [touched, setTouched] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password requirements
  const passwordReqs = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
  ];

  const isPasswordValid = passwordReqs.every(r => r.met);

  // Validation Phase (Dynamic)
  const getErrors = () => {
    const errors = {};

    if (touched.name && !name.trim()) {
      errors.name = 'Please enter your full name.';
    }

    if (touched.email) {
      if (!email.trim()) {
        errors.email = 'Please enter your email.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    if (touched.confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  };

  const errors = getErrors();

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const { register: registerUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    // Mark all as touched for submission validation
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // 2. Validation Phase (BEFORE API CALL)
    let hasError = false;

    if (!name.trim() || !email.trim() || !/\S+@\S+\.\S+/.test(email) || !isPasswordValid || password !== confirmPassword) {
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      // 4. API Call Phase
      const success = await registerUser(name.trim(), email.trim(), password);

      if (success) {
        // Since backend already logs them in (JWT cookie), we can navigate to dashboard directly
        // Or if backend requires login separately, we navigate to /login.
        // In Phase 3, register sets JWT cookie.
        navigate('/dashboard');
      }
    } catch (error) {
      // 6. API Error Handling
      setGlobalError(error.message || 'Unable to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2 tracking-tight text-center sm:text-left">Create your account</h2>
        <p className="text-[var(--text-secondary)] mb-8 text-center sm:text-left">Start preparing for your next opportunity with CareerLens</p>

        <AuthError message={globalError} />

        <form onSubmit={handleSubmit} noValidate>
          <AuthInput
            label="Full Name"
            id="name"
            placeholder="Your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (touched.name) setTouched(prev => ({ ...prev, name: false }));
            }}
            onBlur={() => handleBlur('name')}
            error={errors.name}
            icon={<FiUser className="w-4 h-4" />}
          />

          <AuthInput
            label="Email address"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) setTouched(prev => ({ ...prev, email: false }));
            }}
            onBlur={() => handleBlur('email')}
            error={errors.email}
            icon={<FiMail className="w-4 h-4" />}
          />

          <div className="mb-4">
            <PasswordInput
              label="Password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) setTouched(prev => ({ ...prev, password: false }));
              }}
              onBlur={() => handleBlur('password')}
              icon={<FiLock className="w-4 h-4" />}
            />

            {/* Password Requirements UI */}
            {(touched.password || password.length > 0) && (
              <div className="mt-2 p-4 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-sm)]">
                <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2.5">Password must contain:</p>
                <ul className="space-y-2">
                  {passwordReqs.map((req, index) => (
                    <li key={index} className="flex items-center gap-2.5 text-xs">
                      {req.met ? (
                        <FiCheck className="text-[var(--success)] w-4 h-4 shrink-0" />
                      ) : (
                        <FiX className="text-[var(--text-muted)] w-4 h-4 shrink-0 opacity-50" />
                      )}
                      <span className={req.met ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-secondary)]"}>
                        {req.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <PasswordInput
            label="Confirm Password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (touched.confirmPassword) setTouched(prev => ({ ...prev, confirmPassword: false }));
            }}
            onBlur={() => handleBlur('confirmPassword')}
            error={errors.confirmPassword}
            icon={<FiShield className="w-4 h-4" />}
          />

          <AuthButton isLoading={isLoading} loadingText="Creating account..." className="mt-8">
            Create Account
          </AuthButton>
        </form>

        <div className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;