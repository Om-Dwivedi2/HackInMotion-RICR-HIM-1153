import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config.js";

export const signToken = (payload) => {
  return jwt.sign(payload, envConfig.jwtSecret, {
    expiresIn: envConfig.jwtExpiresIn,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, envConfig.jwtSecret);
};
