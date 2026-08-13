import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiShield } from 'react-icons/fi';
import AuthLayout from '../components/auth/AuthLayout';
import AuthInput from '../components/auth/AuthInput';
import PasswordInput from '../components/auth/PasswordInput';
import AuthButton from '../components/auth/AuthButton';
import AuthError from '../components/auth/AuthError';

const Login = () => {
  const navigate = useNavigate();

  // 1. User Input Phase
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. Validation Phase
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Please enter your password.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    // 2. Validation Phase (BEFORE API CALL)
    if (!validate()) return;

    // 3. Payload Creation Phase
    const payload = {
      email: email.trim(),
      password: password
    };

    setIsLoading(true);

    try {
      // 4. API Call Phase (PLACEHOLDER REQUIRED)
      // TODO: Call login API here
      // const response = await authService.login(payload);

      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate failure on a specific dummy email for testing
      if (payload.email === 'error@example.com') {
        throw new Error('Invalid credentials');
      }

      // 5. Success Flow
      // Store auth state (e.g. localStorage, context)
      localStorage.setItem('token', 'dummy-token');

      navigate('/dashboard');
    } catch (error) {
      // 6. Failure Flow
      setGlobalError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2 tracking-tight text-center sm:text-left">Welcome back!</h2>
        <p className="text-[var(--text-secondary)] mb-8 text-center sm:text-left">Sign in to continue to CareerLens</p>

        <AuthError message={globalError} />

        <form onSubmit={handleSubmit} noValidate>
          <AuthInput
            label="Email address"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            icon={<FiMail className="w-4 h-4" />}
          />

          <PasswordInput
            label="Password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            icon={<FiLock className="w-4 h-4" />}
          />

          <div className="flex items-center justify-between mb-8 mt-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-2 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--text-secondary)] cursor-pointer">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <AuthButton isLoading={isLoading} loadingText="Signing in...">
            Sign In
          </AuthButton>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[var(--border)]"></div>
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-[var(--text-muted)]">or</span>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors">
            Create an account
          </Link>
        </div>

        <div className="mt-12 flex items-start sm:items-center justify-center gap-3 text-xs text-[var(--text-muted)] font-medium">
          <FiShield className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5 sm:mt-0" />
          <span className="text-left sm:text-center">
            Your data is safe with us.<br className="hidden sm:block" />
            We never share your information with anyone.
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;