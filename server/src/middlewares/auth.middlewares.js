import { verifyToken } from "../utils/jwt.utils.js";
import { getUserById } from "../services/auth.services.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.careerlens_token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        data: null,
      });
    }

    let payload;
    try {
      payload = verifyToken(token);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
        data: null,
      });
    }

    const userId = payload.sub || payload.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
        data: null,
      });
    }

    const user = await getUserById(userId);
    req.user = user;
    next();
  } catch (error) {
    // If the error was explicitly thrown as a 401 (e.g. user no longer exists)
    if (error.statusCode === 401) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
        data: null,
      });
    }
    next(error);
  }
};
