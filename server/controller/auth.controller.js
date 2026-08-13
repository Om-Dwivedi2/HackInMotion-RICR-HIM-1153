import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { registerUserService, loginUserService } from '../utils/auth.services.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax', // or 'none' if client and server are on different domains in prod
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { user, token } = await registerUserService({ name, email, password });

  return res
    .status(201)
    .cookie('careerlens_token', token, cookieOptions)
    .json(
      new ApiResponse(201, { user }, 'Account created successfully.')
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await loginUserService({ email, password });

  return res
    .status(200)
    .cookie('careerlens_token', token, cookieOptions)
    .json(
      new ApiResponse(200, { user }, 'Signed in successfully.')
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie('careerlens_token', cookieOptions)
    .json(
      new ApiResponse(200, {}, 'Logged out successfully.')
    );
});
