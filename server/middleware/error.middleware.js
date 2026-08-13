import { ApiError } from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Handle Mongoose duplicate key error
  if (error.code === 11000) {
    const message = 'Duplicate field value entered';
    // If it is an email duplicate
    if (error.keyValue && error.keyValue.email) {
      error = new ApiError(409, 'Email already registered.');
    } else {
      error = new ApiError(400, message);
    }
  }

  // Handle Mongoose validation error
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((val) => val.message).join(', ');
    error = new ApiError(400, message);
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again.';
    error = new ApiError(401, message);
  }

  if (error.name === 'TokenExpiredError') {
    const message = 'Your token has expired. Please log in again.';
    error = new ApiError(401, message);
  }

  // Default to 500 if it's not our ApiError
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  const response = {
    success: false,
    message: statusCode === 500 ? 'Internal Server Error' : message, // Ensure safe messages for 500
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
    if (statusCode === 500) {
       response.message = message; // Dev mode can see full error message
    }
  }

  res.status(statusCode).json(response);
};

export { errorHandler };
