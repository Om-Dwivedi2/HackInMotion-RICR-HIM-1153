import * as authService from "../services/auth.services.js";
import { setAuthCookie, clearAuthCookie } from "../utils/authCookie.utils.js";

const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const validatePassword = (password) => {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required", data: null });
    }
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address", data: null });
    }
    if (!password || !validatePassword(password)) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number", data: null });
    }

    const { user, token } = await authService.registerUser({ name, email, password });
    
    setAuthCookie(res, token);
    
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required", data: null });
    }

    const { user, token } = await authService.loginUser({ email, password });
    
    setAuthCookie(res, token);
    
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
    data: null,
  });
};

export const getMe = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Authenticated user fetched successfully",
    data: { user: authService.getSafeUser(req.user) },
  });
};
