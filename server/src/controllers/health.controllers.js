import mongoose from "mongoose";
import { envConfig } from "../config/env.config.js";

export const getHealthStatus = (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    return res.status(200).json({
      success: true,
      message: "CareerLens API is healthy",
      data: {
        status: "ok",
        database: "connected",
        environment: envConfig.nodeEnv,
        timestamp: new Date().toISOString(),
      },
    });
  } else {
    return res.status(503).json({
      success: false,
      message: "CareerLens API is unavailable",
      data: {
        status: "degraded",
        database: "disconnected",
        environment: envConfig.nodeEnv,
        timestamp: new Date().toISOString(),
      },
    });
  }
};
