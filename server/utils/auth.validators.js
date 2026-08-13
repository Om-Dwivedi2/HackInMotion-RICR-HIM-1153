import { ApiError } from './apiError.js';

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, 'Name is required');
  }

  if (!email || !email.trim()) {
    throw new ApiError(400, 'Email is required');
  }
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Please enter a valid email address');
  }

  if (!password) {
    throw new ApiError(400, 'Password is required');
  }

  // Password must satisfy requirements: At least 8 characters, One uppercase letter, One lowercase letter, One number
  if (password.length < 8) {
    throw new ApiError(400, 'Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    throw new ApiError(400, 'Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    throw new ApiError(400, 'Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    throw new ApiError(400, 'Password must contain at least one number');
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    throw new ApiError(400, 'Email is required');
  }

  if (!password) {
    throw new ApiError(400, 'Password is required');
  }

  next();
};
