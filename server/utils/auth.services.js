import { User } from '../model/user.model.js';
import { ApiError } from './apiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const registerUserService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    throw new ApiError(409, 'Email already registered.');
  }

  // Hash password in the service layer
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const createdUser = await User.findById(user._id).select('-password');
  
  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  const token = generateAccessToken(user._id);

  return { user: createdUser, token };
};

export const loginUserService = async ({ email, password }) => {
  // Explicitly select password for comparison
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  // Check password in the service layer
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const token = generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select('-password');

  return { user: loggedInUser, token };
};
