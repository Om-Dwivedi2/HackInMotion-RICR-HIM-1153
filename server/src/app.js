import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { envConfig } from "./config/env.config.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import targetRoutes from "./routes/careerTarget.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import historyRoutes from "./routes/history.routes.js";
import { notFoundHandler, globalErrorHandler } from "./middlewares/error.middlewares.js";

const app = express();

// Global Middlewares
app.use(
  cors({
    origin: envConfig.clientUrl,
    credentials: true,
  })
);

if (envConfig.nodeEnv === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/targets", targetRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/history", historyRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
